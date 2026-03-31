import { defineConfig } from 'vite'
import react from '@vitejs/react-swc' // or '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/", // Replace this with your GitHub repository name
})