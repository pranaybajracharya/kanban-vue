<script setup lang="ts">
  import type { KanbanFormAddSchema, KanbanFormEditSchema } from './KanbanForm.vue'
  import type { Task, TaskStatus } from '@/types'
  import { ref } from 'vue'

  const tasks = ref<Task[]>([
    { id: crypto.randomUUID(), title: 'Task 1', description: 'Description for Task 1', status: 'open' },
    { id: crypto.randomUUID(), title: 'Task 2', description: 'Description for Task 2', status: 'open' },
    { id: crypto.randomUUID(), title: 'Task 3', description: 'Description for Task 3', status: 'open' },
    { id: crypto.randomUUID(), title: 'Task 4', description: 'Description for Task 4', status: 'open' },
    { id: crypto.randomUUID(), title: 'Task 5', description: 'Description for Task 5', status: 'open' },
    { id: crypto.randomUUID(), title: 'Task 6', description: 'Description for Task 6', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Task 7', description: 'Description for Task 7', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Task 8', description: 'Description for Task 8', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Task 9', description: 'Description for Task 9', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Task 10', description: 'Description for Task 10', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Task 11', description: 'Description for Task 11', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 12', description: 'Description for Task 12', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 13', description: 'Description for Task 13', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 14', description: 'Description for Task 14', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 15', description: 'Description for Task 15', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 16', description: 'Description for Task 16', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 17', description: 'Description for Task 17', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Task 18', description: 'Description for Task 18', status: 'completed' },
  ])

  function onDrop (cardId: string, newStatus: TaskStatus) {
    const card = tasks.value.find(c => c.id === cardId)
    if (card) {
      card.status = newStatus
    }
  }

  function onAdd (task: KanbanFormAddSchema) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
      status: task.status,
    }
    tasks.value.push(newTask)
  }

  function onEdit (task: KanbanFormEditSchema) {
    const statusToEdit = tasks.value.find(t => t.id === task.id)
    if (statusToEdit) {
      statusToEdit.title = task.title
      statusToEdit.description = task.description
    }
  }

  function getTasksByStatus (status: TaskStatus) {
    return tasks.value.filter(task => task.status === status)
  }

</script>

<template>
  <h1 class="mb-2">Kanban Board</h1>
  <div class="overflow-auto-x d-flex ga-4 h-100">
    <KanbanColumn
      status="open"
      :tasks="getTasksByStatus('open')"
      title="Open"
      @drop="onDrop"
    />
    <KanbanColumn
      status="in-progress"
      :tasks="getTasksByStatus('in-progress')"
      title="In Progress"
      @drop="onDrop"
    />
    <KanbanColumn
      status="completed"
      :tasks="getTasksByStatus('completed')"
      title="Completed"
      @drop="onDrop"
    />
  </div>
  <KanbanForm
    @add="onAdd"
    @edit="onEdit"
  />
</template>
