import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: './src/index.ts',
  plugins: [
    typescript({
      module: 'esnext',
      declaration: true,
      declarationMap: false,
    }),
  ],
  output: [
    {
      file: './dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      assetFileNames: '[name].esm.js',
    },
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'hyperstruct',
      sourcemap: true,
    },
  ],
})
