<script setup lang="ts">
  import type { Task } from '@/types'

  type Props = Task
  type Emit = { (e: 'dragstart', event: DragEvent): void }

  defineProps<Props>()
  defineEmits<Emit>()

</script>

<template>
  <v-card
    class="background-color=primary"
    draggable="true"
    variant="outlined"
    width="100%"
    @dragstart="$emit('dragstart', $event)"
  >
    <template #title>
      <h2 class="text-h6 font-weight-bold">
        {{ title }}
      </h2>
    </template>

    <template #subtitle>
      <div class="text-subtitle-2">
        {{ description }}
      </div>
    </template>
  </v-card>
</template>
