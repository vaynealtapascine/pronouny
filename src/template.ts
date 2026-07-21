/**
 * Shared tagged-template rendering used by both {@link Pronoun.parse}
 * and {@link PronounSet.parse}.
 * @module
 */

import type Pronouny from "./Pronouny.js";
import type { PronounForm } from "./types.js";
import { capitalize, startsUppercase } from "./utils.js";

/**
 * Render a tagged template, replacing each interpolated value that
 * looks like a pronoun with the correct form.
 *
 * For every interpolated `value`, the resolver is asked to
 * {@link Pronouny.identify | identify} which grammatical form it is.
 * If it is a recognised pronoun, `pick(form)` supplies the replacement
 * (preserving the original capitalisation); otherwise the literal
 * value is kept untouched.
 *
 * @param resolver  The Pronouny instance used to identify forms. May be
 *                  `undefined`, in which case every value is treated as
 *                  a literal.
 * @param strings   The static string parts of the template.
 * @param values    The interpolated values.
 * @param pick      Maps an identified form to its replacement string.
 */
export function renderTemplate(
	resolver: Pronouny | undefined,
	strings: TemplateStringsArray | ReadonlyArray<string>,
	values: ReadonlyArray<unknown>,
	pick: (form: PronounForm) => string
): string {
	let result = strings[0] ?? "";
	for (let i = 0; i < values.length; i++) {
		const raw = String(values[i]);
		const form = resolver?.identify(raw.toLowerCase());
		let piece: string;
		if (form) {
			piece = pick(form);
			if (startsUppercase(raw)) {
				piece = capitalize(piece);
			}
		} else {
			piece = raw;
		}
		result += piece + (strings[i + 1] ?? "");
	}
	return result;
}
