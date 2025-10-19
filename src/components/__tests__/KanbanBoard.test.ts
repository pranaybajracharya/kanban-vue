import { describe, expect, it } from 'vitest'
import { mountWithVuetify } from '@/test/helpers'
import KanbanBoard from '../KanbanBoard.vue'

describe('KanbanBoard', () => {
  it('renders KanbanBoard', () => {
    const wrapper = mountWithVuetify(KanbanBoard)
    expect(wrapper.find('h1').text()).toContain('Kanban Board')
  })
})
