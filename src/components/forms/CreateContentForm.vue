<template>
    <div class="h-full pb-12">
        <drag-and-drop
            v-if="!videoSrc && !isContentSelected"
            :error="!!errors.file_url"
            :accept="['video/mp4', 'video/webm']"
            class="h-full"
            @upload="selectFile"
            @remove="removeFile"
        />

        <div
            v-else
            class="flex items-start justify-between gap-10 max-tab:flex-col-reverse"
        >
            <!-- Form -->
            <form
                class="grid flex-grow gap-2 max-tab:w-full"
                @submit.prevent="onSubmit"
            >
                <div>
                    <p class="mb-5">Please enter a content title</p>

                    <v-text-field
                        v-model="title"
                        :error-messages="errors.title"
                        name="title"
                        label="Content title"
                        type="name"
                        variant="outlined"
                    />
                </div>

                <div>
                    <p class="mb-5">Please enter a description (optional)</p>

                    <v-textarea
                        v-model="description"
                        :error-messages="errors.description"
                        label="Description"
                        variant="outlined"
                    ></v-textarea>
                </div>

                <div>
                    <p class="mb-5">Please select theme of the content</p>

                    <v-select
                        v-model="topic"
                        label="Theme"
                        variant="outlined"
                        clearable
                        :error-messages="errors.topic_id"
                        :items="topics"
                        item-title="name"
                        return-object
                        @update:model-value="selectTopicId"
                    />
                </div>

                <div>
                    <p class="mb-5">Please select languages of the content</p>

                    <v-select
                        v-model="languages"
                        multiple
                        label="Languages"
                        variant="outlined"
                        clearable
                        :error-messages="errors.languages"
                        :items="['French', 'English', 'Spanish']"
                    >
                        <template #selection="{ item }">
                            <span class="tag tag--fill tag--lang capitalize">
                                {{ item.title }}
                            </span>
                        </template>
                    </v-select>
                </div>

                <div>
                    <p class="mb-5">Tags</p>

                    <v-combobox
                        v-model="tags"
                        multiple
                        label="Tags"
                        variant="outlined"
                    >
                        <template #selection="{ item }">
                            <span class="tag tag--fill">
                                {{ item.title }}
                            </span>
                        </template>
                    </v-combobox>
                </div>

                <v-btn type="submit" color="primary" class="text-none w-fit">
                    {{ content ? 'Save changes' : 'Save' }}
                </v-btn>
            </form>

            <!-- Video block -->
            <div
                v-if="uploadedFile || content"
                class="relative max-w-96 flex-shrink-0 overflow-hidden rounded bg-grey-300 max-tab:w-full max-tab:max-w-full"
            >
                <div class="h-64 max-tab:h-[45vw]">
                    <video
                        ref="videoElement"
                        class="h-full w-full object-cover"
                        controls
                        @loadedmetadata="loadVideoInfo"
                    >
                        <source :src="videoSrc ?? content?.file_url" />
                    </video>
                </div>

                <div class="p-4">
                    <!-- Video info -->
                    <div v-if="isVideoLoaded">
                        <template v-if="uploadedFile">
                            <div class="mb-2">
                                <span class="text-sm">File name:</span>

                                <p class="block truncate font-semibold">
                                    {{ uploadedFile.name }}
                                </p>
                            </div>

                            <div class="mb-2">
                                <span class="text-sm">File size:</span>

                                <p class="font-semibold">
                                    {{ useFormatFileSize(uploadedFile.size) }}
                                </p>
                            </div>

                            <div class="mb-5">
                                <span class="text-sm">Duration:</span>

                                <p class="font-semibold">
                                    {{ useFormatVideoDuration(duration) }}
                                </p>
                            </div>
                        </template>

                        <div v-else-if="content" class="mb-5">
                            <span class="block text-sm">Video link:</span>

                            <a
                                target="_blank"
                                :href="content.file_url"
                                class="block truncate text-sm font-semibold text-primary-50 underline transition-colors hover:text-primary-100"
                            >
                                {{ content.file_url }}
                            </a>
                        </div>

                        <div class="mb-4">
                            <h3 class="text-xl">Settings</h3>

                            <v-divider class="my-3"></v-divider>

                            <div class="flex flex-wrap gap-x-10 gap-y-2">
                                <v-checkbox
                                    v-model="requiresAuth"
                                    hide-details
                                    color="primary"
                                    density="comfortable"
                                    label="Visible for unregistered users"
                                ></v-checkbox>

                                <v-checkbox
                                    v-model="withSound"
                                    hide-details
                                    color="primary"
                                    density="comfortable"
                                    label="Sound enabled"
                                ></v-checkbox>

                                <v-checkbox
                                    v-model="withNarration"
                                    hide-details
                                    color="primary"
                                    density="comfortable"
                                    label="Narration enabled"
                                ></v-checkbox>

                                <v-checkbox
                                    v-model="showContentByDefault"
                                    hide-details
                                    color="primary"
                                    density="comfortable"
                                    label="Show video on main banner by default"
                                ></v-checkbox>
                            </div>
                        </div>
                    </div>

                    <v-skeleton-loader
                        v-else-if="!content"
                        type="paragraph"
                    ></v-skeleton-loader>

                    <div class="text-right">
                        <v-btn
                            type="submit"
                            color="error"
                            class="text-none w-fit"
                            @click="changeVideo"
                        >
                            Change video
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useForm } from 'vee-validate';

    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    import { useCaptureImage } from '@/hooks/useCaptureImage.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { useFormatFileSize } from '@/hooks/useFormatFileSize.ts';
    import { useFormatVideoDuration } from '@/hooks/useFormatVideoDuration.ts';
    import type { Topic } from '@/ts/catalog';
    import type { Content } from '@/ts/contents';
    import { createContentSchema } from '@/validations/schemas/content.schema.ts';
    import type { CreateContent } from '@/validations/types/content';

    const props = defineProps<{ content?: Content | null }>();

    const isContentSelected = ref(!!props.content);
    const isVideoLoaded = ref(!!props.content);
    const showContentByDefault = ref(false);

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateContent>({
            validationSchema: createContentSchema,
            initialValues: {},
        });

    /**
     * Data for content sources
     */
    const uploadedFile = ref<File | null>(null);
    const videoSrc = ref(props.content?.file_url ?? '');
    const imageSrc = ref('');

    const videoElement = ref<HTMLVideoElement | null>(null);

    /**
     * Define fields for form
     */
    const topic = ref();
    const [title] = defineField('title');
    const [description] = defineField('description');
    const [contentFile] = defineField('file_url');
    const [topicId] = defineField('topic_id');
    const [languages] = defineField('languages');
    const [tags] = defineField('tags');
    const [requiresAuth] = defineField('requires_auth');
    const [withNarration] = defineField('with_narration');
    const [withSound] = defineField('with_sound');
    const [duration] = defineField('duration');

    /**
     * Test topics
     */
    const topics = [
        {
            id: 100,
            name: 'Theme 1',
        },
        {
            id: 101,
            name: 'Theme 2',
        },
    ];

    if (props.content) {
        topic.value = props.content.topic;
        topicId.value = props.content.topic.id;

        setValues(
            useExcludeProperties({ ...props.content }, [
                'id',
                'date_created',
                'image_url',
            ])
        );
    }

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            uploadedFile.value = value[0].file;
            contentFile.value = value[0].name;

            videoSrc.value = URL.createObjectURL(uploadedFile.value);
        }
    };

    const selectTopicId = (topic?: Topic) => {
        if (topic) {
            topicId.value = topic.id;
        }
    };

    const loadVideoInfo = () => {
        if (videoElement.value) {
            duration.value = videoElement.value.duration;

            isVideoLoaded.value = true;
        }
    };

    const onVideoCapture = () => {
        if (videoElement.value) {
            const src = useCaptureImage(videoElement.value);

            if (src) imageSrc.value = src;

            duration.value = videoElement.value.duration;
        }
    };

    const changeVideo = () => {
        videoSrc.value = '';
        isContentSelected.value = false;
    };

    const removeFile = () => {
        uploadedFile.value = null;
        contentFile.value = '';
    };

    const onSubmit = handleSubmit((values) => {
        if (!props.content) {
            onVideoCapture();
        }

        console.log(values);

        resetForm();
        topic.value = null;
    });
</script>

<style scoped></style>
