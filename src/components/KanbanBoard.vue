<script setup lang="ts">
  import type { KanbanFormSchema } from './KanbanForm.vue'
  import type { Task, TaskStatus } from '@/types'
  import { ref } from 'vue'

  const tasks = ref<{
    [key in TaskStatus]: Task[]
  }>({
    'open': [
      { id: crypto.randomUUID(), title: 'Task 1', description: 'Description for Task 1' },
      { id: crypto.randomUUID(), title: 'Task 2', description: 'Description for Task 2' },
      { id: crypto.randomUUID(), title: 'Task 3', description: 'Description for Task 3' },
      { id: crypto.randomUUID(), title: 'Task 4', description: 'Description for Task 4' },
      { id: crypto.randomUUID(), title: 'Task 5', description: 'Description for Task 5' },
      { id: crypto.randomUUID(), title: 'Task 6', description: 'Description for Task 6' },
    ],
    'in-progress': [
      { id: crypto.randomUUID(), title: 'Task 7', description: 'Description for Task 7' },
      { id: crypto.randomUUID(), title: 'Task 8', description: 'Description for Task 8' },
      { id: crypto.randomUUID(), title: 'Task 9', description: 'Description for Task 9' },
      { id: crypto.randomUUID(), title: 'Task 10', description: 'Description for Task 10' },
      { id: crypto.randomUUID(), title: 'Task 11', description: 'Description for Task 11' },
      { id: crypto.randomUUID(), title: 'Task 12', description: 'Description for Task 12' },
    ],
    'completed': [
      { id: crypto.randomUUID(), title: 'Task 13', description: 'Description for Task 13' },
      { id: crypto.randomUUID(), title: 'Task 14', description: 'Description for Task 14' },
      { id: crypto.randomUUID(), title: 'Task 15', description: 'Description for Task 15' },
      { id: crypto.randomUUID(), title: 'Task 16', description: 'Description for Task 16' },
      { id: crypto.randomUUID(), title: 'Task 17', description: 'Description for Task 17' },
      { id: crypto.randomUUID(), title: 'Task 18', description: 'Description for Task 18' },
    ],
  })

  function onDrop (cardId: string, status: TaskStatus, newStatus: TaskStatus) {
    const card = tasks.value[status].find(c => c.id === cardId)
    if (card) {
      tasks.value[status] = tasks.value[status].filter(c => c.id !== cardId)
      tasks.value[newStatus].push(card)
    }
  }

  const dialogOpen = ref(false)
  const statusToAdd = ref<TaskStatus>('open')

  function onOpenModal (status: TaskStatus) {
    dialogOpen.value = true
    statusToAdd.value = status
  }

  function onSubmit (task: KanbanFormSchema) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
    }
    tasks.value[statusToAdd.value].push(newTask)
  }

</script>

<template>
  <h1 class="mb-2">Kanban Board</h1>
  <div class="overflow-auto-x d-flex ga-4 h-100">
    <KanbanColumn
      status="open"
      :tasks="tasks.open"
      title="Open"
      @add="onOpenModal"
      @drop="onDrop"
    />
    <KanbanColumn
      status="in-progress"
      :tasks="tasks['in-progress']"
      title="In Progress"
      @add="onOpenModal"
      @drop="onDrop"
    />
    <KanbanColumn
      status="completed"
      :tasks="tasks.completed"
      title="Completed"
      @add="onOpenModal"
      @drop="onDrop"
    />
  </div>
  <KanbanForm
    v-model="dialogOpen"
    @submit="onSubmit"
  />
</template>
