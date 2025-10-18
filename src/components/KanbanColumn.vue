<script setup lang="ts">
  import type { Task, TaskStatus } from '@/types'
  import { kanbanFormStore } from '@/store/KanbanFormStore'
  import KanbanCard from './KanbanCard.vue'

  export interface TaskForm {
    title: string
    description: string
    status: TaskStatus
  }
  interface Props { status: TaskStatus, title: string, tasks: Task[] }
  interface Emit {
    (e: 'drop', cardId: string, newStatus: TaskStatus): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emit>()

  function onDrop (event: DragEvent) {
    event.preventDefault()
    const taskId = event.dataTransfer?.getData('taskId')
    if (taskId) {
      emit('drop', taskId, props.status)
    }
  }

  function onDragStart (event: DragEvent, taskId: string) {
    event.dataTransfer?.setData('taskId', taskId)
  }

  function onAdd () {
    kanbanFormStore.setOpen(true)
    kanbanFormStore.setValue({
      title: '',
      description: '',
      status: props.status,
    })
  }
</script>

<template>
  <v-card
    class="cursor-default d-flex flex-column"
    min-width="350px"
    rounded="lg"
    variant="tonal"
    width="350px"
    @dragenter.prevent
    @dragover.prevent
    @drop="onDrop"
  >
    <div class="d-flex align-center justify-space-between py-2 px-4">
      <v-badge
        class="w-100"
        :color="props.status === 'completed' ? 'success' : props.status === 'in-progress' ? 'warning' : undefined"
        dot
        location="left center"
      >
        <h2 class="text-subtitle-1 font-weight-bold px-2 pl-4">
          {{ title }}
        </h2>
      </v-badge>
      <v-icon-btn
        class="rounded-sm"
        icon="mdi-plus"
        size="24"
        variant="flat"
        @click="onAdd"
      >
        <v-icon size="16" />
      </v-icon-btn>
    </div>

    <v-divider />

    <div class="ga-2 d-flex flex-column pa-2 overflow-y-auto">
      <v-col v-for="task in tasks" :key="task.id" class="pa-0">
        <KanbanCard v-bind="task" :status="props.status" @dragstart="onDragStart($event, task.id)" />
      </v-col>
    </div>
  </v-card>
</template>
