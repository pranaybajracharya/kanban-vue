import type { Task } from '@/types'
import { describe, expect, it } from 'vitest'
import { mountWithVuetify } from '@/test/helpers'
import KanbanCard from '../KanbanCard.vue'
import KanbanColumn from '../KanbanColumn.vue'

describe('KanbanColumn', () => {
  it('renders KanbanColumn', () => {
    const wrapper = mountWithVuetify(KanbanColumn, {
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

    const wrapper = mountWithVuetify(KanbanColumn, {
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

  it('emits task drop event on drop', async () => {
    const tasks: Task[] = [
      { id: '1', title: 'Test Task', description: 'Task description', status: 'open' },
      { id: '2', title: 'Test Task 2', description: 'Task description 2', status: 'open' },
    ]
    const wrapper = mountWithVuetify(KanbanColumn, {
      props: {
        color: 'white',
        title: 'Open',
        status: 'open',
        tasks,
      },
    })

    const dataTransfer = {
      data: {} as Record<string, string>,
      setData (key: string, value: string) {
        this.data[key] = value
      },
      getData (key: string) {
        return this.data[key]
      },
    }
    dataTransfer.setData('taskId', '1')

    await wrapper.find('[data-droppable="true"]').trigger('drop', { dataTransfer })

    expect(wrapper.emitted('drop')).toBeTruthy()
    expect(wrapper.emitted('drop')?.[0]).toEqual([
      '1', 'open',
    ])
  })
})
