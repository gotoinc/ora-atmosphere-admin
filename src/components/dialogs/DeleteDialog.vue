<template>
    <v-dialog v-model="isDialogOpen" max-width="400">
        <div class="rounded-lg bg-dark p-7 text-center shadow-2xl">
            <h3 class="mb-5 text-xl font-semibold">
                Delete
                <span v-if="title" class="text-primary-50">
                    {{ title }}
                </span>
            </h3>

            <p class="mb-8">Are you sure you want to delete?</p>

            <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                <v-btn
                    color="primary"
                    class="text-none flex-grow"
                    @click="isDialogOpen = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    :loading="loading"
                    class="text-none flex-grow"
                    color="error"
                    @click="emits('delete')"
                >
                    Delete
                </v-btn>
            </div>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface Props {
        modelValue: boolean;
        title?: string;
        loading?: boolean;
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
        (e: 'delete'): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const isDialogOpen = computed({
        get() {
            return props.modelValue;
        },

        set(value) {
            emits('update:modelValue', value);
        },
    });
</script>

<style scoped></style>
