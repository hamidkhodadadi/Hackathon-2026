// `npm run build:html`: the whole app in one HTML file that opens with a double-click (no server),
// for sharing by email, Teams, or OneDrive. Scripts, styles, and pdf.js are all inlined.

import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/** Give the one output file a name people will recognize. Runs after the inlining. */
function renameHtml(fileName: string): Plugin {
  return {
    name: 'rename-html',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html']
      if (html) html.fileName = fileName
    },
  }
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), renameHtml('lateral-load-path.html')],
  publicDir: false, // the favicon would land beside the file; the one file is the whole deliverable
  build: {
    outDir: 'dist-html',
    emptyOutDir: true,
  },
})
