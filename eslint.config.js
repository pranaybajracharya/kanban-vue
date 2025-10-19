import pluginVitest from '@vitest/eslint-plugin'
import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    antfu: true,
    autoimports: true,
    test: {
      files: ['src/**/__tests__/*'],
    },
  },
  { ...pluginVitest.configs.recommended, files: ['src/**/__tests__/*'] },
)
