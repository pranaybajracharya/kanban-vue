<script lang="ts" setup>
  const emit = defineEmits<{
    (e: 'delete'): void
  }>()

  function onDelete () {
    emit('delete')
  }
</script>

<template>
  <v-dialog max-width="400">
    <template #activator="{ props: activatorProps }">
      <v-icon-btn
        v-bind="activatorProps"
        class="rounded-sm border-error"
        icon="mdi-delete"
        size="36"
        variant="tonal"
      >
        <v-icon color="red" size="16" />
      </v-icon-btn>

    </template>

    <template #default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title>
          <span class="text-subtitle-1 font-weight-bold">Confirm Delete</span></v-card-title>
        <v-card-text class="text-subtitle-2 px-4 py-2">Are you sure you want to delete this task? This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-body-2"
            variant="text"
            @click="isActive.value = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="text-body-2"
            color="error"
            type="submit"
            variant="tonal"
            @click="onDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
