<template>
    <div>
        <template v-if="!background && !showCard">
            <p class="mb-3">Please choose a file of background</p>

            <drag-and-drop
                :accept="acceptedImages"
                :error="error"
                @upload="(item) => emits('upload', item)"
                @remove="emits('remove')"
            />
        </template>

        <template v-else>
            <p class="mb-2 font-semibold">Card preview:</p>

            <div class="relative max-w-[347px]">
                <category-card class="w-full" :img="background" :name="name" />

                <button
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
        </template>
    </div>
</template>

<script setup lang="ts">
    import CategoryCard from '@/components/base/CategoryCard.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    import acceptedImages from '@/constants/accepted-images.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';

    interface Props {
        showCard: boolean;
        name: string;
        background: string;
        error?: boolean;
    }

    interface Emits {
        (e: 'upload', value: UploadableFile[] | UploadableFile): void;
        (e: 'remove'): void;
    }

    const emits = defineEmits<Emits>();
    defineProps<Props>();
</script>

<style scoped></style>
