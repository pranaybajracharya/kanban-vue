import { describe, expect, it } from 'vitest'
import { mountWithVuetify } from '@/test/helpers'
import KanbanDeleteButton from '../KanbanDeleteButton.vue'

describe('KanbanDeleteButton', () => {
  it('renders KanbanDeleteButton', () => {
    const wrapper = mountWithVuetify(KanbanDeleteButton)

    const iconBtn = wrapper.findComponent({ name: 'v-icon-btn' })
    expect(iconBtn.exists()).toBe(true)

    expect(iconBtn.attributes('aria-label')).toBe('Delete Task')

    const icon = iconBtn.findComponent({ name: 'v-icon' })
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('mdi-delete')
    expect(icon.classes()).toContain('text-red')
  })

  it('opens confirmation dialog with correct content when delete button is clicked', async () => {
    const wrapper = mountWithVuetify(KanbanDeleteButton)

    expect(wrapper.findComponent({ name: 'v-card-title' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'v-card-text' }).exists()).toBe(false)

    await wrapper.findComponent({ name: 'v-icon-btn' }).trigger('click')

    const title = wrapper.findComponent({ name: 'v-card-title' })
    expect(title.text()).toContain('Confirm Delete')
    const text = wrapper.findComponent({ name: 'v-card-text' })
    expect(text.text()).toContain('Are you sure you want to delete this task?')

    const cancelButton = wrapper.find('[aria-label="Cancel"]')
    expect(cancelButton).toBeTruthy()
    expect(cancelButton.text()).toContain('Cancel')

    const deleteButton = wrapper.find('[aria-label="Confirm Delete"]')
    expect(deleteButton).toBeTruthy()
    expect(deleteButton.text()).toContain('Delete')
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mountWithVuetify(KanbanDeleteButton)

    await wrapper.findComponent({ name: 'v-icon-btn' }).trigger('click')

    const deleteButton = wrapper.find('[aria-label="Confirm Delete"]')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')).toHaveLength(1)
  })

  it('closes dialog when cancel button is clicked without emitting delete', async () => {
    const wrapper = mountWithVuetify(KanbanDeleteButton)

    await wrapper.findComponent({ name: 'v-icon-btn' }).trigger('click')

    expect(wrapper.findComponent({ name: 'v-card-title' }).exists()).toBe(true)

    const cancelButton = wrapper.find('[aria-label="Cancel"]')
    await cancelButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeFalsy()
    expect(wrapper.findComponent({ name: 'v-card-title' }).isVisible()).toBe(false)
  })
})
