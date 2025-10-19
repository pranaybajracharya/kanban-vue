<script setup lang="ts">
  import type { Task } from '@/types'
  import { ref } from 'vue'
  import { kanbanFormStore } from '@/store/KanbanFormStore'

  interface Props extends Task {}
  interface Emit { (e: 'dragstart', event: DragEvent): void }

  const props = defineProps<Props>()
  const emit = defineEmits<Emit>()

  const isDragging = ref(false)

  function onDragStart (event: DragEvent) {
    isDragging.value = true
    emit('dragstart', event)
  }

  function onDragEnd () {
    isDragging.value = false
  }

  function onClick () {
    kanbanFormStore.setOpen(true)
    kanbanFormStore.setValue({
      id: props.id,
      title: props.title,
      description: props.description,
      status: props.status,
    })
  }
</script>

<template>
  <button
    class="w-100 text-left"
    :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
    draggable="true"
    @click="onClick"
    @dragend="onDragEnd"
    @dragstart="onDragStart"
  >
    <v-card rounded="lg" variant="tonal">
      <template #title>
        <h3 class="text-subtitle-2 font-weight-bold">
          {{ title }}
        </h3>
      </template>

      <template #subtitle>
        <div class="text-body-2 description-truncate">
          {{ description }}
        </div>
      </template>
    </v-card>
  </button>
</template>

<style scoped>
.description-truncate {
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
