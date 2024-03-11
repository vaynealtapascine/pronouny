/**# Pronouny
 * A TypeScript library for pronoun validation and resolution.
 */
export namespace Pronouny {
	/**# Pronoun Class
	 * In order to construct a new `Pronoun`, you will need to pass in an
	 * object which contains at least one `subject` pronoun, one `object`
	 * pronoun, one `possessiveAdjective`, one `possessivePronoun`, and one
	 * `reflexive` pronoun. You may pass in a string (which will be
	 * automatically placed into an array of one) or an array.
	 *
	 * methods:
	 * * `new`: takes in an object containing the required pronouns.
	 * * `sbj`: returns subject pronouns. (e.g., he, she, they)
	 * * `obj`: returns object pronouns. (e.g., him, her, them)
	 * * `psAdj`: returns possessive adjectives (e.g., his, her, their)
	 * * `psPrn`: returns possessive pronouns (e.g., his, hers, theirs)
	 * * `rfx`: returns reflexive pronouns (e.g., himself, herself, themself)
	 */
	export class Pronoun {
		subject: Array<string>;
		object: Array<string>;
		possessiveAdjective: Array<string>;
		possessivePronoun: Array<string>;
		reflexive: Array<string>;

		/**
		 * # Pronoun Constructor
		 * In order to construct a new `Pronoun`, you will need to pass in an
		 * object which contains at least one `subject` pronoun, one `object`
		 * pronoun, one `possessiveAdjective`, one `possessivePronoun`, and one
		 * `reflexive` pronoun. You may pass in a string (which will be
		 * automatically placed into an array of one) or an array.
		 *
		 * @param pronouns
		 */
		constructor(pronouns: {
			subject: Array<string> | string;
			object: Array<string> | string;
			possessiveAdjective: Array<string> | string;
			possessivePronoun: Array<string> | string;
			reflexive: Array<string> | string;
		}) {
			this.subject = [];
			this.object = [];
			this.possessiveAdjective = [];
			this.possessivePronoun = [];
			this.reflexive = [];

			typeof pronouns.subject === "string"
				? (this.subject[0] = pronouns.subject)
				: (this.subject = pronouns.subject);
			typeof pronouns.object === "string"
				? (this.subject[0] = pronouns.object)
				: (this.object = pronouns.object);
			typeof pronouns.possessiveAdjective === "string"
				? (this.subject[0] = pronouns.possessiveAdjective)
				: (this.possessiveAdjective = pronouns.possessiveAdjective);
			typeof pronouns.possessivePronoun === "string"
				? (this.subject[0] = pronouns.possessivePronoun)
				: (this.possessivePronoun = pronouns.possessivePronoun);
			typeof pronouns.reflexive === "string"
				? (this.subject[0] = pronouns.reflexive)
				: (this.reflexive = pronouns.reflexive);
		}

		/**## Subject Getter
		 * Retrieves a subject pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*.
		 *
		 * @throws if you index out of `subject` array length.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		sbj(
			index: number = Math.floor(Math.random() * this.subject.length)
		): string {
			if (index >= this.subject.length) {
				throw new Error("No subject pronoun at this index");
			}
			return this.subject[index];
		}

		/**## Object Getter
		 * Retrieves an object pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*.
		 *
		 * @throws if you index out of `object` array length.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		obj(
			index: number = Math.floor(Math.random() * this.object.length)
		): string {
			if (index >= this.object.length) {
				throw new Error("No object pronoun at this index");
			}
			return this.object[index];
		}

		/**## Possessive Adjective Getter
		 * Retrieves a possessive adjective pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*.
		 *
		 * @throws if you index out of `possessiveAdjective` array length.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		psAdj(
			index: number = Math.floor(
				Math.random() * this.possessiveAdjective.length
			)
		): string {
			if (index >= this.possessiveAdjective.length) {
				throw new Error("No possessive adjective at this index");
			}
			return this.possessiveAdjective[index];
		}

		/**## Possessive Pronoun Getter
		 * Retrieves a possessive pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*.
		 *
		 * @throws if you index out of `possessivePronoun` array length.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		psPrn(
			index: number = Math.floor(
				Math.random() * this.possessivePronoun.length
			)
		): string {
			if (index >= this.possessivePronoun.length) {
				throw new Error("No possessive pronoun at this index");
			}
			return this.possessivePronoun[index];
		}

		/**## Reflexive Pronoun Getter
		 * Retrieves a reflexive pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*.
		 *
		 * @throws if you index out of `reflexive` array length.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		rfx(
			index: number = Math.floor(Math.random() * this.reflexive.length)
		): string {
			if (index >= this.reflexive.length) {
				throw new Error("No reflexive pronoun at this index");
			}
			return this.reflexive[index];
		}

		/**# Pronoun Extension
		 * Extend the set of Pronouns with new pronouns. You may pass in a
		 * string or an array of strings.
		 *
		 * @param pronounType
		 * Denotes which type of pronoun to extend. Can be `subject`, `object`,
		 * `possessiveAdjective`, `possessivePronoun`, or `reflexive`.
		 *
		 * @param extensions
		 * A string or array of strings to extend the pronoun set with.
		 */
		extend(
			pronounType:
				| "subject"
				| "object"
				| "possessiveAdjective"
				| "possessivePronoun"
				| "reflexive",
			extensions: string | Array<string>
		) {
			if (Array.isArray(extensions)) {
				extensions.forEach((extension) => {
					this[pronounType].push(extension);
				});
			} else {
				this[pronounType].push(extensions);
			}
		}

		/**# Pronoun Removal
		 * Remove a pronoun from the set. You may pass in a string or
		 * an array of strings.
		 *
		 * @param pronounType
		 * Pronoun type to remove from. Can be `subject`, `object`,
		 * `possessiveAdjective`, `possessivePronoun`, or `reflexive`.
		 *
		 * @param removal
		 * Pronoun to remove from array. Can be a string or an array
		 * of strings.
		 */
		remove(
			pronounType:
				| "subject"
				| "object"
				| "possessiveAdjective"
				| "possessivePronoun"
				| "reflexive",
			removal: string | Array<string>
		) {
			if (Array.isArray(removal)) {
				removal.forEach((remove) => {
					this[pronounType] = this[pronounType].filter(
						(pronoun) => pronoun !== remove
					);
				});
			} else {
				this[pronounType] = this[pronounType].filter(
					(pronoun) => pronoun !== removal
				);
			}
		}
	}

	/**# Pronoun Sets
	 * A class intended to define pronouns on a person.
	 */
	export class PronounSet {
		pronouns: Array<Pronoun>;

		/**# Pronoun Set Constructor
		 * Build a set of constructors either from an array of pronoun strings for resolution.
		 *
		 * @param validator
		 * Requires a `Pronouny.Validate` object to define valid pronouns for `PronounSet` construction.
		 *
		 * @param pronounString
		 * A string or array of strings for resolution. (e.g., "he/they", "she", "ze/faer")
		 *
		 * @param delimiter
		 * Defines the delimiter for string `pronounString`s.
		 *
		 * @param type
		 * Defines resolution type. `resolvePronoun` is recommended, though `resolvePronounStrict`
		 * will be faster if the format is well-defined.
		 */
		constructor(
			validator: Validate,
			pronounString: string | Array<string>,
			delimiter: string = "/",
			type: "resolvePronoun" | "resolvePronounStrict" = "resolvePronoun"
		) {
			let splitPronouns = pronounString;

			if (!Array.isArray(pronounString)) {
				splitPronouns = pronounString.split(delimiter);
			}

			const returnedPronouns = (splitPronouns as Array<string>).map(
				(pronoun) => {
					const pronounResolved = validator[type](pronoun);
					if (pronounResolved === undefined) {
						throw new Error("Failed to resolve pronoun");
					} else {
						return pronounResolved;
					}
				}
			);

			this.pronouns = returnedPronouns;
		}

		/**# Pronoun Retrieval
		 * Retrieves a pronoun from the given set.
		 *
		 * @param type
		 * Specifies the pronoun desired. Uses the same syntax as {@link Pronoun}'s getters.
		 * Use `sbj` for Subject, `obj` for Object, `psAdj` for Possessive Adjective, `psPrn`
		 * for Possessive Pronoun, and `rfx` for Reflexive.
		 *
		 * @param pronounIndex
		 * Specifies the index in the `PronounSet`. Defaults to a random one *(recommended)*.
		 *
		 * @param index
		 * Specifies the index in the `Pronoun`. Defaults to a random one *(recommended)*.
		 *
		 * @returns a string.
		 */
		use(
			type: "sbj" | "obj" | "psAdj" | "psPrn" | "rfx",
			pronounIndex: number = Math.floor(
				Math.random() * this.pronouns.length
			),
			index: number | undefined = undefined
		): string {
			if (pronounIndex >= this.pronouns.length) {
				throw new Error("No pronoun set at this index");
			}
			if (index === undefined) {
				return this.pronouns[pronounIndex][type]();
			}
			return this.pronouns[pronounIndex][type](index);
		}
	}

	/**# Validator Class
	 * Validates and checks if the pronoun specified is valid. You may extend or
	 * remove Pronouns specified using the `extend()` or `remove()` methods.
	 */
	export class Validate {
		pronounsSet: Map<string, Pronoun>;

		/**# Validator Constructor
		 * Simply use `new Pronouny.Validate()` to create a new instance. It will
		 * be automatically populated with he, she, and they pronouns. Extend or
		 * otherwise modify it using `extend()` or `remove()`.
		 */
		constructor() {
			this.pronounsSet = new Map([
				[
					"he",
					new Pronoun({
						subject: ["he"],
						object: ["him"],
						possessiveAdjective: ["his"],
						possessivePronoun: ["his"],
						reflexive: ["himself"],
					}),
				],
				[
					"she",
					new Pronoun({
						subject: ["she"],
						object: ["her"],
						possessiveAdjective: ["her"],
						possessivePronoun: ["hers"],
						reflexive: ["herself"],
					}),
				],
				[
					"they",
					new Pronoun({
						subject: ["they"],
						object: ["them"],
						possessiveAdjective: ["their"],
						possessivePronoun: ["theirs"],
						reflexive: [
							"themself",
							"themselves",
							"theirself",
							"theirselves",
						],
					}),
				],
			]);
		}

		/**# Pronoun Resolver
		 * Returns the Pronoun object for the given pronoun string. Will
		 * return `undefined` if the pronoun is not found.
		 *
		 * @param pronoun
		 * String to check for against `pronounsSet`.
		 *
		 * @returns a `Pronoun` object or `undefined`.
		 */
		resolvePronoun(pronoun: string): Pronoun | undefined {
			let resolvedPronoun: Pronoun | undefined;

			if (this.pronounsSet.has(pronoun)) {
				resolvedPronoun = this.pronounsSet.get(pronoun);
			} else {
				this.pronounsSet.forEach((pronounSet, pronounLead) => {
					if (pronoun === pronounLead) {
						resolvedPronoun = pronounSet;
					} else {
						Object.values(pronounSet).forEach((subtype) => {
							subtype.forEach((subtypeVariant: string) => {
								if (subtypeVariant === pronoun) {
									resolvedPronoun = pronounSet;
								}
							});
						});
					}
				});
			}
			return resolvedPronoun;
		}

		/**# Strict Pronoun Resolver
		 * Only checks the string against the `strictIdentifier` (usually
		 * the first subject pronoun). Returns the Pronoun object for the
		 * given pronoun string. Will return `undefined` if the pronoun is
		 * not found.
		 *
		 * @param pronoun
		 * String to check for against `pronounsSet`.
		 *
		 * @returns a `Pronoun` object or `undefined`.
		 */
		resolvePronounStrict(pronoun: string): Pronoun | undefined {
			return this.pronounsSet.get(pronoun);
		}

		/**# Pronoun Set Constructor
		 * Convenience method to build a `PronounSet` from a string or array of
		 * strings. You may specify a delimiter and resolution type.
		 *
		 * @param pronounString
		 * `string` or `Array<string>` to build the `PronounSet` from.
		 *
		 * @param delimiter
		 * delimiter to split the `pronounString` by.
		 *
		 * @param type
		 * determines the resolution type. `resolvePronoun` is recommended, though
		 * `resolvePronounStrict` will be faster if the format is well-defined.
		 *
		 * @returns a PronounSet.
		 */
		createSetFrom(
			pronounString: string | Array<string>,
			delimiter: string = "/",
			type: "resolvePronoun" | "resolvePronounStrict" = "resolvePronoun"
		): PronounSet {
			return new PronounSet(this, pronounString, delimiter, type);
		}

		/**# Pronoun Extension
		 * Extend the set of Pronouns with new pronouns. You may pass in a
		 * string or an array of strings.
		 *
		 * @param strictIdentifier
		 * The strict identifier for the pronoun set. Usually the first subject pronoun.
		 *
		 * @param pronoun
		 * A `Pronoun` object to extend the set with.
		 *
		 * @returns a `Pronoun` object.
		 */
		extend(strictIdentifier: string, pronoun: Pronoun) {
			this.pronounsSet.set(strictIdentifier, pronoun);
		}

		/**# Pronoun Removal
		 * Remove a `Pronoun` from the `pronounsSet` map. You may pass in a
		 * string or an array of strings.
		 *
		 * @param strictIdentifier
		 * The strict identifier for the pronoun set. Usually the first subject pronoun.
		 *
		 * @param pronoun
		 * A `Pronoun` object to extend the set with.
		 *
		 * @returns a `Pronoun` object.
		 */
		remove(strictIdentifier: string, pronoun: Pronoun) {
			this.pronounsSet.delete(strictIdentifier);
		}
	}
}
