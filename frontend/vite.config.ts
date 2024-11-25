import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@widgets',
        replacement: resolve(__dirname, 'src/widgets'),
      },
      { find: '@shared', replacement: resolve(__dirname, 'src/shared') },
      {
        find: '@icons',
        replacement: resolve(__dirname, 'src/assets/icons'),
      },
      {
        find: '@images',
        replacement: resolve(__dirname, 'src/assets/images'),
      },
    ],
  },
  plugins: [react(), tsconfigPaths(), svgr()],
});
