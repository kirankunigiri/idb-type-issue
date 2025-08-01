import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import pluginReactConfig from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	// JavaScript and TypeScript configuration
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		extends: [

			// Use these before committing to check for more detailed errors (but is much slower)
			// ...tseslint.configs.recommendedTypeChecked,
			// ...tseslint.configs.stylisticTypeChecked,
			// Use these during development for speed improvements
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,

			// ...fixupConfigRules(pluginReactConfig),
			pluginReactConfig.configs.flat['recommended'],
			pluginReactConfig.configs.flat['jsx-runtime'],
			stylistic.configs['recommended'],
			...tailwind.configs['flat/recommended'],
		],
		plugins: {
			'react': pluginReactConfig,
			'@stylistic': stylistic,
			'react-hooks': eslintPluginReactHooks,
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			// ESLint react-hooks recommended config
			...eslintPluginReactHooks.configs['recommended-latest'].rules,

			// Stylistic
			'@stylistic/no-tabs': 'off',
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/jsx-indent': ['warn', 'tab'],
			'@stylistic/jsx-indent-props': ['warn', 'tab'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/brace-style': ['error', '1tbs'],

			// JavaScript
			'prefer-template': 'error',
			'no-useless-assignment': 'error',

			// TypeScript
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/array-type': 'error',
			'@typescript-eslint/consistent-indexed-object-style': 'error',

			// React
			'react/react-in-jsx-scope': 'off',
			'react/no-children-prop': 'off',

			// Tailwind - disable enforces-shorthand for NativeWind compatibility
			// NativeWind doesn't support size-* utilities, so we disable this rule
			'tailwindcss/enforces-shorthand': 'off',

			// Simple Import Sort
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},

	// TypeScript parser configuration
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json', './shared/tsconfig.json', './app/tsconfig.json'],
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	// Disables type-checked rules on non-TypeScript files
	{
		files: ['**/*.{js,mjs,cjs}'],
		extends: [tseslint.configs.disableTypeChecked],
	},

	// JSON configuration
	{
		files: ['**/*.json'],
		extends: [...eslintPluginJsonc.configs['flat/recommended-with-json']],
		rules: {
			'jsonc/indent': ['error', 'tab', {}],
			'jsonc/no-comments': 'off',
		},
	},

	// package.json specific rules
	{
		files: ['**/package.json'],
		rules: {
			'jsonc/no-comments': 'error',
			'jsonc/sort-keys': [
				'error',
				{
					pathPattern: '^$',
					order: [
						'name',
						'version',
						'private',
						'type',
						'publishConfig',
						'scripts',
						'dependencies',
						'devDependencies',
					],
				},
				{
					pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
					order: { type: 'asc' },
				},
			],
		},
	},

	// Tailwind config
	{
		settings: {
			tailwindcss: {
				config: './app/tailwind.config.js',
				callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'tw'],
				tags: ['tw'],
			},
		},
	},
);
