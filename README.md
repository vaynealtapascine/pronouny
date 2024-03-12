# Pronouny

**Pronouny** is a typed library intended to make programmatically resolving English pronouns easier. It does so by providing three classes: `Pronoun`, `PronounSet` and `Validate`, each with their respective uses.

## Installation

To install, simply do `npm install pronouny`.

## `Pronoun` class

This class is intended to define individual `Pronoun`s. It includes subject, object, possessive adjective, possessive, and reflexive pronouns. It also contains a set of methods for extending, removing, and getting a pronoun string.

## `PronounSet` class

This class is intended to define `Pronoun`s for an individual or entity. It contains an array of `Pronoun`s, from which you can programmatically obtain a string using `use(type)`. `type` can be any of the five kinds from `Pronoun` (`sbj`, `obj`, `psAdj`, `psPrn`, and `rfx`).

## `Validate` class

This class is intended to verify and retrieve correct pronouns. It is centered around the `pronounSet` map, which is used to validate and return a `Pronoun` object using `resolvePronouns()` or `resolvePronounsStrict()`.

## Example

```ts
// Single import
import Pronouny from 'pronouny';

// Create a new instance of the Validate class
const p = new Pronouny({
	failQuietly: false
});

// Create a new Pronoun object for ze/hir pronouns
const pronounZe = p.new({
	subject: "ze",
	object: "hir",
	possessive: "hirs",
	psAdjective: "hir",
	reflexive: "hirself",
});

// Add the pronoun to the pronounSet map
p.add(pronounZe);

// Set someone's pronouns.
const vayne = {
	username: "vaynegarden",
	pronouns: p.set("she/ze/they"),
};

// Resolve the pronouns in your app
console.log(
	vayne.username + " updated " + vayne.pronouns.psAdjective() + " status."
);
// Returns "vaynegarden updated her status", "vaynegarden
// updated hir status", or "vaynegarden updated their status",
// selected randomly among the three.
```

## Changelog

### v.0.2.0

-   now fails silently when trying to resolve pronouns that don't exist or indexing out of bounds.
-   implementation of `PronounSet` class changed to Set from Array to prevent duplicate pronouns.
-   added `get()` method to `PronounSet` class to retrieve a random Pronoun object.
-   added `add()` and `remove()` on `PronounSet`

## TODO

[ ] Full rewrite

-   [x] Consolidate implementation into one general-use class.
-   [x] Add global configuration for pronoun use.
-   [ ] Implement template literal use.
-   [ ] Cleaner error handling.
-   [ ] Use more performant data structures.
