import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  // Add this 'test' section
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Path to your setup file
  },
});
