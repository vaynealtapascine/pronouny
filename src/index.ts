function randomToLimit(limit: number) {
	return Math.floor(Math.random() * limit);
}

/**# `Pronoun` class
 * A private class to construct the methods for pronoun
 * access. Use {@link Pronouny} to create and
 * append pronouns to the main validator. You can directly
 * fetch pronoun arrays with `sbj`, `obj`, `psv`, `psj`,
 * and `rfx`.
 */
class Pronoun {
	sbj: Array<string>;
	obj: Array<string>;
	psv: Array<string>;
	psj: Array<string>;
	rfx: Array<string>;

	/** @constructor */
	constructor(pronouns: {
		subject: Array<string> | string;
		object: Array<string> | string;
		possessive: Array<string> | string;
		psAdjective: Array<string> | string;
		reflexive: Array<string> | string;
	}) {
		this.sbj =
			typeof pronouns.subject === "string"
				? [pronouns.subject]
				: pronouns.subject;
		this.obj =
			typeof pronouns.object === "string"
				? [pronouns.object]
				: pronouns.object;
		this.psv =
			typeof pronouns.possessive === "string"
				? [pronouns.possessive]
				: pronouns.possessive;
		this.psj =
			typeof pronouns.psAdjective === "string"
				? [pronouns.psAdjective]
				: pronouns.psAdjective;
		this.rfx =
			typeof pronouns.reflexive === "string"
				? [pronouns.reflexive]
				: pronouns.reflexive;
		return this;
	}

	/**# Subject Getter
	 * Get a subject pronoun. By default, uses one at
	 * random and fails silently by using the last
	 * pronoun if you index out of bounds.
	 *
	 * @param index
	 * Get `index`th pronoun, if specified. Fails to
	 * last if out of bounds and failing quietly.
	 * Default is `-1`.
	 *
	 * @param useRandom
	 * Overrides default random use behavior.
	 * Default is `true`.
	 *
	 * @param failQuietly
	 * Overrides default quiet failure behavior.
	 * Default is `true`.
	 */
	subject(index = -1, useRandom = true, failQuietly = true) {
		switch (true) {
			case this.sbj.length === 1:
				return this.sbj[0];
			case index === -1 && useRandom:
			case index > this.sbj.length && useRandom && failQuietly:
				return this.sbj[randomToLimit(this.sbj.length)];
			case index <= this.sbj.length:
				return this.sbj[index];
			case failQuietly:
				return this.sbj[0];
			default:
				throw new Error(
					`could not retrieve index ${index} from "${this.sbj[0]}" subject pronoun`
				);
		}
	}

	/**# Object Getter
	 * Get an object pronoun. By default, uses one at
	 * random and fails silently by using the last
	 * pronoun if you index out of bounds.
	 *
	 * @param index
	 * Get `index`th pronoun, if specified. Fails to
	 * last if out of bounds and failing quietly.
	 * Default is `-1`.
	 *
	 * @param useRandom
	 * Overrides default random use behavior.
	 * Default is `true`.
	 *
	 * @param failQuietly
	 * Overrides default quiet failure behavior.
	 * Default is `true`.
	 */
	object(index = -1, useRandom = true, failQuietly = true) {
		switch (true) {
			case this.obj.length === 1:
				return this.obj[0];
			case index === -1 && useRandom:
			case index > this.obj.length && useRandom:
				return this.obj[randomToLimit(this.obj.length)];
			case index <= this.obj.length:
				return this.obj[index];
			case failQuietly:
				return this.obj[0];
			default:
				throw new Error(
					`could not retrieve index ${index} from "${this.sbj[0]}" object pronoun`
				);
		}
	}

	/**# Possessive Getter
	 * Get a possessive pronoun. By default, uses one
	 * at random and fails silently by using the last
	 * pronoun if you index out of bounds.
	 *
	 * @param index
	 * Get `index`th pronoun, if specified. Fails to
	 * last if out of bounds and failing quietly.
	 * Default is `-1`.
	 *
	 * @param useRandom
	 * Overrides default random use behavior.
	 * Default is `true`.
	 *
	 * @param failQuietly
	 * Overrides default quiet failure behavior.
	 * Default is `true`.
	 */
	possessive(index = -1, useRandom = true, failQuietly = true) {
		switch (true) {
			case this.psv.length === 1:
				return this.psv[0];
			case index === -1 && useRandom:
			case index > this.psv.length && useRandom:
				return this.psv[randomToLimit(this.psv.length)];
			case index <= this.psv.length:
				return this.psv[index];
			case failQuietly:
				return this.psv[0];
			default:
				throw new Error(
					`could not retrieve index ${index} from "${this.sbj[0]}" possessive pronoun`
				);
		}
	}

	/**# Possessive Adjective Getter
	 * Get a possessive adjective pronoun. By
	 * default, uses one at random and fails
	 * silently by using the last pronoun if you
	 * index out of bounds.
	 *
	 * @param index
	 * Get `index`th pronoun, if specified. Fails to
	 * last if out of bounds and failing quietly.
	 * Default is `-1`.
	 *
	 * @param useRandom
	 * Overrides default random use behavior.
	 * Default is `true`.
	 *
	 * @param failQuietly
	 * Overrides default quiet failure behavior.
	 * Default is `true`.
	 */
	psAdjective(index = -1, useRandom = true, failQuietly = true) {
		switch (true) {
			case this.psj.length === 1:
				return this.psj[0];
			case index === -1 && useRandom:
			case index > this.psj.length && useRandom:
				return this.psj[randomToLimit(this.psj.length)];
			case index <= this.psj.length:
				return this.psj[index];
			case failQuietly:
				return this.psj[0];
			default:
				throw new Error(
					`could not retrieve index ${index} from "${this.sbj[0]}" possessive adjective pronoun`
				);
		}
	}

	/**# Reflexive Getter
	 * Get a reflexive pronoun. By default, uses one
	 * at random and fails silently by using the last
	 * pronoun if you index out of bounds.
	 *
	 * @param index
	 * Get `index`th pronoun, if specified. Fails to
	 * last if out of bounds and failing quietly.
	 * Default is `-1`.
	 *
	 * @param useRandom
	 * Overrides default random use behavior.
	 * Default is `true`.
	 *
	 * @param failQuietly
	 * Overrides default quiet failure behavior.
	 * Default is `true`.
	 */
	reflexive(index = -1, useRandom = true, failQuietly = true) {
		switch (true) {
			case this.rfx.length === 1:
				return this.rfx[0];
			case index === -1 && useRandom:
			case index > this.rfx.length && useRandom:
				return this.rfx[randomToLimit(this.rfx.length)];
			case index <= this.rfx.length:
				return this.rfx[index];
			case failQuietly:
				return this.rfx[0];
			default:
				throw new Error(
					`could not retrieve index ${index} from "${this.sbj[0]}" reflexive pronoun`
				);
		}
	}
}

/**# `PronounSet` class
 * A private class to construct the methods on
 * sets of pronouns. Use {@linkcode Pronouny.set()}
 * to produce a PronounSet for an entity. You can
 * add pronouns to a set using {@linkcode PronounSet.add()},
 * remove them using {@linkcode PronounSet.remove()}
 */
class PronounSet {
	pronouns: Set<Pronoun>;
	resolver: Pronouny;

	/** @constructor */
	constructor(
		resolver: Pronouny,
		pronouns:
			| Set<Pronoun>
			| Array<Pronoun>
			| Set<string>
			| Array<string>
			| string = ["they"]
	) {
		this.pronouns = new Set();
		this.resolver = resolver;
		switch (true) {
			case Array.isArray(pronouns):
				for (const x of pronouns) {
					if (x instanceof Pronoun) {
						this.pronouns.add(x);
					} else {
						this.pronouns.add(resolver.resolve(x));
					}
				}
				break;
			case typeof pronouns === "string":
				this.pronouns.add(resolver.resolve(pronouns));
				break;
			default:
				for (const x of pronouns) {
					if (x instanceof Pronoun) {
						this.pronouns.add(x);
					} else {
						this.pronouns.add(resolver.resolve(x));
					}
				}
				break;
		}
		return this;
	}

	/**# `.add()` to PronounSet
	 * Adds pronoun/s from a given Pronoun or strings
	 * (resolved using the {@linkcode Pronouny} instance
	 * used to create this PronounSet.)
	 *
	 * @param pronoun
	 * A string, Pronoun, or array of either, to be
	 * appended to the PronounSet.
	 *
	 * @param failQuietly
	 * Override default behavior to fail into 'they'.
	 */
	add(
		pronoun: string | Pronoun | Array<string> | Array<Pronoun>,
		failQuietly = this.resolver.config.failQuietly
	) {
		switch (true) {
			case pronoun instanceof Pronoun:
				this.pronouns.add(pronoun);
				break;
			case typeof pronoun === "string":
				this.pronouns.add(this.resolver.resolve(pronoun));
				break;
			case pronoun instanceof Array:
				for (const p of pronoun) {
					this.add(p, failQuietly);
				}
				break;
			case failQuietly:
				this.pronouns.add(
					this.resolver.resolve(this.resolver.config.fallbackPronoun)
				);
				break;
			case !failQuietly:
			default:
				throw new Error(`Unable to resolve ${pronoun}`);
		}
		return this;
	}

	/**# `.remove()` from PronounSet
	 * Remove pronoun/s from a given Pronoun or strings
	 * (resolved using the {@linkcode Pronouny} instance
	 * used to create this PronounSet.)
	 *
	 * @param pronoun
	 * A string, Pronoun, or array of either, to be
	 * appended to the PronounSet.
	 *
	 * @param failQuietly
	 * Override default behavior to fail into no removal.
	 */
	remove(
		pronoun: string | Pronoun | Array<string> | Array<Pronoun>,
		failQuietly = this.resolver.config.failQuietly
	) {
		switch (true) {
			case pronoun instanceof Pronoun:
				this.pronouns.delete(pronoun);
				break;
			case typeof pronoun === "string":
				this.pronouns.delete(this.resolver.resolve(pronoun));
				break;
			case pronoun instanceof Array:
				for (const p of pronoun) {
					this.remove(p);
				}
				break;
			case failQuietly:
				break;
			case !failQuietly:
			default:
				throw new Error(`Unable to resolve ${pronoun}`);
		}
		return this;
	}

	/**# `.use()` a PronounSet
	 * A method to retrieve one Pronoun at random. Use with
	 * {@link Pronoun|`Pronoun` methods} to get a specific
	 * form. You can also directly use {@link PronounSet.subject|`.subject()`},
	 * {@link PronounSet.object|`.object()`}, {@link PronounSet.possessive|`.possessive()`},
	 * {@link PronounSet.possessive|`.possessive()`}, or
	 * {@link PronounSet.reflexive|`.reflexive()`}. This is mostly
	 * here if you'd like to explicitly get a `Pronoun` instance
	 * from a `PronounSet`.
	 *
	 * @param index
	 * Retrieve `index`th pronoun from insertion.
	 *
	 * @param failQuietly
	 * Override default behavior to fail as per Pronouny config.
	 *
	 * @param useRandom
	 * Override default behavior to use random as per
	 * Pronouny config.
	 */
	use(
		index = -1,
		failQuietly = this.resolver.config.failQuietly,
		useRandom = this.resolver.config.useRandom
	): Pronoun {
		const indexable = Array.from(this.pronouns);
		switch (true) {
			case indexable.length === 1:
				return indexable[0];
			case indexable.length === 0:
				if (failQuietly) {
					return this.resolver.resolve("they");
				}
				throw new Error("Pronoun set is empty");
			case index === -1:
				if (useRandom) {
					return indexable[randomToLimit(indexable.length)];
				}
				return indexable[0];
			case indexable[index] !== undefined:
				return indexable[index];
			case failQuietly:
				return this.resolver.resolve(
					this.resolver.config.fallbackPronoun
				);
			default:
				throw new Error(`Index ${index} out of range`);
		}
	}

	/**Retrieves a random subject pronoun. */
	subject(
		index = -1,
		failQuietly = this.resolver.config.failQuietly,
		useRandom = this.resolver.config.useRandom
	) {
		return this.use(index, failQuietly, useRandom).subject(
			-1,
			failQuietly,
			useRandom
		);
	}

	/**Retrieves a random object pronoun. */
	object(
		index = -1,
		failQuietly = this.resolver.config.failQuietly,
		useRandom = this.resolver.config.useRandom
	) {
		return this.use(index, failQuietly, useRandom).object(
			-1,
			failQuietly,
			useRandom
		);
	}

	/**Retrieves a random possessive pronoun. */
	possessive(
		index = -1,
		failQuietly = this.resolver.config.failQuietly,
		useRandom = this.resolver.config.useRandom
	) {
		return this.use(index, failQuietly, useRandom).possessive(
			-1,
			failQuietly,
			useRandom
		);
	}

	/**Retrieves a random possessive adjective pronoun. */
	psAdjective(
		index = -1,
		failQuietly = this.resolver.config.failQuietly,
		useRandom = this.resolver.config.useRandom
	) {
		return this.use(index, failQuietly, useRandom).psAdjective(
			-1,
			failQuietly,
			useRandom
		);
	}

	/**Retrieves a random reflexive pronoun. */
	reflexive(
		index = -1,
		failQuietly = this.resolver.config.failQuietly,
		useRandom = this.resolver.config.useRandom
	) {
		return this.use(index, failQuietly, useRandom).reflexive(
			-1,
			failQuietly,
			useRandom
		);
	}
}

const pronounHe: Pronoun = new Pronoun({
	subject: ["he"],
	object: ["him"],
	possessive: ["his"],
	psAdjective: ["his"],
	reflexive: ["himself"],
});
const pronounShe: Pronoun = new Pronoun({
	subject: ["she"],
	object: ["her"],
	possessive: ["hers"],
	psAdjective: ["her"],
	reflexive: ["herself"],
});
const pronounThey: Pronoun = new Pronoun({
	subject: ["they"],
	object: ["them"],
	possessive: ["theirs"],
	psAdjective: ["their"],
	reflexive: ["theirself", "theirselves", "themselves", "themself"],
});
const pronounYou: Pronoun = new Pronoun({
	subject: ["you"],
	object: ["you"],
	possessive: ["yours"],
	psAdjective: ["your"],
	reflexive: ["yourself"],
});
const pronounI: Pronoun = new Pronoun({
	subject: ["I"],
	object: ["me"],
	possessive: ["mine"],
	psAdjective: ["my"],
	reflexive: ["myself"],
});
const pronounWe: Pronoun = new Pronoun({
	subject: ["we"],
	object: ["us"],
	possessive: ["our"],
	psAdjective: ["ours"],
	reflexive: ["ourselves"],
});

/**# Config
 * `failQuietly`: Controls various quiet failure states.
 *
 * `deepSearch`: Controls how deeply Pronouny will search
 * for queries. By default, `string` parameters will
 * only resolve using the first subject pronoun.
 *
 * `useRandom`: Controls whether random selection will be
 * used. If false, it will default to 0. If failing
 * quietly and indexing out of bounds, it will use the
 * last item.
 *
 * `fallbackPronoun`: Controls what is considered the
 * default pronoun for when one is not assigned or for
 * quiet failure states. By default, this is `they`. **It
 * is not recommended to change this.**
 */
type PronounyConfig = {
	/**Controls various quiet failure states. */
	failQuietly: boolean;

	/**Controls how deeply Pronouny will search for
	 * queries. By default, `string` parameters will
	 * only resolve using the first subject pronoun. */
	deepSearch: boolean;

	/**Controls whether random selection will be used.
	 * If false, it will default to 0. If failing
	 * quietly and indexing out of bounds, it will
	 * use the last item. */
	useRandom: boolean;

	/**Controls what is considered the default pronoun
	 * for when one is not assigned or for quiet failure
	 * states. By default, this is `they`. **It is not
	 * recommended to change this.**
	 *
	 * If you remove `they` from the Pronouny instance,
	 * you are responsible for setting this to a valid
	 * pronoun string and ensuring it will resolve. */
	fallbackPronoun: string;
};
const PronounyDefaultConfig: PronounyConfig = {
	failQuietly: true,
	deepSearch: false,
	useRandom: true,
	fallbackPronoun: "they",
};

/**# Pronouny
 * A typed library intended to make English pronoun
 * resolution easy. Instantiate in your project using
 * `new Pronouny()`, optionally passing in a
 * {@link PronounyConfig|`PronounyConfig` object}.
 *
 * Once you have configured Pronouny, you may add new
 * pronouns by using `new()` and passing in a set of
 * pronouns. They are registered automatically. If you
 * would like to register them manually, you can use
 * `add()`. You can also `remove()` them if you would
 * like to make them no longer valid.
 *
 * You can produce a {@linkcode PronounSet} by using
 * `set()`. By passing in a string, it will
 * automatically resolve each, using a delimiter if
 * specified. From there, you can chain methods like
 * `subject()` to retrieve a subject pronoun for use.
 *
 * If you would like to get a {@link Pronoun|`Pronoun` object}
 * from a given text, you can use `resolve()`. Pass
 * in a string and it will return the entire matched
 * `Pronoun` object.
 */
export default class Pronouny {
	config: PronounyConfig;
	resolveMap: Map<string, Pronoun>;

	constructor(config: PronounyConfig = PronounyDefaultConfig) {
		this.config = Object.assign(PronounyDefaultConfig, config);
		this.resolveMap = new Map<string, Pronoun>([
			[pronounThey.sbj[0], pronounThey],
			[pronounYou.sbj[0], pronounYou],
			[pronounWe.sbj[0], pronounWe],
			[pronounI.sbj[0], pronounI],
			[pronounHe.sbj[0], pronounHe],
			[pronounShe.sbj[0], pronounShe],
		]);
		return this;
	}

	/**# `.resolve()` a Pronoun
	 * Returns a pronoun from a given string. Uses
	 * Pronouny's config to determine the depth of search.
	 * By default, only checks the first subject pronoun.
	 */
	resolve(pronoun: string, deepSearch = this.config.deepSearch): Pronoun {
		const resolvedPronoun = this.resolveMap.get(pronoun);
		switch (true) {
			case resolvedPronoun !== undefined:
				return resolvedPronoun;
			case deepSearch:
				let searchResult;
				for (const [_, value] of this.resolveMap) {
					for (const type of Object.values(value)) {
						if (type.includes(pronoun)) {
							searchResult = value;
						}
					}
				}
				if (searchResult) {
					return searchResult;
				}
			case this.config.failQuietly:
				return this.resolveMap.get(this.config.fallbackPronoun)!;
			default:
				throw new Error(`Pronoun "${pronoun}" not found`);
		}
	}

	/**# `.add()` an Unlisted Pronoun
	 * If you made a `.new()` Pronoun but disabled
	 * `autoAppend`, you can later append it back by
	 * using this method. Returns `Pronouny`.
	 */
	add(pronoun: Pronoun) {
		this.resolveMap.set(pronoun.sbj[0], pronoun);
		return this;
	}

	/**# `.remove()` a Pronoun
	 * Renders a given Pronoun invalid within this
	 * Pronouny instance. Returns `Pronouny`.
	 */
	remove(pronoun: Pronoun) {
		if (pronoun === this.resolveMap.get(this.config.fallbackPronoun)) {
			throw new Error(
				`Cannot remove fallback pronoun. Assign a new one before removal.`
			);
		}
		this.resolveMap.delete(pronoun.sbj[0]);
		return this;
	}

	/**# Make a `.set()` of Pronouns
	 * Returns a {@linkcode PronounSet} from a given
	 * string or array of strings. You can specify the
	 * delimiter to be used. By default, it is `/`.
	 */
	set(pronouns: string | Array<string>, delimiter: string = "/"): PronounSet {
		if (typeof pronouns === "string" && delimiter !== undefined) {
			pronouns = pronouns.split(delimiter);
		}
		let result: PronounSet = new PronounSet(this, pronouns);
		return result;
	}

	/**# `.new()`
	 * Returns a new pronoun. Takes in an object with
	 * a subject, object, possessive, possessive adjective,
	 * and reflexive string/s, and returns the Pronoun.
	 * By default, appends the new `Pronoun` to the Pronouny
	 * `resolveMap`.
	 *
	 * @param pronouns
	 * Takes an object with the structure of a `Pronoun`,
	 * with `Array<string>` or a `string` for `subject`,
	 * `object`, `possessive`, `psAdjective`, and
	 * `reflexive`.
	 *
	 * @param autoAppend
	 * Will automatically add the new Pronoun to the
	 * Pronouny instance. If false, will just return a
	 * {@link Pronoun|`Pronoun` object} without registering.
	 * You may register it later with {@link Pronouny.add}.
	 */
	new(
		pronouns: {
			subject: Array<string> | string;
			object: Array<string> | string;
			possessive: Array<string> | string;
			psAdjective: Array<string> | string;
			reflexive: Array<string> | string;
		},
		autoAppend = true
	) {
		const newPronoun = new Pronoun(pronouns);
		if (autoAppend) {
			this.add(newPronoun);
		}
		return newPronoun;
	}
}
