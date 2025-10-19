import type { Task } from '@/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VIconBtn } from 'vuetify/labs/VIconBtn'
import KanbanCard from '../KanbanCard.vue'
import KanbanColumn from '../KanbanColumn.vue'

const vuetify = createVuetify({
  components: { ...components, VIconBtn },
  directives,
})

describe('KanbanColumn', () => {
  it('renders KanbanColumn', () => {
    const wrapper = mount(KanbanColumn, {
      global: {
        plugins: [vuetify],
      },
      props: {
        color: 'red',
        title: 'Open',
        status: 'open',
        tasks: [],
      },
    })
    expect(wrapper.find('h2').text()).toContain(wrapper.props('title'))
    expect(wrapper.find('[aria-label="Badge"]').classes()).toContain('bg-red')
  })

  it('renders task cards', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Test Task', description: 'Task description', status: 'open' },
      { id: '2', title: 'Test Task 2', description: 'Task description 2', status: 'open' },
    ]

    const wrapper = mount(KanbanColumn, {
      global: {
        plugins: [vuetify],
      },
      props: {
        color: 'white',
        title: 'Open',
        status: 'open',
        tasks,
      },
    })

    const cards = wrapper.findAllComponents(KanbanCard)
    expect(cards.length).toBe(tasks.length)
    expect(cards[0]?.text()).toContain(tasks[0]?.title)
    expect(cards[0]?.text()).toContain(tasks[0]?.description)
    expect(cards[1]?.text()).toContain(tasks[1]?.title)
    expect(cards[1]?.text()).toContain(tasks[1]?.description)
  })
})
