import presetRemToPx from '@unocss/preset-rem-to-px';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { presetUno, transformerDirectives } from 'unocss';
import presetDaisy from 'unocss-preset-daisy';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    unocss({
      transformers: [transformerDirectives(), transformerVariantGroup()],
      presets: [presetUno(), presetRemToPx(), presetDaisy()],
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, '../be/public'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
