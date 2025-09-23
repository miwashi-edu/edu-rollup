# edu-rollup

No relink needed.

npm link creates a symlink. Rebuilding your lib just updates files behind that link.

The app will pick up changes on refresh; occasionally restart its dev server if cache sticks.


## Vite expects a built entry. Fix the entry + build the lib.

```bash
# in components/ (edu-rollup-components)
npm pkg set type=module
npm pkg set main=./dist/index.js
npm pkg set module=./dist/index.js
npm pkg set exports=./dist/index.js
npm pkg set "files[]='dist'"
npm pkg set "peerDependencies.react=^18.0.0 || ^19.0.0"
npm pkg set "peerDependencies.react-dom=^18.0.0 || ^19.0.0"
npm pkg set scripts.prepare="vite build"
```

```bash
cat > src/index.js <<'EOF'
export { default as BundleCss } from './components/BundleCss/BundleCss.jsx';
export { default as BundleBem1Css } from './components/BundleCss/BundleBem1Css.jsx';
export { default as BundleBem2Css } from './components/BundleCss/BundleBem2Css.jsx';
EOF
```
## NPM get

```bash
# single field
npm pkg get name
npm pkg get version
npm pkg get scripts.test

# multiple fields
npm pkg get name version

# nested / arrays
npm pkg get "contributors[0].email"
npm pkg get "exports[.].require"

# workspaces
npm pkg get name version --ws

```

```json
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

```
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
npm i -D vite-plugin-css-injected-by-js
plugins: [cssInjectedByJs(), react()],
```