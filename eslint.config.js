import { defineConfig } from '@witheslint/core'
import { presetSolid } from '@witheslint/preset-solid'

export default defineConfig({
  presets: [presetSolid()],
  extends: [
    {
      files: ['website/src/views/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
})
