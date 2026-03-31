import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Make sure 'plugin-' is in the name

export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/", // Important: Use your actual GitHub repo name here
})