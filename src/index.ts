function randomToLimit(limit: number) {
	return Math.floor(Math.random() * limit);
}

class Pronoun {
	sbj: Array<string>;
	obj: Array<string>;
	psv: Array<string>;
	psj: Array<string>;
	rfx: Array<string>;

	constructor(pronouns: {
		subject: Array<string> | string,
		object: Array<string> | string,
		possessive: Array<string> | string,
		psAdjective: Array<string> | string,
		reflexive: Array<string> | string
	}) {
		this.sbj = typeof pronouns.subject === 'string' ? [pronouns.subject] : pronouns.subject;
		this.obj = typeof pronouns.object === 'string' ? [pronouns.object] : pronouns.object;
		this.psv = typeof pronouns.possessive === 'string' ? [pronouns.possessive] : pronouns.possessive;
		this.psj = typeof pronouns.psAdjective === 'string' ? [pronouns.psAdjective] : pronouns.psAdjective;
		this.rfx = typeof pronouns.reflexive === 'string' ? [pronouns.reflexive] : pronouns.reflexive;
	}

	subject(index = -1, failQuietly = true, useRandom = true) {
		switch (true) {
			case index === -1 && useRandom:
			case index > this.sbj.length && useRandom:
				return this.sbj[randomToLimit(this.sbj.length)]
			case index <= this.sbj.length:
				return this.sbj[index]
			case failQuietly:
				return this.sbj[0]
			default:
				throw new Error(`could not retrieve index ${index} from "${this.sbj[0]}" subject pronoun`);
		}
	}
	
	object(index = -1, failQuietly = true, useRandom = true) {
		let result;
		switch (true) {
			case index === -1 && useRandom:
			case index > this.obj.length && useRandom:
				return this.obj[randomToLimit(this.obj.length)]
			case index <= this.obj.length:
				return this.obj[index]
			case failQuietly:
				return this.obj[0]
			default:
				throw new Error(`could not retrieve index ${index} from "${this.sbj[0]}" object pronoun`);
		}
	}

	possessive(index = -1, failQuietly = true, useRandom = true) {
		switch (true) {
			case index === -1 && useRandom:
			case index > this.psv.length && useRandom:
				return this.psv[randomToLimit(this.psv.length)]
			case index <= this.psv.length:
				return this.psv[index]
			case failQuietly:
				return this.psv[0]
			default:
				throw new Error(`could not retrieve index ${index} from "${this.sbj[0]}" possessive pronoun`);
		}
	}

	psAdjective(index = -1, failQuietly = true, useRandom = true) {
		switch (true) {
			case index === -1 && useRandom:
			case index > this.psj.length && useRandom:
				return this.psj[randomToLimit(this.psj.length)]
			case index <= this.psj.length:
				return this.psj[index]
			case failQuietly:
				return this.psj[0]
			default:
				throw new Error(`could not retrieve index ${index} from "${this.sbj[0]}" possessive adjective pronoun`);
		}
	}

	reflexive(index = -1, failQuietly = true, useRandom = true) {
		switch (true) {
			case index === -1 && useRandom:
			case index > this.rfx.length && useRandom:
				return this.rfx[randomToLimit(this.rfx.length)]
			case index <= this.rfx.length:
				return this.rfx[index]
			case failQuietly:
				return this.rfx[0]
			default:
				throw new Error(`could not retrieve index ${index} from "${this.sbj[0]}" reflexive pronoun`);
		}
	}
}
type PronounForms = keyof Pronoun;

class PronounSet {
	pronouns: Set<Pronoun>;
	resolver: Pronouny;

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
				pronouns.forEach((x) => {
					if (x instanceof Pronoun) {
						this.pronouns.add(x);
					} else {
						this.pronouns.add(resolver.resolve(x));
					}
				});
				break;
			case typeof pronouns === "string":
				this.pronouns.add(resolver.resolve(pronouns));
				break;
			default:
				pronouns.forEach((x) => {
					if (x instanceof Pronoun) {
						this.pronouns.add(x);
					} else {
						this.pronouns.add(resolver.resolve(x));
					}
				});
				break;
		}
	}

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
				pronoun.forEach((p) => {
					this.add(p);
				});
				break;
			case failQuietly:
				this.pronouns.add(this.resolver.resolve("they"));
				break;
			case !failQuietly:
			default:
				throw new Error(`Unable to resolve ${pronoun}`);
		}
		return this;
	}

	remove(
		set: PronounSet,
		pronoun: string | Pronoun | Array<string> | Array<Pronoun>,
		failQuietly = this.resolver.config.failQuietly
	) {
		switch (true) {
			case pronoun instanceof Pronoun:
				set.pronouns.delete(pronoun);
				break;
			case typeof pronoun === "string":
				set.pronouns.delete(this.resolver.resolve(pronoun));
				break;
			case pronoun instanceof Array:
				pronoun.forEach((p) => {
					this.remove(set, p);
				});
				break;
			case failQuietly:
				break;
			case !failQuietly:
			default:
				throw new Error(`Unable to resolve ${pronoun}`);
		}
		return this;
	}

	use(index = -1, failQuietly = this.resolver.config.failQuietly, useRandom = this.resolver.config.useRandom): Pronoun {
		const indexable = Array.from(this.pronouns);
		switch (true) {
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
				return this.resolver.resolve("they");
			default:
				throw new Error(`Index ${index} out of range`);
		}
	}

	subject(index = -1, failQuietly = this.resolver.config.failQuietly, useRandom = this.resolver.config.useRandom) {
		return this.use(index, failQuietly, useRandom).subject(-1, failQuietly, useRandom);
	}

	object(index = -1, failQuietly = this.resolver.config.failQuietly, useRandom = this.resolver.config.useRandom) {
		return this.use(index, failQuietly, useRandom).object(-1, failQuietly, useRandom);
	}

	possessive(index = -1, failQuietly = this.resolver.config.failQuietly, useRandom = this.resolver.config.useRandom) {
		return this.use(index, failQuietly, useRandom).possessive(-1, failQuietly, useRandom);
	}

	psAdjective(index = -1, failQuietly = this.resolver.config.failQuietly, useRandom = this.resolver.config.useRandom) {
		return this.use(index, failQuietly, useRandom).psAdjective(-1, failQuietly, useRandom);
	}

	reflexive(index = -1, failQuietly = this.resolver.config.failQuietly, useRandom = this.resolver.config.useRandom) {
		return this.use(index, failQuietly, useRandom).reflexive(-1, failQuietly, useRandom);
	}
}

const pronounHe: Pronoun = new Pronoun ({
	subject: ["he"],
	object: ["him"],
	possessive: ["his"],
	psAdjective: ["his"],
	reflexive: ["himself"],
});
const pronounShe: Pronoun = new Pronoun ({
	subject: ["she"],
	object: ["her"],
	possessive: ["hers"],
	psAdjective: ["her"],
	reflexive: ["herself"],
});
const pronounThey: Pronoun = new Pronoun ({
	subject: ["they"],
	object: ["them"],
	possessive: ["theirs"],
	psAdjective: ["their"],
	reflexive: ["theirself", "theirselves", "themselves", "themself"],
});
const pronounYou: Pronoun = new Pronoun ({
	subject: ["you"],
	object: ["you"],
	possessive: ["yours"],
	psAdjective: ["your"],
	reflexive: ["yourself"],
});
const pronounI: Pronoun = new Pronoun ({
	subject: ["I"],
	object: ["me"],
	possessive: ["mine"],
	psAdjective: ["my"],
	reflexive: ["myself"],
});
const pronounWe: Pronoun = new Pronoun ({
	subject: ["we"],
	object: ["us"],
	possessive: ["our"],
	psAdjective: ["ours"],
	reflexive: ["ourselves"],
});

type PronounyConfig = {
	failQuietly?: boolean;
	deepSearch?: boolean;
	useRandom?: boolean;
};
const PronounyDefaultConfig: PronounyConfig = {
	failQuietly: true,
	deepSearch: false,
	useRandom: true,
};

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
	}

	resolve(pronoun: string, deepSearch = this.config.deepSearch): Pronoun {
		const resolvedPronoun = this.resolveMap.get(pronoun);
		switch (true) {
			case resolvedPronoun !== undefined:
				return resolvedPronoun;
			case deepSearch:
				let searchResult;
				this.resolveMap.forEach((mapPronoun) => {
					Object.values(mapPronoun).forEach((type) => {
						if (type.includes(pronoun)) {
							searchResult = mapPronoun;
						}
					});
				});
				if (searchResult) {
					return searchResult;
				}
			case this.config.failQuietly:
				return this.resolveMap.get("they")!;
			default:
				throw new Error(`Pronoun "${pronoun}" not found`);
		}
	}

	add(pronoun: Pronoun): void {
		this.resolveMap.set(pronoun.sbj[0], pronoun);
	}

	remove(pronoun: Pronoun): void {
		this.resolveMap.delete(pronoun.sbj[0]);
	}

	set(
		pronouns: string | Array<string>,
		delimiter: string = "/"
	): PronounSet {
		if (typeof pronouns === 'string' && delimiter !== undefined) {
			pronouns = pronouns.split(delimiter);
		}
		let result: PronounSet = new PronounSet(this, pronouns);
		return result;
	}

	new(pronouns: {
		subject: Array<string> | string,
		object: Array<string> | string,
		possessive: Array<string> | string,
		psAdjective: Array<string> | string,
		reflexive: Array<string> | string
	}, autoAppend = true) {
		const newPronoun = new Pronoun(pronouns);
		this.add(newPronoun);
		return newPronoun
	}
}
