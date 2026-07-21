/**
 * Shared types and constants for Pronouny.
 * @module
 */

/**
 * The five canonical grammatical forms an English pronoun can take.
 *
 * | Form                   | Example (she) |
 * | ---------------------- | ------------- |
 * | `subject`              | she           |
 * | `object`               | her           |
 * | `possessive`           | hers          |
 * | `possessiveDeterminer` | her           |
 * | `reflexive`            | herself       |
 */
export const PRONOUN_FORMS = [
	"subject",
	"object",
	"possessive",
	"possessiveDeterminer",
	"reflexive",
] as const;

/** A canonical pronoun form name. */
export type PronounForm = (typeof PRONOUN_FORMS)[number];

/**
 * A pronoun form name accepted as input. Includes the canonical
 * {@link PronounForm} names plus common aliases:
 *
 * - `possessiveAdjective` → `possessiveDeterminer`
 * - `intensive` → `reflexive`
 */
export type PronounFormInput =
	| PronounForm
	| "possessiveAdjective"
	| "intensive";

/**
 * Fully-normalised pronoun components. Every form is stored as a
 * non-empty array of surface strings so that a pronoun can offer
 * multiple accepted spellings for a given form (e.g. `themself`
 * and `themselves`).
 */
export type PronounComponents = Record<PronounForm, string[]>;

/**
 * The shape accepted when creating a pronoun. Each form may be a
 * single string or an array of strings. Legacy alias keys
 * (`possessiveAdjective` / `psAdjective`, `intensive`) are accepted
 * for backwards compatibility.
 */
export interface PronounInput {
	subject: string | string[];
	object: string | string[];
	possessive: string | string[];
	possessiveDeterminer?: string | string[];
	/** Alias for {@link PronounInput.possessiveDeterminer}. */
	possessiveAdjective?: string | string[];
	/** Legacy alias for {@link PronounInput.possessiveDeterminer}. */
	psAdjective?: string | string[];
	reflexive?: string | string[];
	/** Alias for {@link PronounInput.reflexive}. */
	intensive?: string | string[];
}

/**
 * Runtime configuration for a {@link Pronouny} instance. Every field
 * can also be overridden per-call by passing a partial config.
 */
export interface PronounyConfig {
	/**
	 * When `true` (default), recoverable errors resolve to a sensible
	 * fallback (the fallback pronoun, the first available form, etc.)
	 * instead of throwing a {@link PnyError}.
	 */
	failQuietly: boolean;

	/**
	 * When `true`, {@link Pronouny.resolve} matches a string against
	 * *any* form of a pronoun. When `false` (default) it only matches
	 * against a pronoun's `id` or subject form, keeping resolution
	 * narrow and predictable.
	 */
	deepSearch: boolean;

	/**
	 * When `true` (default), a form or pronoun is picked at random from
	 * the available options. When `false`, the first option is always
	 * used.
	 */
	useRandom: boolean;

	/**
	 * The `id` of the pronoun used whenever resolution fails quietly.
	 * Defaults to `"they"`. If you remove this pronoun you are
	 * responsible for pointing this at another registered pronoun.
	 */
	fallbackPronoun: string;
}

/** A partial {@link PronounyConfig} used for per-call overrides. */
export type PartialConfig = Partial<PronounyConfig>;

/** The default configuration applied to every new {@link Pronouny}. */
export const DEFAULT_CONFIG: PronounyConfig = {
	failQuietly: true,
	deepSearch: false,
	useRandom: true,
	fallbackPronoun: "they",
};

/**
 * Resolve a {@link PronounFormInput} (which may be an alias) down to
 * its canonical {@link PronounForm}.
 */
export function canonicalForm(form: PronounFormInput): PronounForm {
	switch (form) {
		case "possessiveAdjective":
			return "possessiveDeterminer";
		case "intensive":
			return "reflexive";
		default:
			return form;
	}
}
