/**# Pronouny
 * A TypeScript library for pronoun validation and resolution.
 */
export declare namespace Pronouny {
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
    class Pronoun {
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
        });
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
        sbj(index?: number): string;
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
        obj(index?: number): string;
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
        psAdj(index?: number): string;
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
        psPrn(index?: number): string;
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
        rfx(index?: number): string;
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
        extend(pronounType: "subject" | "object" | "possessiveAdjective" | "possessivePronoun" | "reflexive", extensions: string | Array<string>): void;
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
        remove(pronounType: "subject" | "object" | "possessiveAdjective" | "possessivePronoun" | "reflexive", removal: string | Array<string>): void;
    }
    /**# Pronoun Sets
     * A class intended to define pronouns on a person.
     */
    class PronounSet {
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
        constructor(validator: Validate, pronounString: string | Array<string>, delimiter?: string, type?: "resolvePronoun" | "resolvePronounStrict");
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
        use(type: "sbj" | "obj" | "psAdj" | "psPrn" | "rfx", pronounIndex?: number, index?: number | undefined): string;
    }
    /**# Validator Class
     * Validates and checks if the pronoun specified is valid. You may extend or
     * remove Pronouns specified using the `extend()` or `remove()` methods.
     */
    class Validate {
        pronounsSet: Map<string, Pronoun>;
        /**# Validator Constructor
         * Simply use `new Pronouny.Validate()` to create a new instance. It will
         * be automatically populated with he, she, and they pronouns. Extend or
         * otherwise modify it using `extend()` or `remove()`.
         */
        constructor();
        /**# Pronoun Resolver
         * Returns the Pronoun object for the given pronoun string. Will
         * return `undefined` if the pronoun is not found.
         *
         * @param pronoun
         * String to check for against `pronounsSet`.
         *
         * @returns a `Pronoun` object or `undefined`.
         */
        resolvePronoun(pronoun: string): Pronoun | undefined;
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
        resolvePronounStrict(pronoun: string): Pronoun | undefined;
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
        createSetFrom(pronounString: string | Array<string>, delimiter?: string, type?: "resolvePronoun" | "resolvePronounStrict"): PronounSet;
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
        extend(strictIdentifier: string, pronoun: Pronoun): void;
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
        remove(strictIdentifier: string, pronoun: Pronoun): void;
    }
}
