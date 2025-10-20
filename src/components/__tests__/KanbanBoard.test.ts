import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { mountWithVuetify } from '@/test/helpers'
import KanbanBoard, { type KanbanBoardExposed } from '../KanbanBoard.vue'

describe('KanbanBoard', () => {
  let wrapper: VueWrapper<KanbanBoardExposed>

  beforeEach(() => {
    wrapper = mountWithVuetify(KanbanBoard) as VueWrapper<KanbanBoardExposed>
  })

  it('renders KanbanBoard', () => {
    expect(wrapper.find('h1').text()).toContain('Kanban Board')
  })

  it('changes task status when onDrop is called', async () => {
    const vm = wrapper.vm
    const task = vm.tasks[0]!
    const finalStatus = task.status === 'open' ? 'completed' : 'open'
    vm.onDrop(task.id, finalStatus)

    const tasks = vm.tasks
    const updatedTask = tasks.find(t => t.id === task.id)

    expect(updatedTask?.status).toBe(finalStatus)
  })

  it('add new task to tasks array when onAdd is called', () => {
    const initialLength = wrapper.vm.tasks.length

    const newTask = {
      title: 'New Task',
      description: 'Task description',
      status: 'open',
    } as const

    wrapper.vm.onAdd(newTask)
    expect(wrapper.vm.tasks).toHaveLength(initialLength + 1)
    expect(wrapper.vm.tasks.at(-1)).toMatchObject({
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    })
    expect(wrapper.vm.tasks.at(-1)?.id).toBeDefined()
  })

  it('edits existing task in tasks array when onEdit is called', () => {
    const task = wrapper.vm.tasks[0]!
    const updatedTask = {
      id: task.id,
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'open',
    } as const

    wrapper.vm.onEdit(updatedTask)

    const editedTask = wrapper.vm.tasks.find(t => t.id === task.id)
    expect(editedTask).toMatchObject({
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'open',
      id: task.id,
    })
  })

  it('deletes a task when onDelete is called', async () => {
    const vm = wrapper.vm
    const initialTaskCount = vm.tasks.length
    const randomIndex = Math.floor(Math.random() * initialTaskCount)
    const taskToDelete = vm.tasks[randomIndex]!
    vm.onDelete(taskToDelete.id)

    expect(vm.tasks).toHaveLength(initialTaskCount - 1)
    expect(vm.tasks.find(t => t.id === taskToDelete.id)).toBeUndefined()
  })

  it('filters tasks by status correctly', () => {
    wrapper.vm.tasks = [
      { id: '1', title: 'Test Task', description: 'This is a test task', status: 'open' },
      { id: '2', title: 'Test Task 2', description: 'This is a test task', status: 'in-progress' },
      { id: '3', title: 'Test Task 3', description: 'This is a test task', status: 'completed' },
      { id: '4', title: 'Test Task 4', description: 'This is a test task', status: 'completed' },
      { id: '5', title: 'Test Task 4', description: 'This is a test task', status: 'open' },
      { id: '6', title: 'Test Task 4', description: 'This is a test task', status: 'open' },
    ]
    const vm = wrapper.vm

    const openTasks = vm.getTasksByStatus('open')
    const inProgressTasks = vm.getTasksByStatus('in-progress')
    const completedTasks = vm.getTasksByStatus('completed')

    expect(openTasks).toHaveLength(3)
    expect(inProgressTasks).toHaveLength(1)
    expect(completedTasks).toHaveLength(2)
  })
})
