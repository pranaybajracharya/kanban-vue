<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'
  import { ref } from 'vue'

  const tasks = ref<{
    [key in TaskStatus]: Task[]
  }>({
    'open': [
      { id: '1', title: 'Task 1', description: 'Description for Task 1' },
      { id: '2', title: 'Task 2', description: 'Description for Task 2' },
      { id: '3', title: 'Task 3', description: 'Description for Task 3' },
      { id: '4', title: 'Task 4', description: 'Description for Task 4' },
      { id: '5', title: 'Task 5', description: 'Description for Task 5' },
      { id: '6', title: 'Task 6', description: 'Description for Task 6' },
    ],
    'in-progress': [
      { id: '7', title: 'Task 7', description: 'Description for Task 7' },
      { id: '8', title: 'Task 8', description: 'Description for Task 8' },
      { id: '9', title: 'Task 9', description: 'Description for Task 9' },
      { id: '10', title: 'Task 10', description: 'Description for Task 10' },
      { id: '11', title: 'Task 11', description: 'Description for Task 11' },
      { id: '12', title: 'Task 12', description: 'Description for Task 12' },
    ],
    'completed': [
      { id: '13', title: 'Task 13', description: 'Description for Task 13' },
      { id: '14', title: 'Task 14', description: 'Description for Task 14' },
      { id: '15', title: 'Task 15', description: 'Description for Task 15' },
      { id: '16', title: 'Task 16', description: 'Description for Task 16' },
      { id: '17', title: 'Task 17', description: 'Description for Task 17' },
      { id: '18', title: 'Task 18', description: 'Description for Task 18' },
    ],
  })

  function onDrop (cardId: string, status: TaskStatus, newStatus: TaskStatus) {
    const card = tasks.value[status].find(c => c.id === cardId)
    if (card) {
      tasks.value[status] = tasks.value[status].filter(c => c.id !== cardId)
      tasks.value[newStatus].push(card)
    }
  }
</script>

<template>
  <h1>Kanban Board</h1>
  <div class="fill-height overflow-auto">
    <div class="d-flex ga-2">
      <KanbanColumn status="open" :tasks="tasks.open" title="Open" @drop="onDrop" />
      <KanbanColumn status="in-progress" :tasks="tasks['in-progress']" title="In Progress" @drop="onDrop" />
      <KanbanColumn status="completed" :tasks="tasks.completed" title="Completed" @drop="onDrop" />
    </div>

  </div>
</template>
