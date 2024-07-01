<template>
    <div class="h-full pb-12">
        <div class="mb-5 w-full gap-4">
            <div class="mb-5 w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload video</h3>

                <drag-and-drop
                    v-if="!videoSrc && !isContentSelected"
                    :error="!!errors.file_url"
                    :accept="['video/mp4', 'video/webm']"
                    @upload="selectVideoFile"
                    @remove="removeVideoFile"
                >
                    <template #icon>
                        <span class="mdi mdi-video-vintage text-6xl"></span>
                    </template>
                </drag-and-drop>

                <!-- Video block -->
                <div
                    v-else
                    class="relative w-full flex-shrink-0 overflow-hidden rounded"
                >
                    <div class="mb-4 h-80 max-tab:h-[45vw]">
                        <video
                            ref="videoElement"
                            class="h-full w-full object-cover"
                            controls
                            @loadedmetadata="loadVideoInfo"
                        >
                            <source :src="videoSrc ?? content?.file_url" />
                        </video>
                    </div>

                    <div class="flex flex-col">
                        <!-- Video info -->
                        <div v-if="isVideoLoaded">
                            <template v-if="uploadedVideoFile">
                                <div class="mb-2">
                                    <span class="text-sm">File name:</span>

                                    <p class="block truncate font-semibold">
                                        {{ uploadedVideoFile.name }}
                                    </p>
                                </div>

                                <div class="mb-2">
                                    <span class="text-sm">File size:</span>

                                    <p class="font-semibold">
                                        {{
                                            useFormatFileSize(
                                                uploadedVideoFile.size
                                            )
                                        }}
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
                        </div>

                        <v-skeleton-loader
                            v-else-if="!content"
                            type="paragraph"
                        ></v-skeleton-loader>

                        <div class="mb-4">
                            <h3 class="text-xl">Settings</h3>

                            <v-divider class="my-3"></v-divider>

                            <div class="flex flex-wrap gap-x-10 gap-y-2">
                                <v-checkbox
                                    v-model="requiresAuth"
                                    hide-details
                                    color="primary"
                                    density="comfortable"
                                    label="Visible for all users"
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

                        <div class="mt-auto text-right">
                            <v-btn
                                type="submit"
                                color="red"
                                class="text-none w-fit"
                                @click="changeVideo"
                            >
                                Change video
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload audio</h3>

                <drag-and-drop
                    :accept="['audio/mpeg']"
                    multiple
                    class="mb-5"
                    @upload="selectAudioFiles"
                >
                    <template #icon>
                        <span class="mdi mdi-music text-6xl"></span>
                    </template>
                </drag-and-drop>

                <div v-if="audioFiles.size > 0" class="grid gap-2">
                    <h4 class="mb-3 font-semibold">
                        Uploaded files
                        {{ `(${audioFiles.size})` }}
                    </h4>

                    <div class="grid grid-cols-3 gap-3">
                        <div
                            v-for="(file, i) in audioFiles"
                            :key="i"
                            class="rounded bg-slate-600 p-4"
                        >
                            <audio
                                preload="metadata"
                                class="mb-2 w-full"
                                controls
                                :src="getSource(file)"
                            ></audio>

                            <div class="space-y-4">
                                <h5 class="mb-2">
                                    File name:
                                    <span class="line-camp-1">
                                        {{ file.name }}
                                    </span>
                                </h5>

                                <p>
                                    File size:
                                    {{ useFormatFileSize(file.size) }}
                                </p>

                                <v-btn
                                    type="submit"
                                    color="red"
                                    class="text-none w-fit"
                                    @click="removeAudioFile(file)"
                                >
                                    Remove
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                <p class="mb-5">Please select language of the content</p>

                <v-select
                    v-model="language"
                    label="Languages"
                    variant="outlined"
                    clearable
                    :error-messages="errors.language"
                    :items="['French', 'English', 'Spanish']"
                >
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
    const uploadedVideoFile = ref<File | null>(null);
    const videoSrc = ref(props.content?.file_url ?? '');
    const imageSrc = ref('');

    const audioFiles = ref<Set<File>>(new Set());

    const videoElement = ref<HTMLVideoElement | null>(null);

    /**
     * Define fields for form
     */
    const topic = ref();
    const [title] = defineField('title');
    const [description] = defineField('description');
    const [contentFile] = defineField('file_url');
    const [topicId] = defineField('topic_id');
    const [language] = defineField('language');
    const [tags] = defineField('tags');
    const [requiresAuth] = defineField('requires_auth');
    const [withNarration] = defineField('with_narration');
    const [withSound] = defineField('with_sound');
    const [duration] = defineField('duration');
    const [audio] = defineField('audio');

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
                'audio',
            ])
        );
    }

    const getSource = (file: File) => URL.createObjectURL(file);

    const selectVideoFile = (files: UploadableFile[]) => {
        uploadedVideoFile.value = files[0].file;
        contentFile.value = files[0].name;

        videoSrc.value = getSource(uploadedVideoFile.value);
    };

    const selectAudioFiles = (files: UploadableFile[]) => {
        files.forEach((item) => {
            audioFiles.value.add(item.file);
        });

        audio.value = Array.from(audioFiles.value);
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

    const removeVideoFile = () => {
        uploadedVideoFile.value = null;
        contentFile.value = '';
    };

    const removeAudioFile = (file: File) => {
        audioFiles.value.delete(file);
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
