/**
 * The pronouns Pronouny ships with out of the box.
 * @module
 */

import type { PronounInput } from "./types.js";

/**
 * The default set of English pronouns registered on every new
 * {@link Pronouny} instance, keyed by `id`. Pass your own map to the
 * constructor (or {@link Pronouny.add} more later) to extend or replace
 * these.
 */
export const DEFAULT_PRONOUNS: Record<string, PronounInput> = {
	he: {
		subject: "he",
		object: "him",
		possessive: "his",
		possessiveDeterminer: "his",
		reflexive: "himself",
	},
	she: {
		subject: "she",
		object: "her",
		possessive: "hers",
		possessiveDeterminer: "her",
		reflexive: "herself",
	},
	they: {
		subject: "they",
		object: "them",
		possessive: "theirs",
		possessiveDeterminer: "their",
		reflexive: ["themselves", "themself", "theirself", "theirselves"],
	},
	it: {
		subject: "it",
		object: "it",
		possessive: "its",
		possessiveDeterminer: "its",
		reflexive: "itself",
	},
	you: {
		subject: "you",
		object: "you",
		possessive: "yours",
		possessiveDeterminer: "your",
		reflexive: ["yourself", "yourselves"],
	},
	we: {
		subject: "we",
		object: "us",
		possessive: "ours",
		possessiveDeterminer: "our",
		reflexive: "ourselves",
	},
	i: {
		subject: "I",
		object: "me",
		possessive: "mine",
		possessiveDeterminer: "my",
		reflexive: "myself",
	},
};
