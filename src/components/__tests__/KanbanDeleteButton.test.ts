import { describe, expect, it } from 'vitest'
import { mountWithVuetify } from '@/test/helpers'
import KanbanDeleteButton from '../KanbanDeleteButton.vue'

describe('KanbanDeleteButton', () => {
  it('opens confirmation dialog when delete icon button is clicked', async () => {
    const wrapper = mountWithVuetify(KanbanDeleteButton, {
      attachTo: document.body,
    })

    const deleteIconButton = wrapper.find('[aria-label="Delete Task"]')
    expect(deleteIconButton.exists()).toBe(true)

    expect(document.body.textContent).not.toContain('Confirm Delete')
    await deleteIconButton.trigger('click')
    expect(document.body.textContent).toContain('Confirm Delete')
  })
})
