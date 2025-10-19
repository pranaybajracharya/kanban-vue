<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    title: string
    description: string
  }
  interface Emit {
    (e: 'dragstart', event: DragEvent): void
    (e: 'click'): void
  }

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
    emit('click')
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
        <h3 class="text-subtitle-2 font-weight-bold truncate">
          {{ props.title }}
        </h3>
      </template>

      <template #subtitle>
        <p class="text-body-2 truncate">
          {{ props.description }}
        </p>
      </template>
    </v-card>
  </button>
</template>

<style scoped>
.truncate {
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
