import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VIconBtn } from 'vuetify/labs/VIconBtn'

const vuetify = createVuetify({
  components: { ...components, VIconBtn },
  directives,
})

export const mountWithVuetify: typeof mount = (...args) => {
  const [component, options] = args
  const { global, ...rest } = options || {}
  return mount(component, {
    global: {
      plugins: [vuetify],
      ...global,
    },
    ...rest,
  })
}
