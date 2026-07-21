/**
 * Error handling for Pronouny.
 * @module
 */

/** The category of a {@link PnyError}. */
export type PnyErrorType =
	| "PronounResolutionError"
	| "PronounValidationError"
	| "PronounIndexingError"
	| "PronounDeletionError"
	| "PronounFormError";

/**
 * A typed error thrown by Pronouny when `failQuietly` is disabled.
 *
 * Extends the native {@link Error} so it can be caught with a normal
 * `try`/`catch` and inspected via `instanceof PnyError`. The
 * {@link PnyError.type} property carries the machine-readable category.
 */
export class PnyError extends Error {
	/** The machine-readable category of this error. */
	readonly type: PnyErrorType;

	constructor(type: PnyErrorType, message: string) {
		super(message);
		this.name = "PnyError";
		this.type = type;
		// Restore the prototype chain (needed when targeting ES5/ES2015
		// where extending built-ins can break `instanceof`).
		Object.setPrototypeOf(this, PnyError.prototype);
	}

	toString(): string {
		return `${this.name} [${this.type}]: ${this.message}`;
	}
}
