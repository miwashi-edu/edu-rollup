# edu-rollup

## Install rollup

```bash
cd ~
cd ws
cd fwk-components
npm install --save-dev rollup
```


## Install Transpiler

```bash
npm install --save-dev @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-babel
```

## Modify package.json

```bash
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

export default {
  input: 'src/index.js', // The entry point for your application
  output: [
    { file: pkg.module, format: 'es', exports: 'named', sourcemap: true },
  ],
  plugins: [
    resolve(), // Resolves Node.js modules
    commonjs(), // Converts CommonJS to ES modules
    babel({
      babelHelpers: 'bundled', // Bundles the helpers in the same file
      exclude: 'node_modules/**', // Only transpile your source code
    }),
  ],
};
EOF
```
