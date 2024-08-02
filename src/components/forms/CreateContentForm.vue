<template>
    <div class="h-full pb-12">
        <div class="mb-5 w-full gap-4">
            <div class="mb-5 w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload video</h3>

                <drag-and-drop
                    v-if="!isContentSelected"
                    :error="!!errors.file"
                    :accept="acceptedVideos"
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
                            v-if="videoSrc"
                            ref="videoElement"
                            class="h-full w-full rounded-lg object-cover"
                            controls
                            playsinline
                            crossorigin="anonymous"
                            @loadedmetadata="loadVideoInfo"
                        >
                            <source :src="videoSrc" />
                        </video>

                        <v-skeleton-loader
                            v-else
                            class="h-full"
                        ></v-skeleton-loader>
                    </div>

                    <div class="flex flex-col">
                        <v-skeleton-loader
                            v-if="!isVideoLoaded"
                            type="paragraph"
                            class="mb-3"
                        ></v-skeleton-loader>

                        <!-- Video info -->
                        <template v-else>
                            <div>
                                <div v-if="content" class="mb-5">
                                    <span class="block text-sm">
                                        Video link:
                                    </span>

                                    <a
                                        target="_blank"
                                        :href="content.file"
                                        class="link"
                                    >
                                        {{ content.file }}
                                    </a>
                                </div>

                                <template v-if="isFile(videoFile)">
                                    <div class="mb-2">
                                        <span class="text-sm">File name:</span>

                                        <p class="block truncate font-semibold">
                                            {{ getFileName(videoFile.name) }}
                                        </p>
                                    </div>

                                    <div class="mb-2">
                                        <span class="text-sm">File size:</span>

                                        <p class="font-semibold">
                                            {{
                                                useFormatFileSize(
                                                    videoFile.size
                                                )
                                            }}
                                        </p>
                                    </div>

                                    <div class="mb-5">
                                        <span class="text-sm">Duration:</span>

                                        <p class="font-semibold">
                                            {{ useFormatDuration(duration) }}
                                        </p>
                                    </div>
                                </template>
                            </div>

                            <div class="mb-4">
                                <h3 class="text-xl">Settings</h3>

                                <v-divider class="my-3"></v-divider>

                                <div
                                    class="mb-4 flex flex-wrap gap-x-10 gap-y-2"
                                >
                                    <v-checkbox
                                        v-model="requiresAuth"
                                        hide-details
                                        color="primary"
                                        density="comfortable"
                                        label="Disable for unregistered users"
                                    ></v-checkbox>

                                    <v-checkbox
                                        v-model="withAudio"
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
                                </div>

                                <div class="mb-4 flex gap-3">
                                    <v-btn
                                        type="submit"
                                        color="red"
                                        class="text-none w-fit"
                                        @click="changeVideo"
                                    >
                                        Change video
                                    </v-btn>

                                    <v-btn
                                        v-if="
                                            content &&
                                            defaultContent?.id !== content.id
                                        "
                                        type="submit"
                                        color="primary"
                                        class="text-none w-fit"
                                        @click="isDefaultContentDialog = true"
                                    >
                                        Set as default
                                    </v-btn>
                                </div>
                            </div>

                            <div class="mb-4">
                                <catalog-image-upload
                                    :background="imageSrc"
                                    :name="title"
                                    :error="errors.preview_image"
                                    :show-card="isShowCard"
                                    class="z-10"
                                    label="Select a file of background"
                                    @upload="selectPreviewImage"
                                    @remove="removeImage"
                                />
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Audios block -->
            <div class="w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload audio</h3>

                <drag-and-drop
                    :accept="[...acceptedAudios, ...acceptedVideos]"
                    multiple
                    :file-to-remove="audioToRemove"
                    :files-list="audioFiles"
                    class="mb-5"
                    @upload="selectAudioFiles"
                >
                    <template #icon>
                        <span class="mdi mdi-music text-6xl"></span>
                    </template>
                </drag-and-drop>

                <div v-if="audios?.length" class="grid gap-2">
                    <h4 class="mb-3 font-semibold">
                        Uploaded files
                        {{ `(${audios.length})` }}
                    </h4>

                    <div class="grid grid-cols-3 gap-3 max-tab:grid-cols-1">
                        <template v-if="!isAudiosLoading">
                            <div
                                v-for="(audio, i) in audios"
                                :key="i"
                                class="rounded bg-slate-600 p-4"
                            >
                                <audio
                                    preload="metadata"
                                    class="mb-2 w-full"
                                    controls
                                    :src="getSource(audio.file)"
                                ></audio>

                                <div class="space-y-4">
                                    <p class="mb-2">
                                        Audio name:
                                        <span class="flex min-h-8 items-center">
                                            <v-text-field
                                                v-if="
                                                    audioToEdit?.name ===
                                                    audio.name
                                                "
                                                v-model="audioEditableName"
                                                hide-details
                                                density="compact"
                                                variant="underlined"
                                            />

                                            <span v-else class="line-camp-1">
                                                {{ audio.name }}
                                            </span>

                                            <span
                                                v-ripple
                                                class="edit-icon"
                                                @click="
                                                    handleRenameAudio(audio)
                                                "
                                            >
                                                <v-icon
                                                    size="18"
                                                    :icon="
                                                        audioToEdit?.name ===
                                                        audio.name
                                                            ? 'mdi-cancel'
                                                            : 'mdi-pencil'
                                                    "
                                                />
                                            </span>

                                            <span
                                                v-if="
                                                    audioToEdit?.name ===
                                                    audio.name
                                                "
                                                v-ripple
                                                class="edit-icon"
                                                @click="
                                                    confirmAudioRename(audio)
                                                "
                                            >
                                                <v-icon
                                                    size="18"
                                                    :icon="'mdi-check'"
                                                />
                                            </span>
                                        </span>
                                    </p>

                                    <p>
                                        File size:
                                        {{ useFormatFileSize(audio.size) }}
                                    </p>

                                    <p>
                                        File duration:
                                        {{ useFormatDuration(audio.duration) }}
                                    </p>

                                    <v-btn
                                        type="submit"
                                        color="red"
                                        class="text-none w-fit"
                                        @click="removeAudioFile(audio)"
                                    >
                                        Remove
                                    </v-btn>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <v-skeleton-loader
                                v-for="i in audios.length"
                                :key="i"
                                class="h-64 w-full rounded"
                            />
                        </template>
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
                <p class="mb-5">Please select theme of the content</p>

                <v-select
                    v-model="topic"
                    label="Theme"
                    variant="outlined"
                    clearable
                    :items="topics"
                    :error-messages="errors.topic"
                    item-title="name"
                    return-object
                />
            </div>

            <div>
                <p class="mb-5">Please select language of the content</p>

                <v-select
                    v-model="languages"
                    multiple
                    label="Languages"
                    variant="outlined"
                    clearable
                    :error-messages="errors.languages"
                    item-title="name"
                    :loading="isLanguagesLoading"
                    :items="languagesList"
                    return-object
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

            <!-- HTML Editor -->
            <div class="mb-10">
                <p class="mb-5">Please enter a description (optional)</p>

                <content-editor v-model="description" />
            </div>

            <v-btn
                :loading="isLoading || isAudiosLoading"
                type="submit"
                color="primary"
                class="text-none w-fit"
            >
                {{ content ? 'Save changes' : 'Save' }}
            </v-btn>
        </form>

        <!-- Dialog for confirm -->
        <confirm-dialog
            v-model="isDefaultContentDialog"
            :loading="isConfirmLoading"
            title="Are you sure you want to set current video as default?"
            @confirm="setVideoAsDefault"
        />

        <!-- Dialog for feedback -->
        <feedback-dialog
            v-model="isFeedbackOpen"
            :success="isSuccess"
            :loading="isLoading"
            :loading-title="`Content is ${content ? `updating` : 'uploading'}...`"
            :success-title="`Content has been successfully ${content ? `updated` : 'uploaded'}`"
            @close="exit"
        />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
    import FeedbackDialog from '@/components/dialogs/FeedbackDialog.vue';
    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';
    import ContentEditor from '@/components/editor/ContentEditor.vue';
    import type { CreateFormEmits } from '@/components/forms/types';

    import { getDefaultContent } from '@/api/contents/get-default-content.api.ts';
    import { getLanguages } from '@/api/contents/get-languages.api.ts';
    import { postVideo } from '@/api/contents/post-video.api.ts';
    import { setDefaultContent } from '@/api/contents/set-default-content.api.ts';
    import { updateVideo } from '@/api/contents/update-video.api.ts';
    import { getFile } from '@/api/files/get-file.api.ts';
    import acceptedAudios from '@/constants/accepted-audios.ts';
    import acceptedVideos from '@/constants/accepted-videos.ts';
    import {
        useCompareArrays,
        useCompareObjects,
    } from '@/hooks/useCompareObjects.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import { useFormatDuration } from '@/hooks/useFormatDuration.ts';
    import { useFormatFileSize } from '@/hooks/useFormatFile.ts';
    import type { Audio, Identifiable } from '@/ts/common';
    import type { VideoContent } from '@/ts/contents';
    import { isFile } from '@/ts/guards/file.guard.ts';
    import { createContentSchema } from '@/validations/schemas/content.schema.ts';
    import type {
        ContentInput,
        CreateAudio,
        CreateContentSchema,
    } from '@/validations/types/content.validation';

    interface Props {
        topics: Identifiable[];
        content?: VideoContent | null;
    }

    const props = withDefaults(defineProps<Props>(), {
        topics: () => [],
    });

    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isContentSelected = ref(!!props.content);
    const isVideoLoaded = ref(false);
    const isLoading = ref(false);

    const defaultContent = ref<VideoContent>();
    const isConfirmLoading = ref(false);
    const isDefaultContentDialog = ref(false);
    const isFeedbackOpen = ref(false);
    const isSuccess = ref(false);

    const audioToEdit = ref<CreateAudio | null>(null);
    const audioEditableName = ref('');
    const audioToRemove = ref<File>();
    const audioFiles = ref<File[] | undefined>();
    const isAudiosLoading = ref(false);

    const isShowCard = ref(false);
    const isChangesDetected = ref(false);

    /**
     * Data for content sources
     */
    const imageSrc = ref('');

    const videoElement = ref<HTMLVideoElement | null>(null);
    const videoSrc = ref('');
    const duration = ref(0);

    const languagesList = ref<Identifiable[]>([]);
    const isLanguagesLoading = ref(true);

    /**
     * Define schema
     */
    const { defineField, values, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateContentSchema>({
            validationSchema: createContentSchema,
            initialValues: {
                audios: [],
                description: '',
                title: '',
                audio_enabled: false,
                narration_enabled: false,
                requires_auth: false,
            },
        });

    /**
     * Define fields for form
     */
    const [title] = defineField('title');
    const [description] = defineField('description');
    const [videoFile] = defineField('file');
    const [image] = defineField('preview_image');
    const [topic] = defineField('topic');
    const [languages] = defineField('languages');
    const [tags] = defineField('tags');
    const [audios] = defineField('audios');
    const [requiresAuth] = defineField('requires_auth');
    const [withAudio] = defineField('audio_enabled');
    const [withNarration] = defineField('narration_enabled');

    /*
     * Functions to manage audio
     */
    const loadAudioFiles = async () => {
        if (props.content?.audios && audios.value) {
            isAudiosLoading.value = true;

            audios.value = await Promise.all(
                audios.value.map(async (audio) => {
                    if (!isFile(audio.file)) {
                        const file = await getFile(audio.file);

                        if (file) {
                            audio.file = file;
                        }
                    }

                    return audio;
                })
            );

            audioFiles.value = audios.value.map((item) => item.file as File);

            isAudiosLoading.value = false;
        }
    };

    const confirmAudioRename = (audio: CreateAudio) => {
        audio.name = audioEditableName.value;
        audioToEdit.value = null;
    };

    const handleRenameAudio = (audio: CreateAudio) => {
        audioToEdit.value =
            audioToEdit.value?.name === audio.name ? null : { ...audio };

        audioEditableName.value = audio.name;
    };

    const getFileName = (name: string) => name.split('?')[0];

    /*
     * Fill existing data for content
     */
    const setExistingContent = async () => {
        // Set existing values to form
        setValues(
            useExcludeProperties({ ...props.content }, [
                'id',
                'date_created',
                'tags',
                'audios',
                'languages',
            ])
        );

        if (props.content?.file) {
            videoSrc.value = props.content.file;
        }

        if (props.content?.preview_image) {
            imageSrc.value = props.content.preview_image;
        }

        if (props.content?.languages) {
            languages.value = props.content.languages;
        }

        if (props.content?.tags) {
            tags.value = props.content.tags.split(', ');
        }

        if (props.content?.audios) {
            audios.value = [...props.content.audios];

            await loadAudioFiles();
        }
    };

    const getSource = (file: File | string) =>
        isFile(file) ? URL.createObjectURL(file) : file;

    /*
     * Functions to manage video
     */
    const loadVideoInfo = () => {
        if (videoElement.value) {
            duration.value = videoElement.value.duration;
            isVideoLoaded.value = true;
        }
    };

    const loadDefaultContent = async () => {
        if (props.content) {
            defaultContent.value = await getDefaultContent();
        }
    };

    const changeVideo = () => {
        videoSrc.value = '';
        isContentSelected.value = false;
    };

    const setVideoAsDefault = async () => {
        if (props.content) {
            isConfirmLoading.value = true;

            try {
                await setDefaultContent(props.content.id);

                toast.error('Content is default now');
            } catch (e) {
                toast.error('Content is not default');
            } finally {
                isConfirmLoading.value = false;
                isDefaultContentDialog.value = false;
            }
        }
    };

    /*
     * Functions for file selection
     */
    const selectVideoFile = (file: File[] | File) => {
        if (!Array.isArray(file)) {
            videoFile.value = file;
            videoSrc.value = getSource(file);

            isContentSelected.value = true;
        }
    };

    const selectAudioFiles = (files: File[] | File) => {
        if (Array.isArray(files)) {
            files.forEach((item) => {
                const audio = new Audio(getSource(item));

                audio.addEventListener('loadedmetadata', () => {
                    audios.value?.push({
                        name: item.name,
                        size: item.size,
                        duration: audio.duration,
                        file: item,
                    });
                });
            });
        }
    };

    const selectPreviewImage = (file: File[] | File) => {
        if (!Array.isArray(file)) {
            image.value = file;
            imageSrc.value = getSource(file);
        }
    };

    /*
     * Remove operations
     */
    const removeVideoFile = () => {
        videoFile.value = '';
        isContentSelected.value = false;
    };

    const removeImage = () => {
        imageSrc.value = '';
        image.value = '';
        isShowCard.value = false;
    };

    const removeAudioFile = (audio: CreateAudio | Audio) => {
        isWatching = false;

        audioToRemove.value = audio.file as File;

        audios.value = audios.value?.filter((item) => item.file !== audio.file);
        audioFiles.value = audioFiles.value?.filter(
            (item) => isFile(audio.file) && item.name !== audio.file.name
        );
    };

    /*
     * Loading data for selection
     */
    const loadLanguages = async () => {
        try {
            const items = (await getLanguages()) ?? [];

            if (items.length > 0) {
                languagesList.value = items.map((item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                });
            }
        } finally {
            isLanguagesLoading.value = false;
        }
    };

    /*
     * Detect changes
     */
    let isWatching = true;

    // TODO: finish prevent reload functionality
    watch(values, (value) => {
        if (
            isWatching &&
            (value.audios?.length ||
                value.description ||
                value.file ||
                value.title)
        ) {
            isChangesDetected.value = true;
        }
    });

    const exit = () => {
        emits('close');
        emits('update');
    };

    const getIds = (array: Identifiable[]) => array.map((item) => item.id);

    const getUpdatedContent = (body: ContentInput) => {
        if (props.content) {
            /**
             * Check changes in form except of: audios, languages
             */
            const updateBody: ContentInput = useCompareObjects(
                {
                    ...props.content,
                    topic: props.content.topic.id,
                },
                body
            ) as ContentInput;

            /**
             * Check changes in audios
             */
            if (props.content.audios) {
                const editedAudios = values.audios?.filter(
                    (audio) => !audio.hasOwnProperty('id')
                );

                if (
                    (values.audios &&
                        values.audios.length !== props.content.audios.length) ||
                    editedAudios?.length
                ) {
                    updateBody.audios = values.audios;
                }
            }

            /**
             * Check changes in languages
             */
            const isLanguagesChanged = useCompareArrays(
                getIds(languages.value),
                getIds(props.content.languages)
            );

            if (isLanguagesChanged) {
                updateBody.languages = getIds(languages.value);
            }

            /**
             * Check changes in video file
             */
            if (isFile(values.file)) {
                updateBody.file = values.file;
            }

            /**
             * Check changes in image file
             */
            if (isFile(values.preview_image)) {
                updateBody.preview_image = values.preview_image;
            }

            return updateBody;
        }
    };

    /*
     * Submit create/update operation for the content
     */
    const onSubmit = handleSubmit(async (values) => {
        const body = {
            ...values,
            file: videoFile.value as File,
            duration: Math.round(duration.value),
            languages: getIds(languages.value),
            tags: tags.value?.join(', '),
            topic: topic.value.id,
            preview_image: image.value as File,
            audios: audios.value,
        };

        try {
            if (props.content) {
                const updatedBody = getUpdatedContent(body);

                if (updatedBody && Object.keys(updatedBody).length > 0) {
                    isFeedbackOpen.value = true;
                    isLoading.value = true;

                    await updateVideo(props.content.id, updatedBody);
                } else {
                    toast.error('No changes were captured');
                }
            } else {
                isFeedbackOpen.value = true;
                isLoading.value = true;

                await postVideo({
                    ...body,
                    date_created: new Date().toISOString(),
                });

                resetForm();
            }

            isSuccess.value = true;
            isWatching = false;
        } catch (e) {
            isFeedbackOpen.value = false;

            if (props.content) {
                toast.error('Content was not updated');
            } else {
                toast.error('Content was not uploaded');
            }
        } finally {
            isLoading.value = false;
        }
    });

    const preventReload = (event: Event) => {
        if (isChangesDetected.value) {
            event.preventDefault();
        }
    };

    onMounted(async () => {
        window.addEventListener('beforeunload', preventReload);

        await loadLanguages();
        await loadDefaultContent();

        if (props.content) {
            await setExistingContent();
        }
    });

    onUnmounted(() => {
        window.removeEventListener('beforeunload', preventReload);
    });
</script>

<style scoped lang="postcss">
    .link {
        @apply block truncate text-sm font-semibold text-primary-50 underline transition-colors hover:text-primary-100;
    }

    .edit-icon {
        @apply ml-2 flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-grey-200;
    }
</style>
