/*
 * @Author: tangdaoyong
 * @Date: 2021-04-20 16:52:30
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-04-20 16:53:02
 * @Description: eslint配置文件
 */
// module.exports = {
// 	'env': {
// 		'amd': true, //表示使用amd模块规范，支持 require
// 		'node': true, //支持node
// 		'browser': true,
// 		'es2021': true
// 	},
// 	'extends': [
// 		'eslint:recommended',
// 		'plugin:react/recommended',
// 		'plugin:@typescript-eslint/recommended'
// 	],
// 	'parser': '@typescript-eslint/parser',
// 	'parserOptions': {
// 		'ecmaFeatures': {
// 			'jsx': true
// 		},
// 		'ecmaVersion': 12,
// 		'sourceType': 'module'
// 	},
// 	'plugins': [
// 		'react',
// 		'@typescript-eslint'
// 	],
// 	'rules': {
// 		'indent': [
// 			'error',
// 			'tab'
// 		],
// 		'linebreak-style': [
// 			'error',
// 			'unix'
// 		],
// 		'quotes': [
// 			'error',
// 			'single'
// 		],
// 		'semi': [
// 			'error',
// 			'always'
// 		]
// 	}
// };
module.exports = {
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'plugins': ['react'],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'env': {
        'es6': true,
        'browser': true,
        'commonjs': true
    },
    'rules': {
        'no-cond-assign': 'error',
        'no-constant-condition': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty-character-class': 'error',
        'no-empty': 'warn',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-obj-calls': 'error',
        'no-regex-spaces': 'error',
        'no-sparse-arrays': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-else-return': 'error',
        'no-empty-pattern': 'error',
        'no-redeclare': 'error',
        'no-delete-var': 'error',
        'no-lonely-if': 'error',
        'no-self-assign': 'error',
        'no-multiple-empty-lines': ['warn', { 'max': 1 }],
        'no-unused-vars': 'warn',
        'space-infix-ops': 'error',
        'spaced-comment': 'warn',
        'comma-spacing': 'error',
        'comma-style': 'error',
        'comma-dangle': 'error',
        'semi': 'error',
        'semi-spacing': 'error',
        'key-spacing': 'error',
        'curly': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'accessor-pairs': 'error',
        'eqeqeq': 'error',
        'radix': 'error',
        'quotes': ['error', 'single'],
        'indent': ['warn', 4, { 'SwitchCase': 1, 'MemberExpression': 2 }],
        'keyword-spacing': 'error',
        'arrow-spacing': 'error',
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
        'jsx-quotes': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-deprecated': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-multi-comp': 'error',
        'react/no-string-refs': 'error',
        'react/no-unused-prop-types': 'error',
        'react/prefer-es6-class': 'off',
        'react/prop-types': 'off',
        'react/jsx-uses-vars': 'warn',
        'react/jsx-uses-react': 'error'
    }
};