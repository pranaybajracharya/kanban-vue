<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'
  import KanbanCard from './KanbanCard.vue'

  type KanbanColumnProps = { status: TaskStatus, title: string, tasks: Task[] }

  const props = defineProps<KanbanColumnProps>()
</script>

<template>
  <v-card
    class="pa-2"
    min-width="350px"
    variant="outlined"
  >
    <h2 class="text-h5 font-weight-bold mb-2">
      {{ props.title }}
    </h2>

    <div class="ga-2 d-flex flex-column">
      <v-col v-for="task in props.tasks" :key="task.id" class="pa-0">
        <KanbanCard v-bind="task" />
      </v-col>
    </div>
  </v-card>
</template>
