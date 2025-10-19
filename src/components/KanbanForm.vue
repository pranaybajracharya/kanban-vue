<script setup lang="ts">
  import type { TaskStatus } from '@/types'
  import { statusOptions } from '@/data/tasks'
  import { kanbanFormStore } from '@/store/KanbanFormStore'

  export type KanbanFormAddSchema = {
    title: string
    description: string
    status: TaskStatus
  }

  export type KanbanFormEditSchema = {
    id: string
    title: string
    description: string
    status: TaskStatus
  }

  const emit = defineEmits<{
    (e: 'add', task: KanbanFormAddSchema): void
    (e: 'edit', task: KanbanFormEditSchema): void
    (e: 'delete', id: string): void
  }>()

  const rules = {
    required: (value: string) => !!value?.trim() || 'This field is required',
  }

  function onCloseModal () {
    kanbanFormStore.setOpen(false)
  }

  function onSubmit () {
    const { id, title, description, status } = kanbanFormStore
    if (!title.trim() || !description.trim()) {
      return
    }

    if (id) {
      emit('edit', { id, title, description, status })
    } else {
      emit('add', { title, description, status })
    }
    onCloseModal()
  }

  function onDelete () {
    const { id } = kanbanFormStore
    if (id) {
      emit('delete', id)
      onCloseModal()
    }
  }
</script>

<template>
  <v-dialog v-model="kanbanFormStore.open" max-width="600" scroll-strategy="none">
    <v-card rounded="lg">
      <v-card-title>
        <span class="text-subtitle-1 font-weight-bold">{{ kanbanFormStore.id ? 'Edit Task' : 'Add New Task' }}</span>
      </v-card-title>
      <v-form @submit.prevent="onSubmit">
        <v-card-text class="px-4 pt-2 pb-0">
          <v-text-field
            v-model="kanbanFormStore.title"
            autofocus
            class="mb-4"
            hide-details="auto"
            label="Title"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-textarea
            v-model="kanbanFormStore.description"
            class="mb-2"
            hide-details="auto"
            label="Description"
            rows="4"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-select
            v-model="kanbanFormStore.status"
            hide-details="auto"
            item-title="title"
            item-value="value"
            :items="statusOptions"
            label="Status"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions class="px-4 py-4">
          <KanbanDeleteButton v-if="kanbanFormStore.id" @delete="onDelete" />
          <v-spacer />
          <v-btn
            class="text-body-2"
            variant="text"
            @click="onCloseModal"
          >
            Cancel
          </v-btn>
          <v-btn
            class="text-body-2"
            color="accent"
            type="submit"
            variant="tonal"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
