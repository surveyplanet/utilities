import path from 'path';
import { copyFile } from 'fs/promises';
import { build as esbuild, BuildOptions } from 'esbuild';

const baseConfig: BuildOptions = {
	platform: 'node',
	target: 'esnext',
	format: 'cjs',
	nodePaths: [path.join(__dirname, '../src')],
	sourcemap: true,
	external: [],
	bundle: true,
};

async function main() {
	await copyFile(
		path.join(__dirname, '../package.json'),
		path.join(__dirname, '../build/package.json')
	);

	await esbuild({
		...baseConfig,
		outdir: path.join(__dirname, '../build/cjs'),
		entryPoints: [path.join(__dirname, '../src/index.ts')],
	});

	await esbuild({
		...baseConfig,
		format: 'esm',
		outdir: path.join(__dirname, '../build/esm'),
		entryPoints: [path.join(__dirname, '../src/index.ts')],
	});
}

if (require.main === module) {
	main();
}
