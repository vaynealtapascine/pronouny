/**
 * The main {@link Pronouny} resolver class.
 * @module
 */

import { DEFAULT_PRONOUNS } from "./defaults.js";
import { PnyError } from "./errors.js";
import { Pronoun } from "./Pronoun.js";
import { PronounSet, type PronounLike } from "./PronounSet.js";
import {
	DEFAULT_CONFIG,
	PRONOUN_FORMS,
	type PartialConfig,
	type PronounForm,
	type PronounInput,
	type PronounyConfig,
} from "./types.js";
import { mergeConfig } from "./utils.js";

/** Something that can be turned into a registered {@link Pronoun}. */
export type PronounDefinition = Pronoun | PronounInput;

/**
 * # Pronouny
 * A typed utility for resolving English pronouns.
 *
 * Register pronouns with {@link Pronouny.add}, resolve strings to
 * pronouns with {@link Pronouny.resolve}, and build per-entity
 * collections with {@link Pronouny.set}. All lookups are backed by
 * hash-map indexes, so resolving and identifying pronouns is O(1).
 *
 * ```ts
 * const p = new Pronouny();
 * p.add("ze", { subject: "ze", object: "hir", possessive: "hirs",
 *               possessiveDeterminer: "hir", reflexive: "hirself" });
 *
 * const pronouns = p.set("she/ze/they");
 * pronouns.as("possessiveDeterminer"); // "her" | "hir" | "their"
 * ```
 */
export default class Pronouny {
	/** The active configuration for this instance. */
	config: PronounyConfig;

	/** All registered pronouns, keyed by their unique `id`. */
	private readonly pronouns: Map<string, Pronoun>;

	/** Lowercased subject surface / id → pronoun (shallow resolution). */
	private subjectIndex: Map<string, Pronoun> = new Map();

	/** Lowercased surface of any form → pronoun (deep resolution). */
	private wordIndex: Map<string, Pronoun> = new Map();

	/** Lowercased surface of any form → the form it belongs to. */
	private formIndex: Map<string, PronounForm> = new Map();

	constructor(
		config: PartialConfig = {},
		pronouns: Record<string, PronounInput> = DEFAULT_PRONOUNS
	) {
		this.config = { ...DEFAULT_CONFIG, ...config };
		this.pronouns = new Map();
		for (const [id, input] of Object.entries(pronouns)) {
			this.pronouns.set(id, new Pronoun(id, input, this));
		}
		this.reindex();
	}

	/**
	 * Rebuild the lookup indexes from the pronoun map. Called after any
	 * mutation. Registration cost is linear in the number of surface
	 * strings; the resulting lookups are all constant-time.
	 */
	private reindex(): void {
		this.subjectIndex = new Map();
		this.wordIndex = new Map();
		this.formIndex = new Map();

		for (const pronoun of this.pronouns.values()) {
			for (const subject of pronoun.components.subject) {
				const key = subject.toLowerCase();
				if (!this.subjectIndex.has(key)) {
					this.subjectIndex.set(key, pronoun);
				}
			}
			for (const form of PRONOUN_FORMS) {
				for (const word of pronoun.components[form]) {
					const key = word.toLowerCase();
					if (!this.wordIndex.has(key)) {
						this.wordIndex.set(key, pronoun);
					}
					if (!this.formIndex.has(key)) {
						this.formIndex.set(key, form);
					}
				}
			}
		}
	}

	/** Whether a pronoun with the given `id` is registered. */
	has(id: string): boolean {
		return this.pronouns.has(id);
	}

	/** Get a registered pronoun by `id`, or `undefined`. */
	get(id: string): Pronoun | undefined {
		return this.pronouns.get(id);
	}

	/** All registered pronouns, in insertion order. */
	list(): Pronoun[] {
		return Array.from(this.pronouns.values());
	}

	/**
	 * Resolve a string to its {@link Pronoun}.
	 *
	 * Resolution first tries an exact `id` match, then the subject
	 * index. When `deepSearch` is enabled it also matches against every
	 * other form. If nothing matches it either returns the fallback
	 * pronoun (when `failQuietly`) or throws a {@link PnyError}.
	 */
	resolve(pronoun: string, config?: PartialConfig): Pronoun {
		const cfg = mergeConfig(this.config, config);

		const direct =
			this.pronouns.get(pronoun) ??
			this.subjectIndex.get(pronoun.toLowerCase());
		if (direct) return direct;

		if (cfg.deepSearch) {
			const deep = this.wordIndex.get(pronoun.toLowerCase());
			if (deep) return deep;
		}

		if (cfg.failQuietly) {
			const fallback = this.pronouns.get(cfg.fallbackPronoun);
			if (fallback) return fallback;
			throw new PnyError(
				"PronounResolutionError",
				`Could not resolve "${pronoun}", and the fallback pronoun "${cfg.fallbackPronoun}" is not registered.`
			);
		}

		throw new PnyError(
			"PronounResolutionError",
			`Could not resolve the pronoun "${pronoun}".`
		);
	}

	/**
	 * Identify which grammatical {@link PronounForm} a string represents,
	 * or `undefined` if it is not a recognised pronoun. Case-insensitive.
	 */
	identify(pronoun: string): PronounForm | undefined {
		return this.formIndex.get(pronoun.toLowerCase());
	}

	/**
	 * Register a pronoun under a unique `id`.
	 *
	 * The `id` lets pronouns that share a subject form coexist (for
	 * example a plural `they` and a singular `they` variant). Accepts a
	 * loose {@link PronounInput} or an existing {@link Pronoun}. Returns
	 * the registered pronoun.
	 */
	add(id: string, definition: PronounDefinition): Pronoun {
		const input =
			definition instanceof Pronoun ? definition.components : definition;
		const pronoun = new Pronoun(id, input, this);
		this.pronouns.set(id, pronoun);
		this.reindex();
		return pronoun;
	}

	/**
	 * Remove a registered pronoun by `id`. Refuses to remove the current
	 * `fallbackPronoun`. Chainable.
	 */
	remove(id: string): this {
		if (id === this.config.fallbackPronoun) {
			throw new PnyError(
				"PronounDeletionError",
				`Cannot remove the fallback pronoun "${id}". Point config.fallbackPronoun at another pronoun first.`
			);
		}

		const existed = this.pronouns.delete(id);
		if (!existed) {
			if (this.config.failQuietly) return this;
			throw new PnyError(
				"PronounDeletionError",
				`Could not remove "${id}"; no such pronoun is registered.`
			);
		}

		this.reindex();
		return this;
	}

	/**
	 * Build a {@link PronounSet} from a delimited string (e.g.
	 * `"she/they"`) or a list of strings/pronouns.
	 *
	 * @param pronouns  A delimited string or an iterable of pronoun-likes.
	 * @param delimiter The delimiter to split a string on. Default `"/"`.
	 * @param config    Optional per-call config overrides used while
	 *                  resolving each entry.
	 */
	set(
		pronouns: string | Iterable<PronounLike>,
		delimiter = "/",
		config?: PartialConfig
	): PronounSet {
		const cfg = mergeConfig(this.config, config);
		const entries: Pronoun[] =
			typeof pronouns === "string"
				? pronouns.split(delimiter).map((s) => this.resolve(s.trim(), cfg))
				: Array.from(pronouns, (p) =>
						p instanceof Pronoun ? p : this.resolve(p, cfg)
				  );
		return new PronounSet(this, entries);
	}
}
