import path from 'node:path'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import iconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    solid(),
    unocss(),

    icons({
      compiler: 'solid',
      customCollections: {
        icon: FileSystemIconLoader('./src/assets/icons'),
      },
    }), // https://github.com/unplugin/unplugin-icons
    autoImport({
      dts: 'src/imports.d.ts',
      resolvers: [
        iconsResolver({ prefix: false, enabledCollections: ['icon'] }),
      ],
    }), // https://github.com/unplugin/unplugin-auto-import
  ],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
