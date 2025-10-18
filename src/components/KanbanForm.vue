<script setup lang="ts">
  import type { TaskStatus } from '@/types'
  import { ref } from 'vue'
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

  const formRef = ref<HTMLFormElement | null>(null)

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
      emit('edit', { id: id, title: title, description: description, status: status })
    } else {
      emit('add', { title: title, description: description, status: status })
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
  <v-dialog v-model="kanbanFormStore.open" max-width="600">
    <v-card rounded="lg">
      <v-card-title>
        <span class="text-subtitle-1 font-weight-bold">{{ kanbanFormStore.id ? 'Edit Task' : 'Add New Task' }}</span>
      </v-card-title>
      <v-form ref="formRef" @submit.prevent="onSubmit">
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
        </v-card-text>
        <v-card-actions class="px-4 py-4">
          <v-icon-btn
            class="rounded-sm border-error"
            icon="mdi-delete"
            size="36"
            variant="tonal"
            @click="onDelete"
          >
            <v-icon color="red" size="16" />
          </v-icon-btn>
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
