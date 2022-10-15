import presetRemToPx from '@unocss/preset-rem-to-px';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { presetAttributify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import presetDaisy from 'unocss-preset-daisy';
import unocss from 'unocss/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    unocss({
      transformers: [transformerDirectives(), transformerVariantGroup()],
      presets: [presetUno(), presetAttributify({ prefix: 'un:', prefixedOnly: true }), presetRemToPx(), presetDaisy()],
    }),
    ElementPlus(),
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
