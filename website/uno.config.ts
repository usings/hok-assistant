import {
  defineConfig,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
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
  },
  shortcuts: [
    {
      'container': 'flex flex-col gap-20 p-16 min-h-screen color-text max-w-960 mx-auto',
      'bg-base': 'bg-light-200 dark:bg-#121417',
      'hv-base': 'hover:(bg-light-500) dark:hover:(bg-#121417/20)',
      'color-text': 'color-gray-500 dark:color-#FFFFFFBB',
      'hv-color-text': 'hover:(color-#121417) dark:hover:(color-light-500)',
      'border-base': 'border border-gray/4',
    },
  ],
})
