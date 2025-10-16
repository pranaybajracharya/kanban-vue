<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'
  import KanbanCard from './KanbanCard.vue'

  type Props = { status: TaskStatus, title: string, tasks: Task[] }
  type Emit = { (e: 'drop', cardId: string, status: TaskStatus, newStatus: TaskStatus): void }

  const props = defineProps<Props>()
  const emit = defineEmits<Emit>()

  function onDrop (event: DragEvent) {
    event.preventDefault()
    const taskId = event.dataTransfer?.getData('taskId')
    const status = event.dataTransfer?.getData('status') as TaskStatus
    if (taskId && status && status !== props.status) {
      emit('drop', taskId, status, props.status)
    }
  }

  function onDragStart (event: DragEvent, taskId: string) {
    event.dataTransfer?.setData('taskId', taskId)
    event.dataTransfer?.setData('status', props.status)
  }

</script>

<template>
  <v-card
    class="pa-2"
    min-width="350px"
    variant="outlined"
    @dragenter.prevent
    @dragover.prevent
    @drop="onDrop"
  >
    <h2 class="text-h5 font-weight-bold mb-2">
      {{ title }}
    </h2>

    <div class="ga-2 d-flex flex-column">
      <v-col v-for="task in tasks" :key="task.id" class="pa-0">
        <KanbanCard v-bind="task" @dragstart="onDragStart($event, task.id)" />
      </v-col>
    </div>
  </v-card>
</template>
