import { beforeAll, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VIconBtn } from 'vuetify/labs/VIconBtn'

export const vuetify = createVuetify({
  components: { ...components, VIconBtn },
  directives,
})

beforeAll(() => {
  vi.stubGlobal('visualViewport', new EventTarget())
})
