<template>
    <div class="flex gap-3">
        <v-data-table
            :sort-by="[
                {
                    key: 'date_created',
                    order: 'desc',
                },
            ]"
            :search="search"
            :loading="loading"
            class="!rounded-lg"
            :headers="headers"
            :items="items"
            :filter-keys="['description', 'title']"
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
                <div
                    v-if="item.description"
                    class="line-camp-2 description-rows"
                    v-html="sanitize(item.description.slice(0, 100))"
                ></div>

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
                    class="h-10 w-10 object-contain opacity-30"
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
                    class="h-10 w-10 object-contain opacity-30"
                    alt=""
                />
            </template>

            <template #[`item.date_created`]="{ item }">
                <p class="whitespace-nowrap">
                    {{
                        item.date_created
                            ? useFormatDate(item.date_created)
                            : 'Date is not set'
                    }}
                </p>
            </template>

            <template #[`item.duration`]="{ item }">
                <p class="whitespace-nowrap">
                    {{ useFormatDuration(item.duration) }}
                </p>
            </template>

            <template #[`item.language`]="{ item }">
                <div
                    v-if="getAllLanguages(item).length > 0"
                    class="flex flex-wrap items-center gap-2 py-2"
                >
                    <span
                        v-for="lang in getAllLanguages(item).slice(0, 2)"
                        :key="lang"
                        class="tag tag--lang tag--fill pointer-events-none capitalize"
                    >
                        {{ lang }}
                    </span>

                    <span
                        v-if="getAllLanguages(item).length > 2"
                        class="text-xs"
                    >
                        +
                        {{ getAllLanguages(item).length - 2 }}
                        more
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

                    <span
                        v-if="splitTags(item.tags).length > 2"
                        class="text-xs"
                    >
                        + {{ splitTags(item.tags).length - 2 }} more
                    </span>
                </div>

                <div v-else>No tags</div>
            </template>

            <template v-if="editable" #[`item.actions`]="{ item }">
                <table-action-buttons
                    class="max-desktop-xl:flex-col"
                    @edit="emits('edit', item)"
                    @delete="emits('delete', item)"
                />
            </template>

            <template #no-data>
                <p class="text-lg">No contents found</p>
            </template>
        </v-data-table>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import DOMPurify from 'dompurify';

    import TableActionButtons from '@/components/tables/TableActionButtons.vue';

    import { useFormatDate } from '@/hooks/useFormatDate.ts';
    import { useFormatDuration } from '@/hooks/useFormatDuration.ts';
    import type { VideoContent } from '@/ts/contents';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    interface Props {
        loading?: boolean;
        items: VideoContent[];
        editable?: boolean;
        search?: string;
    }

    interface Emits {
        (e: 'delete', value: VideoContent): void;
        (e: 'edit', value: VideoContent): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    type Writeable<T> = { -readonly [P in keyof T]: T[P] };

    const headers = ref<Writeable<ReadonlyHeaders>>([
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
            key: 'language',
        },
        {
            title: 'Tags',
            key: 'tags',
        },
    ]);

    const splitTags = (tags: string) => tags.split(', ');

    const sanitize = (str: string) => DOMPurify.sanitize(str);

    const moveActionsToStart = () => {
        if (headers.value) {
            const lastElement = headers.value[headers.value.length - 1];

            if (window.innerWidth < 1576) {
                if (lastElement.key === 'actions') {
                    const actions = headers.value.pop();

                    if (actions) headers.value.unshift(actions);
                }
            } else {
                if (lastElement.key !== 'actions') {
                    const actions = headers.value.shift();

                    if (actions) headers.value.push(actions);
                }
            }
        }
    };

    const getAllLanguages = (video: VideoContent) => {
        const audioLangs =
            video.audios?.map((audio) => audio.language.name) ?? [];
        const videoLangs = video.video_files.map((item) => item.language.name);

        return Array.from(new Set([...audioLangs, ...videoLangs]));
    };

    onMounted(() => {
        if (props.editable && headers.value) {
            const actions = {
                align: 'start',
                title: 'Actions',
                key: 'actions',
                sortable: false,
            } as (typeof headers.value)[0];

            if (window.innerWidth < 1576) {
                headers.value.unshift(actions);
            } else {
                headers.value.push(actions);
            }

            window.addEventListener('resize', moveActionsToStart);
        }
    });

    onUnmounted(() => {
        if (props.editable) {
            window.removeEventListener('resize', moveActionsToStart);
        }
    });
</script>

<style></style>
