import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts', // Replace with your library's entry file
      name: 'MyUILibrary', // Global name for UMD builds
      fileName: (format) => `my-ui-library.${format}.js`, // Output file names
      formats: ['es', 'umd'], // Build ES modules and UMD
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Externalize peer dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
