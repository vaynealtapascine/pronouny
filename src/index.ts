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

		/** # Pronoun Constructor
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
		 * Retrieves an subject pronoun. If no index is provided, it will retrieve a
		 * random one from the array *(recommended)*. **This will fail silently and
		 * return the last pronoun instead if you submit if an invalid index. You
		 * must opt in to exception handling.**
		 *
		 * @throws if you index out of `subject` array length AND failQuietly is false.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		sbj(
			index: number = Math.floor(Math.random() * this.subject.length),
			failQuietly: boolean = true
		): string {
			if (index >= this.subject.length) {
				if (failQuietly) {
					return this.subject[this.subject.length - 1];
				} else {
					throw new Error("Index out of range for object pronouns.");
				}
			}
			return this.subject[index];
		}

		/**## Object Getter
		 * Retrieves an object pronoun. If no index is provided, it will retrieve a
		 * random one from the array *(recommended)*. **This will fail silently and
		 * return the last pronoun instead if you submit if an invalid index. You
		 * must opt in to exception handling.**
		 *
		 * @throws if you index out of `object` array length AND failQuietly is false.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		obj(
			index: number = Math.floor(Math.random() * this.object.length),
			failQuietly: boolean = true
		): string {
			if (index >= this.object.length) {
				if (failQuietly) {
					return this.object[this.object.length - 1];
				} else {
					throw new Error("Index out of range for object pronouns.");
				}
			}
			return this.object[index];
		}

		/**## Possessive Adjective Getter
		 * Retrieves a possessive adjective pronoun. If no index is provided, it will
		 * retrieve a random one from the array *(recommended)*. **This will fail
		 * silently and return the last pronoun instead if you submit if an invalid
		 * index. You must opt in to exception handling.**
		 *
		 * @throws if you index out of `possessiveAdjective` array length AND
		 * failQuietly is false.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		psAdj(
			index: number = Math.floor(
				Math.random() * this.possessiveAdjective.length
			),
			failQuietly: boolean = true
		): string {
			if (index >= this.possessiveAdjective.length) {
				if (failQuietly) {
					return this.possessiveAdjective[
						this.possessiveAdjective.length - 1
					];
				} else {
					throw new Error(
						"Index out of range for possessive adjective pronouns."
					);
				}
			}
			return this.possessiveAdjective[index];
		}

		/**## Possessive Pronoun Getter
		 * Retrieves a possessive pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*. **This will fail silently
		 * and return the last pronoun instead if you submit if an invalid index.
		 * You must opt in to exception handling.**
		 *
		 * @throws if you index out of `possessivePronoun` array length AND
		 * failQuietly is false.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		psPrn(
			index: number = Math.floor(
				Math.random() * this.possessivePronoun.length
			),
			failQuietly: boolean = true
		): string {
			if (index >= this.possessivePronoun.length) {
				if (failQuietly) {
					return this.possessivePronoun[
						this.possessivePronoun.length - 1
					];
				} else {
					throw new Error(
						"Index out of range for possessive pronouns."
					);
				}
			}
			return this.possessivePronoun[index];
		}

		/**## Reflexive Pronoun Getter
		 * Retrieves a reflexive pronoun. If no index is provided, it will retrieve
		 * a random one from the array *(recommended)*. **This will fail silently
		 * and return the last pronoun instead if you submit if an invalid index.
		 * You must opt in to exception handling.**
		 *
		 * @throws if you index out of `reflexive` array length AND failQuietly is
		 * false.
		 *
		 * @param index
		 * by default, selects randomly.
		 *
		 * @returns a string.
		 */
		rfx(
			index: number = Math.floor(Math.random() * this.reflexive.length),
			failQuietly: boolean = true
		): string {
			if (index >= this.reflexive.length) {
				if (failQuietly) {
					return this.reflexive[this.reflexive.length - 1];
				} else {
					throw new Error(
						"Index out of range for reflexive pronouns."
					);
				}
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
		pronouns: Set<Pronoun>;

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
		 *
		 * @param failQuietly
		 * If true, will fail silently and return "they" for non-resolvable pronouns. If false, will
		 * throw an error for non-resolvable pronouns.
		 *
		 * @throws if `pronounString` is not in the validator AND `failQuietly` is false.
		 */
		constructor(
			validator: Validate,
			pronounString: string | Array<string>,
			delimiter: string = "/",
			type: "resolvePronoun" | "resolvePronounStrict" = "resolvePronoun",
			failQuietly: boolean = true
		) {
			let splitPronouns = pronounString;
			this.pronouns = new Set();

			if (!Array.isArray(pronounString)) {
				splitPronouns = pronounString.split(delimiter);
			}

			const returnedPronouns = (splitPronouns as Array<string>).map(
				(pronoun) => {
					const pronounResolved = validator[type](pronoun);
					if (pronounResolved === undefined) {
						if (!failQuietly) {
							throw new Error(
								`Pronoun "${pronoun}" is not in the validator.`
							);
						} else {
							this.pronouns.add(
								validator.resolvePronoun("they")!
							);
						}
					} else {
						this.pronouns.add(pronounResolved);
					}
				}
			);
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
			index: number | undefined = undefined
		): string {
			if (index === undefined) {
				return this.get()[type]();
			}
			return this.get()[type](index);
		}

		/**# Pronoun Getter
		 * Retrieves a random `Pronoun` from the set.
		 */
		get() {
			if (this.pronouns.size === 1) {
				return Array.from(this.pronouns)[0];
			}

			return Array.from(this.pronouns)[
				Math.floor(Math.random() * this.pronouns.size)
			];
		}

		/**# Pronoun Adder
		 * Add a pronoun to the PronounSet. **This will fail silently unless
		 * you explicitly opt in to exception handling.**
		 *
		 * @throws if `validator` does not resolve given `pronoun`.
		 */
		add(
			pronoun: Pronoun | string,
			validator: Validate,
			failQuietly = true
		) {
			let resolvedPronoun = pronoun;
			if (typeof pronoun === "string") {
				resolvedPronoun = validator.resolvePronoun(pronoun)!;

				if (!resolvedPronoun) {
					if (failQuietly) {
						resolvedPronoun = validator.resolvePronoun("they")!;
					} else {
						throw new Error("failed to resolve");
					}
				}
			}

			this.pronouns.add(resolvedPronoun as Pronoun);
		}

		/**# Pronoun Removal
		 * Removes a given pronoun. **This will fail silently unless
		 * you explicitly opt in to exception handling.**
		 *
		 * @throws if `validator` does not resolve given `pronoun`.
		 */
		remove(
			pronoun: Pronoun | string,
			validator: Validate,
			failQuietly = true
		) {
			let resolvedPronoun = pronoun;
			if (typeof pronoun === "string") {
				resolvedPronoun = validator.resolvePronoun(pronoun)!;

				if (!resolvedPronoun) {
					if (failQuietly) {
						resolvedPronoun = validator.resolvePronoun("they")!;
					} else {
						throw new Error("failed to resolve");
					}
				}
			}

			this.pronouns.delete(resolvedPronoun as Pronoun);
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
		resolvePronoun(
			pronoun: string,
			failQuietly = true
		): Pronoun | undefined {
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

				if (resolvedPronoun === undefined && !failQuietly) {
					throw new Error(`Failed to resolve pronoun ${pronoun}`);
				}

				return resolvedPronoun ?? this.resolvePronoun("they");
			}
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
