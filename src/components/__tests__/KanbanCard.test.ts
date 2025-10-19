import { describe, expect, it } from 'vitest'
import { mountWithVuetify } from '@/test/helpers'
import KanbanCard from '../KanbanCard.vue'

describe('KanbanCard', () => {
  it('renders KanbanCard with title and description', () => {
    const wrapper = mountWithVuetify(KanbanCard, {
      props: {
        title: 'Kanban Card 1',
        description: 'This is a test card',
      },
    })
    expect(wrapper.find('h3').text()).toContain(wrapper.props('title'))
    expect(wrapper.find('p').text()).toContain(wrapper.props('description'))
  })

  it('emits dragstart and toggles dragging classes on drag events', async () => {
    const wrapper = mountWithVuetify(KanbanCard, {
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
