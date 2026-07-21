/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": ["ts-jest", {}],
	},
	// Source uses NodeNext-style ".js" extensions in relative imports so
	// the emitted ESM is spec-compliant. Strip them for test resolution
	// so Jest finds the ".ts" sources.
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};
