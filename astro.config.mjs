import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './remark-reading-time'

// import { transformerTwoslash } from '@shikijs/twoslash'

// https://astro.build/config
export default defineConfig({
	site: 'https://jihadwaspada.com',
	integrations: [
		sitemap(),
		expressiveCode({
			plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
			theme: ['rose-pine' /* 'material-theme-lighter' */],
			frames: {
				showCopyToClipboardButton: false
			},
			defaultProps: {
				showLineNumbers: false
			},
			styleOverrides: {
				codeFontFamily: '"JetBrains Mono", monospace',
				codeFontSize: '1em',
				borderRadius: '8px',
				frames: {
					frameBoxShadowCssValue: '0 20px 18px -16px #e3e3e3'
				}
			}
		}),
		mdx(),
		preact()
	],
	markdown: {
		remarkPlugins: [remarkReadingTime]
		/* shikiConfig: {
			transformers: [transformerTwoslash({ explicitTrigger: true })],
		}, */
	}
})
