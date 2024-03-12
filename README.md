# Pronouny

**Pronouny** is a typed library intended to make programmatically resolving English pronouns easier. It does so by providing three classes: `Pronoun`, `PronounSet` and `Validate`, each with their respective uses.

## Installation

To install, simply run `npm install pronouny`.

## Usage

```ts
// Single import
import Pronouny from 'pronouny';

// Create a new instance of the Validate class
// All options are optional
const p = new Pronouny({
	// Will default to failing quietly into "they"
	failQuietly: true,

	// Will default to only querying the first subject
	// pronoun to limit scope. Set to "true" to force
	// recursive search.
	deepSearch: false,

	// Will default to using random pronouns in arrays.
	// Set to false to force using 0 index.
	useRandom: true,
});

// Create a new Pronoun object using Pronouny.new()
const pronounZe: Pronoun = p.new({
	subject: "ze",
	object: "hir",
	possessive: "hirs",
	psAdjective: "hir",
	reflexive: "hirself",
}, false);

// .new() will automatically add new Pronouns to its
// validation map. however, if you want to do so manually,
// you can do it with Pronouny.add().
p.add(pronounZe);

// .remove() also works;
p.remove(p.resolve("I"));
// this deletes the "I" pronoun from the map.

// Methods are chainable and you can reach the Pronoun class.
p.add(pronounZe).set("he/they").use().subject().
//   ^Pronouny      ^PronounSet    ^Pronoun  ^string

// Instantiate a set of pronouns using Pronouny.set().
const vayne = {
	username: "vaynegarden",
	pronouns: p.set("she/ze/they"),
};
// from there, you can use `[PronounSet].use()` to get a random pronoun.

// Resolve the pronouns in your app by referencing the form
// that you need. There's `subject`, `object`, `possessive`,
// `psAdjective`, and `reflexive`.
console.log(
	`${vayne.username} has updated ${vayne.pronouns.psAdjective()} status.`
);
// This returns "vaynegarden updated her status", "vaynegarden
// updated hir status", or "vaynegarden updated their status",
// selected randomly among the three.
```

## Changelog

### v0.3.0

-   Rewritten to consolidate functionality into a single default export `Pronouny`.
-   Includes "we", "you", and "I" pronouns by default.
-   Added a config object so you can decide on error handling globally.
-   All methods are now chainable for ease of use.

### v0.2.0

-   Now fails silently when trying to resolve pronouns that don't exist or indexing out of bounds.
-   Implementation of `PronounSet` class changed to Set from Array to prevent duplicate pronouns.
-   added `get()` method to `PronounSet` class to retrieve a random Pronoun object.
-   Added `add()` and `remove()` on `PronounSet`

### v0.1.2

-   Initial release.

## TODO

[ ] Full rewrite

-   [x] Consolidate implementation into one general-use class.
-   [x] Add global configuration for pronoun use.
-   [ ] Use more performant data structures.
-   [ ] Cleaner error handling.
-   [ ] Unique pronoun identifiers to allow for pronouns with the same first subject pronoun to have multiple forms.
