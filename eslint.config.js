import eslintJs from '@eslint/js';
import eslintComments from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
	{
		ignores: ['bin/*', 'esbuild-hook.js', 'src/index.ts', 'dist/*', 'node_modules/*'],
	},
	eslintJs.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strict,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.lint.json',
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			import: importPlugin,
			'eslint-comments': eslintComments,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: 'tsconfig.json',
				},
			},
		},
		rules: {
			...eslintComments.configs.recommended.rules,
			'import/order': [
				'error',
				{
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/no-extraneous-dependencies': 'error',
			'import/no-mutable-exports': 'error',
			'import/no-unused-modules': 'error',
		},
	},
	eslintConfigPrettier,
);
