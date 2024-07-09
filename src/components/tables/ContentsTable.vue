<template>
    <v-data-table
        :sort-by="[
            {
                key: 'date_created',
                order: 'desc',
            },
        ]"
        :loading="loading"
        class="!rounded-lg"
        :headers="headers"
        :items="items"
    >
        <template #[`item.title`]="{ item }">
            <p class="min-w-28">
                {{ item.title }}
            </p>
        </template>

        <template #[`item.preview_image`]="{ item }">
            <v-card
                v-if="item.preview_image"
                class="my-2 h-20 w-20"
                elevation="2"
                rounded
            >
                <v-img
                    :src="item.preview_image"
                    class="h-full w-full"
                    cover
                ></v-img>
            </v-card>

            <div v-else>No preview</div>
        </template>

        <template #[`item.description`]="{ item }">
            <p v-if="item.description" class="line-camp-2">
                {{ item.description }}
            </p>

            <div v-else>No description</div>
        </template>

        <template #[`item.topic`]="{ item }">
            <p v-if="item.topic" class="line-camp-2">
                {{ item.topic.name }}
            </p>

            <div v-else>No theme</div>
        </template>

        <template #[`item.audio_enabled`]="{ item }">
            <img
                v-if="item.audio_enabled"
                src="@img/volume-on.svg"
                class="h-10 w-10 object-contain"
                alt=""
            />

            <img
                v-else
                src="@img/volume-off.svg"
                class="h-10 w-10 object-contain opacity-60"
                alt=""
            />
        </template>

        <template #[`item.narration_enabled`]="{ item }">
            <img
                v-if="item.narration_enabled"
                src="@img/narration-on.svg"
                class="h-10 w-10 object-contain"
                alt=""
            />

            <img
                v-else
                src="@img/narration-off.svg"
                class="h-10 w-10 object-contain opacity-60"
                alt=""
            />
        </template>

        <template #[`item.date_created`]="{ item }">
            <p class="whitespace-nowrap">
                {{ useFormatDate(item.date_created) }}
            </p>
        </template>

        <template #[`item.duration`]="{ item }">
            <p class="whitespace-nowrap">
                {{ useFormatVideoDuration(item.duration) }}
            </p>
        </template>

        <template #[`item.languages`]="{ item }">
            <div
                v-if="item.languages.name"
                class="flex flex-wrap items-center gap-2 py-2"
            >
                <span class="tag tag--lang tag--fill pointer-events-none">
                    {{ item.languages.name }}
                </span>

                <span v-if="item.tags" class="text-xs">
                    + {{ item.tags.length - 2 }} more
                </span>
            </div>

            <div v-else>No languages</div>
        </template>

        <template #[`item.tags`]="{ item }">
            <div
                v-if="item.tags"
                class="flex min-w-40 flex-wrap items-center gap-2 py-2"
            >
                <span
                    v-for="tag in splitTags(item.tags).slice(0, 2)"
                    :key="tag"
                    class="tag tag--fill pointer-events-none"
                >
                    {{ tag }}
                </span>

                <span v-if="splitTags(item.tags).length > 2" class="text-xs">
                    + {{ splitTags(item.tags).length - 2 }} more
                </span>
            </div>

            <div v-else>No tags</div>
        </template>

        <template v-if="editable" #[`item.actions`]="{ item }">
            <table-action-buttons
                @edit="emits('edit', item)"
                @delete="emits('delete', item)"
            />
        </template>

        <template #no-data>
            <p class="text-lg">No contents found</p>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import TableActionButtons from '@/components/tables/TableActionButtons.vue';

    import { useFormatDate } from '@/hooks/useFormatDate.ts';
    import { useFormatVideoDuration } from '@/hooks/useFormatVideoDuration.ts';
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

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Title',
            align: 'start',
            key: 'title',
        },
        {
            title: 'Preview',
            key: 'preview_image',
            sortable: false,
        },
        {
            title: 'Theme',
            key: 'topic',
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
            key: 'audio_enabled',
            sortable: false,
        },
        {
            title: 'Narration',
            key: 'narration_enabled',
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
    ]);

    type Writeable<T> = { -readonly [P in keyof T]: T[P] };

    if (props.editable) {
        const tableHeaders = headers.value as Writeable<ReadonlyHeaders>;

        tableHeaders?.push({
            align: 'end',
            title: 'Actions',
            key: 'actions',
            sortable: false,
        });
    }

    const splitTags = (tags: string) => tags.split(', ');
</script>

<style>
    /* .v-table > .v-table__wrapper > table {
        min-width: 1240px;
    }*/
</style>
