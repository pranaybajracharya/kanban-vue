import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VIconBtn } from 'vuetify/labs/VIconBtn'
import KanbanBoard from '../KanbanBoard.vue'

const vuetify = createVuetify({
  components: { ...components, VIconBtn },
  directives,
})

describe('KanbanBoard', () => {
  it('renders Kanban Board with title', () => {
    const wrapper = mount(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.find('h1').text()).toContain('Kanban Board')
  })
})
