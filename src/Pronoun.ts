/**
 * The {@link Pronoun} class.
 * @module
 */

import type Pronouny from "./Pronouny.js";
import { PnyError } from "./errors.js";
import { renderTemplate } from "./template.js";
import {
	canonicalForm,
	DEFAULT_CONFIG,
	PRONOUN_FORMS,
	type PartialConfig,
	type PronounComponents,
	type PronounForm,
	type PronounFormInput,
	type PronounInput,
} from "./types.js";
import { mergeConfig, randomIndex, toArray } from "./utils.js";

/**
 * Normalise a loose {@link PronounInput} into strict
 * {@link PronounComponents}, accepting single strings or arrays and
 * legacy alias keys. Throws a {@link PnyError} if any form is missing.
 */
export function normalizeComponents(
	id: string,
	input: PronounInput
): PronounComponents {
	const source = input as unknown as Record<
		string,
		string | string[] | undefined
	>;
	const pick = (...keys: string[]): string[] | undefined => {
		for (const key of keys) {
			const value = source[key];
			if (value !== undefined) {
				return toArray(value).map(String);
			}
		}
		return undefined;
	};

	const components: Partial<PronounComponents> = {
		subject: pick("subject"),
		object: pick("object"),
		possessive: pick("possessive"),
		possessiveDeterminer: pick(
			"possessiveDeterminer",
			"possessiveAdjective",
			"psAdjective"
		),
		reflexive: pick("reflexive", "intensive"),
	};

	for (const form of PRONOUN_FORMS) {
		const value = components[form];
		if (!value || value.length === 0) {
			throw new PnyError(
				"PronounValidationError",
				`Pronoun "${id}" is missing a value for the "${form}" form.`
			);
		}
	}

	return components as PronounComponents;
}

/**
 * # `Pronoun`
 * A single pronoun with all five grammatical {@link PronounForm forms}.
 * Each form may hold several accepted spellings.
 *
 * Create pronouns through {@link Pronouny.add} so they are registered
 * for resolution, or construct one directly for standalone use.
 */
export class Pronoun {
	/** Unique identifier within a {@link Pronouny} instance. */
	readonly id: string;

	/** The normalised forms of this pronoun. */
	readonly components: PronounComponents;

	/** The Pronouny instance this pronoun belongs to, if any. */
	resolver?: Pronouny;

	constructor(id: string, input: PronounInput, resolver?: Pronouny) {
		this.id = id;
		this.components = normalizeComponents(id, input);
		this.resolver = resolver;
	}

	private get config() {
		return this.resolver?.config ?? DEFAULT_CONFIG;
	}

	/**
	 * Retrieve a single surface string for the requested grammatical
	 * form.
	 *
	 * @param form   The form to retrieve. Accepts aliases such as
	 *               `possessiveAdjective` and `intensive`. Defaults to
	 *               `subject`.
	 * @param index  Retrieve the `index`-th spelling of the form. When
	 *               `-1` (default) a spelling is chosen according to the
	 *               `useRandom` config.
	 * @param config Optional per-call config overrides.
	 */
	as(
		form: PronounFormInput = "subject",
		index = -1,
		config?: PartialConfig
	): string {
		const cfg = mergeConfig(this.config, config);
		const canonical = canonicalForm(form);
		const ctx = this.components[canonical];

		if (!ctx || ctx.length === 0) {
			if (cfg.failQuietly) return "";
			throw new PnyError(
				"PronounFormError",
				`Pronoun "${this.id}" has no "${canonical}" form.`
			);
		}

		if (index >= 0) {
			if (index >= ctx.length) {
				if (cfg.failQuietly) return ctx[0];
				throw new PnyError(
					"PronounIndexingError",
					`Index ${index} is out of range for the "${canonical}" form of "${this.id}" (length ${ctx.length}).`
				);
			}
			return ctx[index];
		}

		if (!cfg.useRandom) return ctx[0];
		return ctx[randomIndex(ctx.length)];
	}

	/**
	 * Tagged-template helper. Interpolated pronoun words are rewritten
	 * to the matching form of *this* pronoun, preserving capitalisation.
	 * Non-pronoun values pass through unchanged.
	 *
	 * ```ts
	 * he.parse`${"They"} updated ${"their"} status.`;
	 * // "He updated his status."
	 * ```
	 */
	parse(
		strings: TemplateStringsArray,
		...values: unknown[]
	): string {
		return renderTemplate(this.resolver, strings, values, (form) =>
			this.as(form)
		);
	}
}
