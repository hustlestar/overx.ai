import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'index.ts',
    'seo/index': 'components/SEO/index.ts',
    'performance/index': 'components/Performance/index.ts',
    'lib/schema/index': 'lib/schema/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  treeshake: true,
  target: 'es2020',
  platform: 'browser'
})