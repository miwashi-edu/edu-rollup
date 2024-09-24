# edu-rollup

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
npm install --save-dev @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-babel
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

### Example

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
    terser()
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
