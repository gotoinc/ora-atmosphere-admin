<template>
    <div>
        <template v-if="!background && !showCard">
            <p class="mb-3">
                {{ label }}
            </p>

            <drag-and-drop
                :accept="acceptedImages"
                :error="!!error"
                @upload="(item) => emits('upload', item)"
                @remove="emits('remove')"
            />
        </template>

        <template v-else>
            <p class="mb-2 font-semibold">Card preview:</p>

            <div class="relative z-10 max-w-card">
                <category-card class="w-full" :img="background" :name="name" />

                <button
                    type="button"
                    class="action-icon absolute right-2 top-2 bg-red-500 hover:bg-red-600"
                >
                    <v-icon
                        color=""
                        class="action-icon"
                        @click="emits('remove')"
                    >
                        mdi-delete
                    </v-icon>
                </button>
            </div>

            <p class="mt-2 font-semibold text-error">
                {{ error }}
            </p>
        </template>
    </div>
</template>

<script setup lang="ts">
    import CategoryCard from '@/components/base/CategoryCard.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    import acceptedImages from '@/constants/accepted-images.ts';

    interface Props {
        showCard: boolean;
        name: string;
        background: string;
        error?: string;
        label?: string;
    }

    interface Emits {
        (e: 'upload', value: File | File[]): void;
        (e: 'remove'): void;
    }

    const emits = defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        label: 'Please choose a file of background',
    });
</script>

<style scoped></style>
