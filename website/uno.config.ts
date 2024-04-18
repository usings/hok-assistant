import {
  defineConfig,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  theme: {
    breakpoints: {
      sm: '320px',
      md: '640px',
      lg: '960px',
    },
    colors: {
      text: '#FFFFFFBB',
      layer: '#121417FF',
    },
  },
})
