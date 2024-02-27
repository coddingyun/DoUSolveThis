import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
			{ find: '@', replacement: '/src' },
			{
				find: '@assets',
				replacement: '/src/assets',
			},
      { find: '@pages', replacement: '/src/pages' },
      { find: '@store', replacement: '/src/store' },
			{ find: '@Shooks', replacement: '/src/shared/hooks' },
			{ find: '@Sutils', replacement: '/src/shared/utils' },
			{
        find: '@Sconstants',
				replacement: '/src/shared/constants',
			},
			{ find: '@Slayouts', replacement: '/src/shared/layouts' },
		],
  },
});
