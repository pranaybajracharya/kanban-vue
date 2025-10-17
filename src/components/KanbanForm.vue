<script setup lang="ts">
  import { ref } from 'vue'

  export type KanbanFormSchema = {
    title: string
    description: string
  }

  const emit = defineEmits<{
    (e: 'submit', task: KanbanFormSchema): void
  }>()
  const open = defineModel<boolean>()

  const formRef = ref<HTMLFormElement | null>(null)
  const formData = ref<KanbanFormSchema>({
    title: '',
    description: '',
  })

  const rules = {
    required: (value: string) => !!value || 'This field is required',
  }

  function onCloseModal () {
    open.value = false
  }

  function onSubmit () {
    emit('submit', { ...formData.value })
    onCloseModal()
    formRef.value?.reset()
  }

</script>

<template>
  <v-dialog v-model="open" max-width="600">
    <v-card rounded="lg">
      <v-card-title>
        <span class="text-subtitle-1 font-weight-bold">Add New Task</span>
      </v-card-title>
      <v-form ref="formRef" @submit.prevent="onSubmit">
        <v-card-text class="px-4 pt-2 pb-0">
          <v-text-field
            v-model="formData.title"
            autofocus
            class="mb-4 "
            hide-details="auto"
            label="Title"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-textarea
            v-model="formData.description"
            class="mb-2"
            hide-details="auto"
            label="Description"
            rows="4"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions class="px-4 py-4">
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
