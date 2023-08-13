import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['os', 'path.parse'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Change this to the address of your json-server
    }
  }
})

