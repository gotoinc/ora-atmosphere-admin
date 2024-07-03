<template>
    <v-data-table
        :loading="loading"
        class="!rounded-lg"
        :headers="headers"
        :items="items"
    >
        <template #[`item.image`]="{ item }">
            <v-card
                v-if="item.image"
                class="my-2 h-20 w-20"
                elevation="2"
                rounded
            >
                <v-img :src="item.image" class="h-full w-full" cover></v-img>
            </v-card>

            <div v-else>No image</div>
        </template>

        <template #[`item.description`]="{ item }">
            <p v-if="item.description" class="line-camp-2">
                {{ item.description }}
            </p>

            <div v-else>No image</div>
        </template>

        <template #[`item.with_sound`]="{ item }">
            <img
                v-if="item.with_sound"
                src="@img/volume-on.svg"
                class="h-10 w-10 object-contain"
                alt=""
            />

            <img
                v-else
                src="@img/volume-off.svg"
                class="h-10 w-10 object-contain"
                alt=""
            />
        </template>

        <template #[`item.with_narration`]="{ item }">
            <img
                v-if="item.with_narration"
                src="@img/narration-on.svg"
                class="h-10 w-10 object-contain"
                alt=""
            />

            <img
                v-else
                src="@img/narration-off.svg"
                class="h-10 w-10 object-contain"
                alt=""
            />
        </template>

        <template #[`item.date_created`]="{ item }">
            <p class="whitespace-nowrap">
                {{ item.date_created }}
            </p>
        </template>

        <template #[`item.languages`]="{ item }">
            <div
                v-if="item.languages"
                class="flex flex-wrap items-center gap-2 py-2"
            >
                <span
                    v-for="lang in item.languages.slice(0, 2)"
                    :key="lang.id"
                    class="tag tag--lang tag--fill pointer-events-none"
                >
                    {{ lang.name }}
                </span>

                <span class="text-xs">+ {{ item.tags.length - 2 }} more</span>
            </div>

            <div v-else>No languages</div>
        </template>

        <template #[`item.tags`]="{ item }">
            <div
                v-if="item.tags"
                class="flex flex-wrap items-center gap-2 py-2"
            >
                <span
                    v-for="tag in item.tags.slice(0, 2)"
                    :key="tag"
                    class="tag tag--fill pointer-events-none"
                >
                    {{ tag }}
                </span>

                <span class="text-xs">+ {{ item.tags.length - 2 }} more</span>
            </div>

            <div v-else>No tags</div>
        </template>

        <template #[`item.actions`]="{ item }">
            <div class="flex items-center justify-end gap-2">
                <button class="action-icon bg-primary-50">
                    <v-icon size="small" @click="emits('edit', item)">
                        mdi-pencil
                    </v-icon>

                    <v-tooltip activator="parent" location="start">
                        Edit
                    </v-tooltip>
                </button>

                <button class="action-icon bg-red-500">
                    <v-icon size="small" @click="emits('delete', item)">
                        mdi-delete
                    </v-icon>

                    <v-tooltip activator="parent" location="top">
                        Delete
                    </v-tooltip>
                </button>
            </div>
        </template>

        <template #no-data>
            <p class="text-lg">No contents found</p>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import type { VideoContent } from '@/ts/contents';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    interface Props {
        loading?: boolean;
        items: VideoContent[];
        editable?: boolean;
    }

    interface Emits {
        (e: 'delete', value: VideoContent): void;
        (e: 'edit', value: VideoContent): void;
    }

    defineProps<Props>();
    const emits = defineEmits<Emits>();

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Title',
            align: 'start',
            key: 'title',
        },
        {
            title: 'Preview',
            key: 'image',
            sortable: false,
        },
        {
            title: 'Theme',
            key: 'topic.name',
        },
        {
            title: 'Description',
            key: 'description',
        },
        {
            title: 'Duration',
            key: 'duration',
            sortable: false,
        },
        {
            title: 'Sound',
            key: 'with_sound',
            sortable: false,
        },
        {
            title: 'Narration',
            key: 'with_narration',
            sortable: false,
        },
        {
            title: 'Date',
            key: 'date_created',
        },
        {
            title: 'Languages',
            key: 'languages',
        },
        {
            title: 'Tags',
            key: 'tags',
        },
        {
            align: 'end',
            title: 'Actions',
            key: 'actions',
            sortable: false,
        },
    ]);
</script>

<style scoped></style>
