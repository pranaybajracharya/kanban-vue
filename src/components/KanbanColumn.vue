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
    class="cursor-default"
    min-width="350px"
    rounded="lg"
    variant="tonal"
    @dragenter.prevent
    @dragover.prevent
    @drop="onDrop"
  >
    <div>
      <v-badge
        class="w-100"
        :color="props.status === 'completed' ? 'success' : props.status === 'in-progress' ? 'warning' : undefined"
        dot
        location="left center"
        :offset-x="12"
      >
        <h2 class="text-subtitle-1 font-weight-bold w-100 pa-2 pl-7 border-b-md">
          {{ title }}
        </h2>
      </v-badge>
    </div>

    <div class="ga-2 d-flex flex-column pa-2">
      <v-col v-for="task in tasks" :key="task.id" class="pa-0">
        <KanbanCard v-bind="task" @dragstart="onDragStart($event, task.id)" />
      </v-col>
    </div>
  </v-card>
</template>
