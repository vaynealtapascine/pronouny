/**
 * The {@link PronounSet} class.
 * @module
 */

import { Pronoun } from "./Pronoun.js";
import type Pronouny from "./Pronouny.js";
import { PnyError } from "./errors.js";
import { renderTemplate } from "./template.js";
import type { PartialConfig, PronounForm, PronounFormInput } from "./types.js";
import { mergeConfig, randomIndex } from "./utils.js";

/** A pronoun, or a string that can be resolved to one. */
export type PronounLike = Pronoun | string;

/**
 * # `PronounSet`
 * An ordered, de-duplicated collection of {@link Pronoun}s representing
 * how a single entity may be referred to (e.g. `she/they`).
 *
 * Create one with {@link Pronouny.set}. Call {@link PronounSet.use} to
 * pick a pronoun, or {@link PronounSet.as} / {@link PronounSet.parse}
 * to render a form directly.
 */
export class PronounSet {
	/** The pronouns in this set, in insertion order. */
	readonly pronouns: Set<Pronoun>;

	/** The Pronouny instance that owns this set. */
	readonly resolver: Pronouny;

	constructor(
		resolver: Pronouny,
		pronouns: Iterable<PronounLike> | PronounLike = resolver.config
			.fallbackPronoun
	) {
		this.resolver = resolver;
		this.pronouns = new Set();
		this.add(pronouns);
	}

	private resolveOne(pronoun: PronounLike): Pronoun {
		return pronoun instanceof Pronoun
			? pronoun
			: this.resolver.resolve(pronoun);
	}

	/**
	 * Add one or more pronouns to the set. Strings are resolved through
	 * the owning {@link Pronouny} instance. Chainable.
	 */
	add(pronoun: Iterable<PronounLike> | PronounLike): this {
		if (typeof pronoun === "string" || pronoun instanceof Pronoun) {
			this.pronouns.add(this.resolveOne(pronoun));
		} else {
			for (const entry of pronoun) {
				this.pronouns.add(this.resolveOne(entry));
			}
		}
		return this;
	}

	/**
	 * Remove one or more pronouns from the set. Strings are resolved
	 * through the owning {@link Pronouny} instance. Chainable.
	 */
	remove(pronoun: Iterable<PronounLike> | PronounLike): this {
		if (typeof pronoun === "string" || pronoun instanceof Pronoun) {
			this.pronouns.delete(this.resolveOne(pronoun));
		} else {
			for (const entry of pronoun) {
				this.pronouns.delete(this.resolveOne(entry));
			}
		}
		return this;
	}

	/** The number of pronouns in the set. */
	get size(): number {
		return this.pronouns.size;
	}

	/** The pronouns as an array, in insertion order. */
	list(): Pronoun[] {
		return Array.from(this.pronouns);
	}

	/**
	 * Pick a single {@link Pronoun} from the set.
	 *
	 * @param index  Retrieve the `index`-th pronoun. When `-1` (default)
	 *               a pronoun is chosen according to the `useRandom`
	 *               config.
	 * @param config Optional per-call config overrides.
	 */
	use(index = -1, config?: PartialConfig): Pronoun {
		const cfg = mergeConfig(this.resolver.config, config);
		const pool = this.list();

		if (pool.length === 0) {
			if (cfg.failQuietly) {
				return this.resolver.resolve(cfg.fallbackPronoun, cfg);
			}
			throw new PnyError(
				"PronounResolutionError",
				"Cannot pick a pronoun from an empty PronounSet."
			);
		}

		if (index >= 0) {
			if (index >= pool.length) {
				if (cfg.failQuietly) return pool[0];
				throw new PnyError(
					"PronounIndexingError",
					`Index ${index} is out of range for this PronounSet (size ${pool.length}).`
				);
			}
			return pool[index];
		}

		if (!cfg.useRandom) return pool[0];
		return pool[randomIndex(pool.length)];
	}

	/**
	 * Pick a pronoun from the set and return the requested grammatical
	 * form. Shorthand for `set.use(-1, config).as(form, -1, config)`.
	 */
	as(form: PronounFormInput = "subject", config?: PartialConfig): string {
		return this.use(-1, config).as(form, -1, config);
	}

	/**
	 * Tagged-template helper. Each interpolated pronoun word is resolved
	 * independently, drawing a fresh pronoun from the set (per the
	 * `useRandom` config) for every substitution — so a multi-pronoun
	 * set is distributed across the string rather than fixed to one
	 * member. Interpolated pronoun words are rewritten to the matching
	 * form (preserving capitalisation); other values pass through
	 * unchanged.
	 *
	 * ```ts
	 * pronouns.parse`${"They"} updated ${"their"} status.`;
	 * // e.g. "She updated their status."
	 * ```
	 */
	parse(strings: TemplateStringsArray, ...values: unknown[]): string {
		return renderTemplate(
			this.resolver,
			strings,
			values,
			(form: PronounForm) => this.use().as(form)
		);
	}
}
