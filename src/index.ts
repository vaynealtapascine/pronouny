/**
 * # Pronouny
 * A small, typed library for programmatically resolving English
 * pronouns.
 *
 * ```ts
 * import Pronouny from "pronouny";
 *
 * const p = new Pronouny();
 * const pronouns = p.set("she/they");
 * pronouns.parse`${"They"} updated ${"their"} status.`;
 * ```
 *
 * @module
 */

import Pronouny from "./Pronouny.js";

export default Pronouny;

// Named exports for consumers who prefer them or need the supporting
// classes and types for extension.
export { Pronouny };
export { Pronoun } from "./Pronoun.js";
export { PronounSet } from "./PronounSet.js";
export type { PronounLike } from "./PronounSet.js";
export type { PronounDefinition } from "./Pronouny.js";
export { PnyError } from "./errors.js";
export type { PnyErrorType } from "./errors.js";
export { DEFAULT_PRONOUNS } from "./defaults.js";
export {
	DEFAULT_CONFIG,
	PRONOUN_FORMS,
	canonicalForm,
} from "./types.js";
export type {
	PronounForm,
	PronounFormInput,
	PronounComponents,
	PronounInput,
	PronounyConfig,
	PartialConfig,
} from "./types.js";
