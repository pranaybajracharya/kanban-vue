<script setup lang="ts">
  import type { KanbanFormAddSchema, KanbanFormEditSchema } from './KanbanForm.vue'
  import type { Task, TaskStatus } from '@/types'
  import { ref } from 'vue'

  const tasks = ref<Task[]>([
    { id: crypto.randomUUID(), title: 'Design login page', description: 'Create mockups for the new login and registration page', status: 'open' },
    { id: crypto.randomUUID(), title: 'Implement user authentication', description: 'Implement backend logic for user authentication', status: 'open' },
    { id: crypto.randomUUID(), title: 'Setup CI/CD pipeline', description: 'Configure CI/CD pipeline with GitHub Actions', status: 'open' },
    { id: crypto.randomUUID(), title: 'Write unit tests for API endpoints', description: 'Write comprehensive unit tests for all API endpoints', status: 'open' },
    { id: crypto.randomUUID(), title: 'Refactor codebase', description: 'Refactor codebase to improve readability and maintainability', status: 'open' },
    { id: crypto.randomUUID(), title: 'Optimize database queries', description: 'Optimize slow-performing database queries', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Implement role-based access control', description: 'Implement RBAC to restrict access to certain features', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Write documentation for API', description: 'Write comprehensive documentation for the API', status: 'in-progress' },
    { id: crypto.randomUUID(), title: 'Deploy application to production', description: 'Deploy the application to the production environment', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Monitor application performance', description: 'Monitor application performance using Prometheus and Grafana', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Fix critical bugs', description: 'Fix all critical bugs reported by users', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Conduct security audit', description: 'Conduct a thorough security audit of the application', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Implement two-factor authentication', description: 'Implement 2FA for enhanced security', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Upgrade dependencies', description: 'Upgrade all dependencies to the latest versions', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Implement logging and error tracking', description: 'Implement logging and error tracking using Sentry', status: 'completed' },
    { id: crypto.randomUUID(), title: 'Optimize images', description: 'Optimize images to reduce page load time', status: 'completed' },
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
