import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

// Keep the original double-click/offline workflow alongside Astro's static site.
// Both outputs use the same compiled page, styles, content and client logic.
const dist = fileURLToPath(new URL('../dist/', import.meta.url))
let html = await readFile(resolve(dist, 'index.html'), 'utf8')
const assetPath = (url) => resolve(dist, url.replace(/^\//, ''))

for (const match of [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]) {
	const href = match[0].match(/href="([^"]+)"/)?.[1]
	if (!href) throw new Error('La hoja de estilos compilada no tiene una ruta.')
	const css = await readFile(assetPath(href), 'utf8')
	// CSS now lives in the HTML, so public assets are relative to that HTML.
	const portableCss = css.replace(/url\((['"]?)\/assets\//g, 'url($1assets/')
	html = html.replace(match[0], () => `<style>${portableCss}</style>`)
}

// Hosted pages keep lazy chunks; only the portable copy combines them so
// file:// does not need external module requests, which browsers block.
const { outputFiles } = await build({
  entryPoints: [fileURLToPath(new URL('../src/scripts/presentation.js', import.meta.url))],
  bundle: true,
  splitting: false,
  format: 'iife',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  write: false,
})
html = html.replace(/<script\b[^>]*src="[^"]+"[^>]*><\/script>/g, '')
html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '')
const script = outputFiles[0].text.replace(/<\/script/gi, '<\\/script')
html = html.replace('</body>', () => `<script>${script}</script></body>`)
await writeFile(resolve(dist, 'offline.html'), html)
console.log('Presentación sin servidor → dist/offline.html (conservar la carpeta assets a su lado)')
