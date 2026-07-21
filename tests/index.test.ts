import Pronouny, {
	Pronoun,
	PronounSet,
	PnyError,
} from "../src/index";

describe("Pronouny — construction & defaults", () => {
	it("registers the default pronouns", () => {
		const p = new Pronouny();
		for (const id of ["he", "she", "they", "it", "you", "we", "i"]) {
			expect(p.has(id)).toBe(true);
		}
		expect(p.list()).toHaveLength(7);
	});

	it("applies default config and merges overrides without mutating defaults", () => {
		const a = new Pronouny();
		const b = new Pronouny({ useRandom: false, deepSearch: true });
		expect(a.config.useRandom).toBe(true);
		expect(a.config.deepSearch).toBe(false);
		expect(b.config.useRandom).toBe(false);
		expect(b.config.deepSearch).toBe(true);
		// A second default instance must not inherit b's overrides.
		expect(new Pronouny().config.useRandom).toBe(true);
	});

	it("accepts a custom pronoun map", () => {
		const p = new Pronouny(
			{},
			{
				ze: {
					subject: "ze",
					object: "hir",
					possessive: "hirs",
					possessiveDeterminer: "hir",
					reflexive: "hirself",
				},
			}
		);
		expect(p.list()).toHaveLength(1);
		expect(p.resolve("ze").as("object", 0)).toBe("hir");
	});
});

describe("Pronouny.resolve", () => {
	it("resolves by id and subject (shallow)", () => {
		const p = new Pronouny();
		expect(p.resolve("she").id).toBe("she");
		expect(p.resolve("I").id).toBe("i"); // subject casing normalised
	});

	it("does not match non-subject forms when deepSearch is off", () => {
		const p = new Pronouny();
		// "him" is only an object form; shallow search falls back to they.
		expect(p.resolve("him").id).toBe("they");
	});

	it("matches any form when deepSearch is on", () => {
		const p = new Pronouny({ deepSearch: true });
		expect(p.resolve("him").id).toBe("he");
		expect(p.resolve("themselves").id).toBe("they");
	});

	it("falls back quietly to the fallback pronoun", () => {
		const p = new Pronouny();
		expect(p.resolve("notapronoun").id).toBe("they");
	});

	it("throws a PnyError when failQuietly is off", () => {
		const p = new Pronouny({ failQuietly: false });
		expect(() => p.resolve("notapronoun")).toThrow(PnyError);
		try {
			p.resolve("notapronoun");
		} catch (err) {
			expect((err as PnyError).type).toBe("PronounResolutionError");
		}
	});

	it("honours a per-call config override without mutating global config", () => {
		const p = new Pronouny();
		expect(p.resolve("him", { deepSearch: true }).id).toBe("he");
		// global config remained shallow
		expect(p.config.deepSearch).toBe(false);
		expect(p.resolve("him").id).toBe("they");
	});
});

describe("Pronouny.identify", () => {
	it("identifies canonical forms case-insensitively", () => {
		const p = new Pronouny();
		expect(p.identify("she")).toBe("subject");
		expect(p.identify("Her")).toBe("object");
		expect(p.identify("hers")).toBe("possessive");
		expect(p.identify("their")).toBe("possessiveDeterminer");
		expect(p.identify("himself")).toBe("reflexive");
	});

	it("returns undefined for unknown words", () => {
		expect(new Pronouny().identify("banana")).toBeUndefined();
	});
});

describe("Pronouny.add / remove", () => {
	it("adds a pronoun from a loose definition and registers it", () => {
		const p = new Pronouny();
		const ze = p.add("ze", {
			subject: "ze",
			object: "hir",
			possessive: "hirs",
			possessiveDeterminer: "hir",
			reflexive: "hirself",
		});
		expect(ze).toBeInstanceOf(Pronoun);
		expect(p.resolve("ze")).toBe(ze);
		expect(p.resolve("hir", { deepSearch: true }).id).toBe("ze");
	});

	it("accepts an existing Pronoun instance", () => {
		const p = new Pronouny();
		const ze = p.add("ze", {
			subject: "ze",
			object: "hir",
			possessive: "hirs",
			possessiveDeterminer: "hir",
			reflexive: "hirself",
		});
		const clone = p.add("ze2", ze);
		expect(clone.as("object", 0)).toBe("hir");
		expect(p.has("ze2")).toBe(true);
	});

	it("lets two pronouns share a subject via distinct ids", () => {
		const p = new Pronouny();
		p.add("they-singular", {
			subject: "they",
			object: "them",
			possessive: "theirs",
			possessiveDeterminer: "their",
			reflexive: "themself",
		});
		expect(p.has("they")).toBe(true);
		expect(p.has("they-singular")).toBe(true);
		expect(p.resolve("they-singular").as("reflexive", 0)).toBe("themself");
	});

	it("removes a pronoun by id", () => {
		const p = new Pronouny();
		p.remove("it");
		expect(p.has("it")).toBe(false);
		// "it" now falls back to they
		expect(p.resolve("it").id).toBe("they");
	});

	it("refuses to remove the fallback pronoun", () => {
		const p = new Pronouny();
		expect(() => p.remove("they")).toThrow(PnyError);
	});

	it("throws PnyValidationError for an incomplete definition when validating", () => {
		const p = new Pronouny();
		expect(() =>
			p.add("bad", {
				subject: "x",
				object: "y",
				possessive: "z",
				// missing possessiveDeterminer & reflexive
			} as any)
		).toThrow(PnyError);
	});
});

describe("Pronoun.as", () => {
	const p = new Pronouny({ useRandom: false });

	it("returns the requested form", () => {
		const they = p.resolve("they");
		expect(they.as("subject")).toBe("they");
		expect(they.as("object")).toBe("them");
		expect(they.as("possessive")).toBe("theirs");
		expect(they.as("possessiveDeterminer")).toBe("their");
	});

	it("supports form aliases", () => {
		const she = p.resolve("she");
		expect(she.as("possessiveAdjective")).toBe(she.as("possessiveDeterminer"));
		expect(she.as("intensive")).toBe(she.as("reflexive"));
	});

	it("indexes into multi-spelling forms and covers the last element", () => {
		const they = p.resolve("they");
		const reflexives = they.components.reflexive;
		expect(they.as("reflexive", reflexives.length - 1)).toBe(
			reflexives[reflexives.length - 1]
		);
	});

	it("fails quietly on out-of-range index, throws when strict", () => {
		const they = p.resolve("they");
		expect(they.as("subject", 99)).toBe("they");
		expect(() => they.as("subject", 99, { failQuietly: false })).toThrow(
			PnyError
		);
	});

	it("can reach every spelling when random", () => {
		const rp = new Pronouny();
		const they = rp.resolve("they");
		const seen = new Set<string>();
		for (let i = 0; i < 500; i++) seen.add(they.as("reflexive"));
		expect(seen.size).toBe(they.components.reflexive.length);
	});
});

describe("PronounSet", () => {
	it("builds from a delimited string and de-duplicates", () => {
		const p = new Pronouny();
		const set = p.set("she/they/she");
		expect(set).toBeInstanceOf(PronounSet);
		expect(set.size).toBe(2);
	});

	it("supports a custom delimiter and whitespace", () => {
		const p = new Pronouny();
		const set = p.set("she, they", ",");
		expect(set.size).toBe(2);
	});

	it("use() with fixed index and config is deterministic", () => {
		const p = new Pronouny();
		const set = p.set("she/they");
		expect(set.use(0).id).toBe("she");
		expect(set.use(1).id).toBe("they");
	});

	it("use() can reach every member when random", () => {
		const p = new Pronouny();
		const set = p.set("she/ze/they", "/", { failQuietly: true });
		p.add("ze", {
			subject: "ze",
			object: "hir",
			possessive: "hirs",
			possessiveDeterminer: "hir",
			reflexive: "hirself",
		});
		const set2 = p.set("she/ze/they");
		const seen = new Set<string>();
		for (let i = 0; i < 500; i++) seen.add(set2.use().id);
		expect(seen.size).toBe(3);
	});

	it("as() returns a valid form from one of its members", () => {
		const p = new Pronouny({ useRandom: false });
		const set = p.set("she/they");
		expect(set.as("object")).toBe("her"); // first member, not random
	});

	it("add() and remove() are chainable and resolve strings", () => {
		const p = new Pronouny();
		const set = p.set("she");
		set.add("they").add("he");
		expect(set.size).toBe(3);
		set.remove("he");
		expect(set.size).toBe(2);
	});
});

describe("parse (tagged templates)", () => {
	it("rewrites pronoun words to the correct form and preserves case", () => {
		const p = new Pronouny();
		const she = p.resolve("she");
		expect(she.parse`${"They"} updated ${"their"} status.`).toBe(
			"She updated her status."
		);
	});

	it("leaves non-pronoun words (including capitalised ones) untouched", () => {
		const p = new Pronouny();
		const he = p.resolve("he");
		expect(he.parse`${"Status"} for ${"they"} is fine.`).toBe(
			"Status for he is fine."
		);
	});

	it("PronounSet.parse draws each substitution from the set", () => {
		const p = new Pronouny();
		const set = p.set("she/he");
		// Every substituted subject pronoun must be a valid member of the
		// set ("she" or "he"), independently chosen per interpolation.
		for (let i = 0; i < 200; i++) {
			const out = set.parse`${"They"}.`;
			expect(["She.", "He."]).toContain(out);
		}
	});

	it("PronounSet.parse distributes across all members over many runs", () => {
		const p = new Pronouny();
		const set = p.set("she/he/they");
		const seen = new Set<string>();
		for (let i = 0; i < 500; i++) {
			seen.add(set.parse`${"They"}`);
		}
		// With random distribution, every member should surface a subject.
		expect(seen).toEqual(new Set(["She", "He", "They"]));
	});

	it("PronounSet.parse honours useRandom:false (always first member)", () => {
		const p = new Pronouny({ useRandom: false });
		const set = p.set("she/he/they");
		expect(set.parse`${"They"} lost ${"their"} keys.`).toBe(
			"She lost her keys."
		);
	});
});
