/**
 * Small, dependency-free helpers shared across Pronouny.
 * @module
 */

import type { PartialConfig, PronounyConfig } from "./types.js";

/** Return a random integer in the range `[0, length)`. */
export function randomIndex(length: number): number {
	return Math.floor(Math.random() * length);
}

/** Uppercase the first character of a word, leaving the rest intact. */
export function capitalize(word: string): string {
	if (!word) return word;
	return word[0].toUpperCase() + word.slice(1);
}

/**
 * Whether a word begins with an uppercase letter. Returns `false`
 * for empty strings and for leading characters with no case (digits,
 * punctuation, etc.).
 */
export function startsUppercase(word: string): boolean {
	if (!word) return false;
	const first = word[0];
	return first === first.toUpperCase() && first !== first.toLowerCase();
}

/** Coerce a single value or array into an array. */
export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}

/**
 * Merge a per-call {@link PartialConfig} on top of a base config,
 * returning a **new** object. Never mutates either argument — this is
 * the safe alternative to `Object.assign(base, override)`.
 */
export function mergeConfig(
	base: PronounyConfig,
	override?: PartialConfig
): PronounyConfig {
	return override ? { ...base, ...override } : base;
}
