<script setup lang="ts">
  import type { Task } from '@/types'
  import { ref } from 'vue'

  type Props = Task
  type Emit = { (e: 'dragstart', event: DragEvent): void }

  defineProps<Props>()
  const emit = defineEmits<Emit>()

  const isDragging = ref(false)

  function onDragStart (event: DragEvent) {
    isDragging.value = true
    emit('dragstart', event)
  }

  function onDragEnd () {
    isDragging.value = false
  }

</script>

<template>
  <v-card
    class="bg-foreground"
    :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
    draggable="true"
    rounded="lg"
    variant="tonal"
    width="100%"
    @dragend="onDragEnd"
    @dragstart="onDragStart"
  >
    <template #title>
      <h3 class="text-subtitle-2 font-weight-bold">
        {{ title }}
      </h3>
    </template>

    <template #subtitle>
      <div class="text-body-2">
        {{ description }}
      </div>
    </template>
  </v-card>
</template>
