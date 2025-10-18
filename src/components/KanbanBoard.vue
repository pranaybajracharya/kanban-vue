<script setup lang="ts">
  import type { KanbanFormAddSchema, KanbanFormEditSchema } from './KanbanForm.vue'
  import type { Task, TaskStatus } from '@/types'
  import { ref } from 'vue'
  import { initialTasks } from '@/data/tasks'

  const tasks = ref<Task[]>(initialTasks)

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

  function onDelete (id: string) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function getTasksByStatus (status: TaskStatus) {
    return tasks.value.filter(task => task.status === status)
  }

</script>

<template>
  <h1 class="px-4 py-2">Kanban Board</h1>
  <div class="overflow-x-auto d-flex ga-4 h-100 px-4 pb-4">
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
    @delete="onDelete"
    @edit="onEdit"
  />
</template>
