import { beforeEach, describe, expect, it, vi } from 'vitest'
import { kanbanFormStore } from '@/store/KanbanFormStore'
import { mountWithVuetify } from '@/test/helpers'
import KanbanForm from '../KanbanForm.vue'

vi.mock('@/store/KanbanFormStore', () => {
  const mockStore = {
    id: '',
    title: '',
    description: '',
    status: 'open',
    open: true,
    setOpen: vi.fn(),
  }

  return {
    kanbanFormStore: mockStore,
  }
})

vi.mock('@/data/tasks', () => ({
  statusOptions: [
    { title: 'Open', value: 'open' },
    { title: 'In Progress', value: 'in-progress' },
    { title: 'Completed', value: 'completed' },
  ],
}))

describe('KanbanForm', () => {
  beforeEach(() => {
    kanbanFormStore.id = undefined
    kanbanFormStore.title = ''
    kanbanFormStore.description = ''
    kanbanFormStore.status = 'open'
    kanbanFormStore.open = true
    vi.clearAllMocks()
  })

  it('renders KanbanForm with correct title for adding a task', () => {
    const wrapper = mountWithVuetify(KanbanForm)

    expect(wrapper.findComponent({ name: 'v-card-title' }).text()).toContain('Add New Task')

    const titleInput = wrapper.findComponent({ name: 'v-text-field' }).find('input')
    expect(titleInput.exists()).toBe(true)
    expect(titleInput.element.value).toBeFalsy()

    const descriptionInput = wrapper.findComponent({ name: 'v-textarea' }).find('textarea')
    expect(descriptionInput.exists()).toBe(true)
    expect(descriptionInput.element.value).toBeFalsy()

    const select = wrapper.findComponent({ name: 'v-select' }).find('input')
    expect(select.exists()).toBe(true)
    expect(select.element.value).toBe('open')
  })

  it('renders KanbanForm with correct title for editing a task', () => {
    kanbanFormStore.id = '1'
    kanbanFormStore.title = 'Test Task'
    kanbanFormStore.description = 'Test Description'
    kanbanFormStore.status = 'completed'

    const wrapper = mountWithVuetify(KanbanForm)

    expect(wrapper.findComponent({ name: 'v-card-title' }).text()).toContain('Edit Task')

    const titleInput = wrapper.findComponent({ name: 'v-text-field' }).find('input')
    expect(titleInput.exists()).toBe(true)
    expect(titleInput.element.value).toBe('Test Task')

    const descriptionInput = wrapper.findComponent({ name: 'v-textarea' }).find('textarea')
    expect(descriptionInput.exists()).toBe(true)
    expect(descriptionInput.element.value).toBe('Test Description')

    const select = wrapper.findComponent({ name: 'v-select' }).find('input')
    expect(select.exists()).toBe(true)
    expect(select.element.value).toBe('completed')
  })

  it('does not emit any event if form fields are empty', async () => {
    kanbanFormStore.title = '   '
    kanbanFormStore.description = ''

    const wrapper = mountWithVuetify(KanbanForm)

    await wrapper.findComponent({ name: 'v-form' }).trigger('submit')

    expect(wrapper.emitted('add')).toBeFalsy()
    expect(wrapper.emitted('edit')).toBeFalsy()
    expect(kanbanFormStore.setOpen).not.toHaveBeenCalled()
  })

  it('emits add event with form data when submitting new task', async () => {
    const wrapper = mountWithVuetify(KanbanForm)

    const titleInput = wrapper.findComponent({ name: 'v-text-field' }).find('input')
    titleInput.setValue('New Task')

    const descriptionInput = wrapper.findComponent({ name: 'v-textarea' }).find('textarea')
    descriptionInput.setValue('New description')

    const statusSelect = wrapper.findComponent({ name: 'v-select' })
    await statusSelect.vm.$emit('update:modelValue', 'completed')

    await wrapper.findComponent({ name: 'v-form' }).trigger('submit')

    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')?.[0]?.[0]).toEqual({
      title: 'New Task',
      description: 'New description',
      status: 'completed',
    })
    expect(kanbanFormStore.setOpen).toHaveBeenCalledWith(false)
  })

  it('emits edit event with form data when submitting existing task', async () => {
    kanbanFormStore.id = '123'
    kanbanFormStore.title = 'Initial Task'
    kanbanFormStore.description = 'Initial description'
    kanbanFormStore.status = 'open'

    const wrapper = mountWithVuetify(KanbanForm)

    const titleInput = wrapper.findComponent({ name: 'v-text-field' }).find('input')
    titleInput.setValue('Updated Task')

    const descriptionInput = wrapper.findComponent({ name: 'v-textarea' }).find('textarea')
    descriptionInput.setValue('Updated description')

    const statusSelect = wrapper.findComponent({ name: 'v-select' })
    await statusSelect.vm.$emit('update:modelValue', 'in-progress')

    await wrapper.findComponent({ name: 'v-form' }).trigger('submit')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]?.[0]).toEqual({
      id: '123',
      title: 'Updated Task',
      description: 'Updated description',
      status: 'in-progress',
    })
    expect(kanbanFormStore.setOpen).toHaveBeenCalledWith(false)
  })

  it('closes the modal when cancel button is clicked', async () => {
    const wrapper = mountWithVuetify(KanbanForm)

    const cancelButton = wrapper.findAllComponents({ name: 'v-btn' })[0]
    expect(cancelButton?.exists()).toBe(true)
    expect(cancelButton!.text()).toBe('Cancel')
    await cancelButton!.trigger('click')
    expect(kanbanFormStore.setOpen).toHaveBeenCalledWith(false)
  })
})
