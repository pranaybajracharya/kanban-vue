import type { Component } from 'vue'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VIconBtn } from 'vuetify/labs/VIconBtn'

const vuetify = createVuetify({
  components: { ...components, VIconBtn },
  directives,
})

export function mountWithVuetify (
  component: Component,
  options?: Parameters<typeof mount>[1],
) {
  const { global, ...rest } = options || {}
  return mount(component, {
    global: {
      plugins: [vuetify],
      ...global,
    },
    ...rest,
  })
}
