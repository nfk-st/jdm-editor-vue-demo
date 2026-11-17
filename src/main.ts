// Monaco's exports map (./* → ./esm/vs/*) means the correct specifier omits
// the esm/vs prefix; the README's older form predates exports-map resolution.
import editorWorker from 'monaco-editor/editor/editor.worker.js?worker';
import tsWorker from 'monaco-editor/language/typescript/ts.worker.js?worker';

import { ensureWasmLoaded } from '@nfk.st/jdm-editor-vue';
import { createApp } from 'vue';
import '@nfk.st/jdm-editor-vue/dist/style.css';
import './index.css';
import App from './App.vue';

// Monaco's TS language service needs workers from the bundler
self.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    return label === 'typescript' || label === 'javascript'
      ? new tsWorker()
      : new editorWorker();
  },
};

// Zen engine (WASM) must be initialised before the editor renders
void ensureWasmLoaded().finally(() => {
  createApp(App).mount('#app');
});
