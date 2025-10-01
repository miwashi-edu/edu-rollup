# edu-rollup

No relink needed.

npm link creates a symlink. Rebuilding your lib just updates files behind that link.

The app will pick up changes on refresh; occasionally restart its dev server if cache sticks.

## Set name to user in npmjs + package name

```bash
npm pkg set name="@miwashi/components"
npm pkg set contributors[0].email = "user@example.com"
```

## Link the projects

```bash
cd ~
cd ws
cd edu-rollup
cd components
npm link
cd ..
cd application
npm link @miwashi/components #REPLACE WITH YOUR NAME OF LIBRARY
```

## Replace mock with your components

> in applciation/src/App.jsx 
> Replace **REPLACE WITH YOUR NAME OF LIBRARY**

```jsx
import {BundleCss, BundleBem1Css, BundleBem2Css, BundleImage, BundleFont} from "./test-util/mock";
```
> with
```jsx
import {BundleCss, BundleBem1Css, BundleBem2Css, BundleImage, BundleFont} from "@miwashi/components";
```

## Configure main, module, exports, files for bundler.

```bash
npm pkg set type=module
npm pkg set main=./dist/index.js
npm pkg set module=./dist/index.js
npm pkg set exports=./dist/index.js
npm pkg set "files[]='dist'"
```

## Fix dependencies

```bash
npm uninstall react
npm uninstall react-dom
npm install -D react
npm install -D react-dom
npm pkg set "peerDependencies.react=^18.0.0 || ^19.0.0"
npm pkg set "peerDependencies.react-dom=^18.0.0 || ^19.0.0"
```


## See to it that barrel file in ./src exposes components that are included

```bash
cat > src/index.js <<'EOF'
export { default as BundleCss } from './components/BundleCss/BundleCss.jsx';
export { default as BundleBem1Css } from './components/BundleCss/BundleBem1Css.jsx';
export { default as BundleBem2Css } from './components/BundleCss/BundleBem2Css.jsx';
EOF
```
## NPM get


## Configure build step in vite.config.js

```js
build: {
    lib: { entry: 'src/index.js', formats: ['es'], fileName: () => 'index.js' },
    rollupOptions: { external: ['react', 'react-dom'] },
    cssCodeSplit: true, // emits dist/style.css
    sourcemap: true,

    rollupOptions: {
      output: {
    assetFileNames: 'assets/[name]-[hash][extname]',
    },
    },
  },
```

## CSS

### Replace BEM with camelcase

> Note the css: addition

```js
#vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: { modules: { localsConvention: 'camelCase' } },
  build: {
    lib: { entry: 'src/index.js', formats: ['es'], fileName: () => 'index.js' },
    assetsInlineLimit: 0, // emit files instead of inlining
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
```

### Embedd css in js

> Note added plugin in vite.config.js

```
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
npm i -D vite-plugin-css-injected-by-js
plugins: [cssInjectedByJs(), react()],
```

```js
# vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [cssInjectedByJs(), react()],
  css: { modules: { localsConvention: 'camelCase' } },
  build: {
    lib: { entry: 'src/index.js', formats: ['es'], fileName: () => 'index.js' },
    rollupOptions: { external: ['react', 'react-dom'] },
    cssCodeSplit: true, // ok; plugin injects CSS into JS chunks
    sourcemap: true,
  },
})
```
