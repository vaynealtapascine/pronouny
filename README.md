# Pronouny

**Pronouny** is a small, typed library that makes programmatically resolving English pronouns easy. It ships as both ESM and CommonJS, has zero runtime dependencies, and is designed to be extended.

## Installation

```sh
npm install pronouny
```

## Quick start

```ts
import Pronouny from "pronouny";

const p = new Pronouny();

const vayne = {
	username: "vaynegarden",
	pronouns: p.set("she/they"),
};

console.log(vayne.pronouns.parse`${vayne.username} updated ${"their"} status.`);
// "vaynegarden updated her status." or "...their status.", chosen
// consistently for the whole sentence.
```

## Concepts

Pronouny has three classes:

| Class            | What it is                                                          |
| ---------------- | ------------------------------------------------------------------- |
| **`Pronouny`**   | The resolver. Registers pronouns and turns strings into `Pronoun`s. |
| **`Pronoun`**    | A single pronoun with all five grammatical forms.                   |
| **`PronounSet`** | An ordered set of `Pronoun`s for one entity (e.g. `she/they`).      |

Every pronoun has five **forms**:

| Form                   | Example (`she`) | Aliases accepted on input |
| ---------------------- | --------------- | ------------------------- |
| `subject`              | she             |                           |
| `object`               | her             |                           |
| `possessive`           | hers            |                           |
| `possessiveDeterminer` | her             | `possessiveAdjective`     |
| `reflexive`            | herself         | `intensive`               |

## Configuration

All configuration is optional. The defaults are shown below, and any
option can be overridden per call by passing a partial config as the
last argument to most methods.

```ts
const p = new Pronouny({
	// Recoverable errors resolve to a fallback instead of throwing.
	failQuietly: true,

	// resolve() only matches ids/subject forms. Set true to match any form.
	deepSearch: false,

	// Pick forms/pronouns at random. Set false to always use the first.
	useRandom: true,

	// The id used whenever resolution fails quietly.
	fallbackPronoun: "they",
});
```

Pronouny ships with `he`, `she`, `they`, `it`, `you`, `we`, and `i`
registered by default.

## Usage

### Adding and removing pronouns

```ts
// Register a pronoun under a unique id. A form may be a single string
// or an array of accepted spellings.
const ze = p.add("ze", {
	subject: "ze",
	object: "hir",
	possessive: "hirs",
	possessiveDeterminer: "hir",
	reflexive: "hirself",
});

// Because ids are explicit, two pronouns can share a subject form —
// e.g. a plural and a singular "they":
p.add("they-singular", {
	subject: "they",
	object: "them",
	possessive: "theirs",
	possessiveDeterminer: "their",
	reflexive: "themself",
});

// Remove a pronoun by id.
p.remove("it");
```

### Resolving and identifying

```ts
p.resolve("she").id; // "she"

// Shallow resolution (default) only matches ids and subject forms, so
// "him" falls back to "they":
p.resolve("him").id; // "they"

// Deep resolution matches any form:
p.resolve("him", { deepSearch: true }).id; // "he"

// identify() reports which form a word is, or undefined:
p.identify("her"); // "object"
p.identify("their"); // "possessiveDeterminer"
p.identify("banana"); // undefined
```

### Getting a specific form

Use `.as(form)` on a `Pronoun`, or on a `PronounSet` to pick one member
first.

```ts
const they = p.resolve("they");
they.as("subject"); // "they"
they.as("possessiveDeterminer"); // "their"
they.as("intensive"); // alias of "reflexive"

// A PronounSet picks a member (per config) then returns the form:
p.set("she/they").as("object"); // "her" or "them"
```

### Template parsing

`parse` is a tagged-template helper. Interpolated pronoun words are
rewritten into the correct form and capitalisation is preserved;
everything else is left untouched.

On a `Pronoun`, every substitution uses that pronoun. On a `PronounSet`,
each substitution independently draws a pronoun from the set (per the
`useRandom` config), so a multi-pronoun set is distributed across the
string:

```ts
const pronouns = p.set("she/they");

pronouns.parse`${"They"} lost ${"their"} keys — help ${"them"}!`;
// e.g. "She lost their keys — help them!" — each slot is drawn from the set.
```

Set `useRandom: false` if you want every slot to use the first member of
the set instead.

## Error handling

When `failQuietly` is `false`, recoverable problems throw a typed
[`PnyError`](src/errors.ts) instead of falling back:

```ts
import Pronouny, { PnyError } from "pronouny";

const strict = new Pronouny({ failQuietly: false });

try {
	strict.resolve("notapronoun");
} catch (err) {
	if (err instanceof PnyError) {
		console.error(err.type); // "PronounResolutionError"
	}
}
```

`PnyError` extends the native `Error`, so it works with normal
`try`/`catch` and `instanceof`.

## Extending the defaults

Pass your own pronoun map as the second constructor argument to replace
the built-ins entirely:

```ts
import Pronouny, { DEFAULT_PRONOUNS } from "pronouny";

// Start from the defaults and add to them.
const p = new Pronouny(
	{},
	{
		...DEFAULT_PRONOUNS,
		xe: {
			subject: "xe",
			object: "xem",
			possessive: "xyrs",
			possessiveDeterminer: "xyr",
			reflexive: "xemself",
		},
	},
);
```

## Development

```sh
npm install
npm test        # run the Jest suite
npm run build   # emit ESM + CJS + type declarations to lib/
```

## Changelog

### v1.0.0

- **Rewritten as a modular, multi-file package** with a proper dual
  ESM/CJS build, type declarations, and an `exports` map.
- **Bug fixes:**
    - Per-call config no longer mutates the shared instance config.
    - Random selection and index bounds now reach the last element and
      no longer read out of bounds.
    - `deepSearch` now actually performs a deep search.
    - `parse()` compares words case-insensitively, so capitalised
      non-pronoun words are left alone.
- **Performance:** resolution and identification are backed by
  hash-map indexes (O(1)) instead of linear scans.
- **Errors:** `PnyError` now extends the native `Error` and is only
  thrown when `failQuietly` is disabled (no more unconditional
  `console.error`).
- Pronouns are registered under explicit ids, so multiple pronouns can
  share the same subject form.
- Added `it` to the default pronouns and `identify()`, `has()`,
  `get()`, and `list()` to `Pronouny`.

### v0.5.0

- Added `parse()` method to `Pronoun` and `PronounSet` to allow for parsing of strings into their correct pronoun forms.
- Added optional `resolver` property to `Pronoun`s to allow retracing to related Pronouny instance.
- Added `identify()` method to `Pronouny` to allow for identification for type of pronouns.

### v0.4.0

- Optimized `forEach()` calls to use `for` loops instead.
- Added `fallbackPronoun` option to allow for configuration of pronoun to use in case of quiet failure states.
- Removed redundant `set` parameter from `[PronounSet].remove()` calls.

### v0.3.1

- Added documentation.
- Reordered `failQuietly` and `useRandom` on `Pronoun`.
- Tested and fixed examples.

### v0.3.0

- Rewritten to consolidate functionality into a single default export `Pronouny`.
- Includes "we", "you", and "I" pronouns by default.
- Added a config object so you can decide on error handling globally.
- All methods are now chainable for ease of use.

### v0.2.0

- Now fails silently when trying to resolve pronouns that don't exist or indexing out of bounds.
- Implementation of `PronounSet` class changed to Set from Array to prevent duplicate pronouns.
- added `get()` method to `PronounSet` class to retrieve a random Pronoun object.
- Added `add()` and `remove()` on `PronounSet`

### v0.1.2

- Initial release.

## TODO

- [x] Consolidate implementation into one general-use class.
- [x] Add global configuration for pronoun use.
- [x] Use more performant data structures. _(hash-map indexes for O(1) resolve/identify)_
- [x] Cleaner error handling. _(typed `PnyError extends Error`, thrown only when not failing quietly)_
- [x] Unique pronoun identifiers to allow for pronouns with the same first subject pronoun to have multiple forms. _(pronouns are keyed by explicit `id`)_
