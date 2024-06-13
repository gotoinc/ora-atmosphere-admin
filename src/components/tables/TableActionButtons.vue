<template>
    <div class="flex items-center justify-end gap-2">
        <button class="action-icon bg-primary-50">
            <v-icon size="small" @click="emits('edit')"> mdi-pencil </v-icon>

            <v-tooltip activator="parent" location="start"> Edit </v-tooltip>
        </button>

        <button class="action-icon bg-red-500">
            <v-icon size="small" @click="emits('delete')"> mdi-delete </v-icon>

            <v-tooltip activator="parent" location="top"> Delete </v-tooltip>
        </button>
    </div>
</template>

<script setup lang="ts">
    interface Emits {
        (e: 'edit'): void;
        (e: 'delete'): void;
    }

    const emits = defineEmits<Emits>();
</script>

<style scoped></style>
