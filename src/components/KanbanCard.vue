<script setup lang="ts">
  import type { Task } from '@/types'

  type KanbanCardProps = Task

  const props = defineProps<KanbanCardProps>()
</script>

<template>
  <v-card
    variant="outlined"
    width="100%"
  >
    <template #title>
      <h2 class="text-h6 font-weight-bold">
        {{ props.title }}
      </h2>
    </template>

    <template #subtitle>
      <div class="text-subtitle-2">
        {{ props.description }}
      </div>
    </template>
  </v-card>
</template>
