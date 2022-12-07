import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  base: "https://IvanGonzalezR.github.io/reactjs_state_machine"
})
