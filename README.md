# @nfk.st/jdm-editor-vue — Proof of Concept

**Live demo: https://nfk-st.github.io/jdm-editor-vue-demo/**

A fresh [Vite](https://vite.dev) + Vue 3 + TypeScript app that installs
**[@nfk.st/jdm-editor-vue](https://www.npmjs.com/package/@nfk.st/jdm-editor-vue)
0.1.1 from the npm registry** and uses it the way a real consumer would.

## What it proves

- The published package installs and typechecks in a fresh app
  (`skipLibCheck: true` required, per the README).
- `DecisionGraph` renders a real decision model — a shipping-fee decision
  table with input/output nodes — on the Vue Flow canvas.
- The Zen engine WASM loads (`ensureWasmLoaded`), so expression editing and
  linting work.
- Monaco workers are wired, so function-node TypeScript diagnostics work.
- The simulator panel runs the graph (via GoRules' public simulate
  endpoint, same as the library's own stories) and shows the trace.
- `vite build` produces a working production bundle.

## Run it

```sh
npm install
npm run dev
```

The app serves at `http://localhost:5173/jdm-editor-vue-demo/` (the base
path matches GitHub Pages).

Then edit the graph, open the Simulator panel, and hit **Run** with the
default request (`{ customer: { country: "US" }, cart: { weight: 50 } }`)
— the first rule fires and `shippingFee` comes back as `40`.
