#! /usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import { copyFile } from 'fs/promises';
import { build as esbuild } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseConfig = {
	platform: 'node',
	target: 'esnext',
	format: 'esm',
	nodePaths: [path.join(__dirname, '../src')],
	sourcemap: true,
	external: [],
	bundle: true,
};

(async function () {
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
})()
	.then(() => {
		console.log('Build complete');
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
