import path from 'path';
import { copyFile } from 'fs/promises';
import { build as esbuild, type BuildOptions } from 'esbuild';

const baseConfig: BuildOptions = {
	platform: 'node',
	target: 'esnext',
	format: 'esm',
	nodePaths: [path.join(__dirname, '../src')],
	sourcemap: true,
	external: [],
	bundle: true,
};

async function main() {
	await copyFile(
		path.join(__dirname, '../package.json'),
		path.join(__dirname, '../dist/package.json')
	);

	// await esbuild({
	// 	...baseConfig,
	// format: 'cjs',
	// 	outdir: path.join(__dirname, '../dis/cjs'),
	// 	entryPoints: [path.join(__dirname, '../src/index.ts')],
	// });

	await esbuild({
		...baseConfig,
		outdir: path.join(__dirname, '../dist'),
		entryPoints: [path.join(__dirname, '../src/index.ts')],
	});
}

if (require.main === module) {
	main();
}
