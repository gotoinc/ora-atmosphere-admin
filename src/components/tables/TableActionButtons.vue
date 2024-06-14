<template>
    <div class="flex items-center justify-end gap-2">
        <button class="action-icon bg-primary-50" @click="emits('edit')">
            <v-icon size="small"> mdi-pencil </v-icon>

            <v-tooltip activator="parent" location="start"> Edit </v-tooltip>
        </button>

        <button class="action-icon bg-red-500" @click="emits('delete')">
            <v-icon size="small"> mdi-delete </v-icon>

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
