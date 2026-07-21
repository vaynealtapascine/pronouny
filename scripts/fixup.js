// Writes the CommonJS/ESM boundary markers into the build output so
// that Node resolves each build with the correct module system, even
// though the root package.json has no "type" field.
const fs = require("fs");
const path = require("path");

const targets = [
	["lib/cjs", '{\n\t"type": "commonjs"\n}\n'],
	["lib/esm", '{\n\t"type": "module"\n}\n'],
];

for (const [dir, contents] of targets) {
	const dest = path.join(__dirname, "..", dir);
	fs.mkdirSync(dest, { recursive: true });
	fs.writeFileSync(path.join(dest, "package.json"), contents);
}

console.log("fixup: wrote module type markers to lib/cjs and lib/esm");
