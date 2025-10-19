import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import KanbanCard from '../KanbanCard.vue'

const vuetify = createVuetify({
  components,
  directives,
})

describe('KanbanCard', () => {
  it('renders Kanban Card with title and description', () => {
    const wrapper = mount(KanbanCard, {
      global: {
        plugins: [vuetify],
      },
      props: {
        title: 'Kanban Card 1',
        description: 'This is a test card',
      },
    })
    expect(wrapper.find('h3').text()).toContain(wrapper.props('title'))
    expect(wrapper.find('p').text()).toContain(wrapper.props('description'))
  })

  it('emits dragstart and toggles dragging classes on drag events', async () => {
    const wrapper = mount(KanbanCard, {
      global: {
        plugins: [vuetify],
      },
      props: {
        title: 'Drag Test Card',
        description: 'Draggable test description',
      },
    })

    const button = wrapper.find('button')
    await button.trigger('dragstart', { dataTransfer: {} })
    expect(wrapper.emitted('dragstart')).toBeTruthy()
    expect(button.classes()).toContain('cursor-grabbing')
    await button.trigger('dragend')
    expect(button.classes()).toContain('cursor-grab')
  })
})
