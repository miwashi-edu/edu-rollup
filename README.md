# edu-rollup

## Terser

> Terser is a JavaScript minifier, often used to reduce the size of JavaScript files by removing unnecessary characters like whitespace, comments, and shortening variable names. It’s primarily employed in the build process of web applications to optimize performance by delivering smaller, faster-loading scripts.
> Key features, minification, compression ES6 support, Source Maps, Tree-Shaking.

[Terser](https://terser.org)

### Example

```bash
npm install terser --save-dev
npx terser your-file.js --compress --mangle --output your-file.min.js
```


## Babel

> Babel is a JavaScript compiler and toolchain primarily used to convert modern JavaScript (ES6+ and beyond) into backward-compatible versions that can run in older browsers or environments that do not support the latest language features. It allows developers to use cutting-edge JavaScript syntax and features without worrying about browser compatibility.
> Key Features: Transpiles ES6 to ES5, Polyfills, Custom Plugins, Preset-based Configuration, React JSX Trannspilation, TypeScript Support

[Babel](https://babeljs.io)

## Resolver

> @rollup/plugin-node-resolve is a plugin for Rollup, a popular JavaScript module bundler. The plugin allows Rollup to resolve third-party packages from node_modules, making it easier to bundle dependencies in your project. By default, Rollup only understands ES modules (files with .js extensions that use import/export syntax), but most libraries in node_modules are published as CommonJS or other formats.
> Key Features: Resolves third-party modules, Supports different module formats, Browser field support, Custom extensions

[Resolver](https://www.npmjs.com/package/@rollup/plugin-node-resolve)

## postcss plugin

> The PostCSS plugin for Rollup is used to process CSS files with PostCSS during the Rollup bundling process. PostCSS is a tool for transforming CSS with JavaScript plugins, which can modify your CSS files in various ways, such as adding vendor prefixes, optimizing the code, or allowing the use of future CSS syntax.
> Key Features: Importing CSS, PostCSS Plugins, CSS Modules, Extract CSS, Sass/LESS Support

[rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss)

## Prepare

```bash
cd ~
cd ws
cd fwk-components
```


## Install rollup

```bash
npm install --save-dev rollup
```


## Install Transpiler

```bash
npm install --save-dev @rollup/plugin-node-resolve
npm install --save-dev @rollup/plugin-commonjs
npm install --save-dev @rollup/plugin-babel
npm install --save-dev @babel/preset-react
```

## Install plugins

```bash
npm install --save-dev @rollup/plugin-terser
npm install --save-dev @rollup/plugin-image
npm install --save-dev rollup-plugin-postcss
```


## Modify package.json

```bash
npm pkg set scripts.build="rollup -c" #Change from vite build to rollup build
npm pkg set main="dist/index.cjs.js" # CommonJS Module
npm pkg set module="dist/index.es.js" # ES6 Module
npm pkg set unpkg="dist/index.umd.js" # Universal Module Defintiion Module
npm pkg set files='["dist", "assets/fonts", "README.md"]' --json
```


## Create Rollup Config

### Example (a simplifyed version for viewing only)

```js
export default {
    input: 'src/index.js',
    output: [],
    plugins: [],
    external: {}
};
```

### Document here!

```bash
cat > ./rollup.config.js << 'EOF'
import pkg from './package.json' assert {type: "json"};

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js', // The entry point for your application
  output: [
    {
            file: pkg.main, // Use package.json's "main" for the CommonJS output
            format: 'cjs',
            exports: 'named',
            sourcemap: true // Generate sourcemap for better debugging
        },
        {
            file: pkg.module, // Use package.json's "module" for the ESM output
            format: 'es',
            exports: 'named',
            sourcemap: true
        },
        {
            file: pkg.unpkg, // Use package.json's "unpkg" for the UMD output (if applicable)
            format: 'umd',
            name: pkg.name.replace(/[^a-zA-Z0-9]/g, ''), // Clean package name for global usage
            exports: 'named',
            sourcemap: true,
            globals: { // Define globals for UMD build if needed
                react: 'React',
                'react-dom': 'ReactDOM'
            }
        }    
  ],
  plugins: [
    postcss({
            extensions: ['.css'],
    }),
    resolve({
            extensions: ['.js', '.jsx'],
            dedupe: ['prop-types']
        }),
    commonjs(),
    image(),
    terser(),
    babel({
      babelHelpers: 'bundled', // Bundles the helpers in the same file
      exclude: 'node_modules/**', // Only transpile your source code
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {})
};
EOF
```
