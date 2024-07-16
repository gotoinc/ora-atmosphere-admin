<template>
    <div class="h-full pb-12">
        <div class="mb-5 w-full gap-4">
            <div class="mb-5 w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload video</h3>

                <drag-and-drop
                    v-if="!videoSrc && !isContentSelected"
                    :error="!!errors.file"
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
                            v-if="isVideoLoaded"
                            ref="videoElement"
                            class="h-full w-full rounded-lg object-cover"
                            controls
                            crossorigin="anonymous"
                            @loadedmetadata="loadVideoInfo"
                        >
                            <source
                                :type="videoType"
                                :src="videoSrc ?? content?.file"
                            />
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

                                <div v-else-if="uploadedVideoFile" class="mb-2">
                                    <span class="text-sm">File name:</span>

                                    <p class="block truncate font-semibold">
                                        {{ uploadedVideoFile.name }}
                                    </p>
                                </div>

                                <div class="mb-2">
                                    <span class="text-sm">File size:</span>

                                    <p class="font-semibold">
                                        {{ useFormatFileSize(videoSize) }}
                                    </p>
                                </div>

                                <div class="mb-5">
                                    <span class="text-sm">Duration:</span>

                                    <p class="font-semibold">
                                        {{ useFormatDuration(duration) }}
                                    </p>
                                </div>
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
                                        @click="isDialogOpen = true"
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

                <div v-if="audios?.length" class="grid gap-2">
                    <h4 class="mb-3 font-semibold">
                        Uploaded files
                        {{ `(${audios.length})` }}
                    </h4>

                    <div class="grid grid-cols-3 gap-3 max-tab:grid-cols-1">
                        <div
                            v-for="(audio, i) in audios"
                            :key="i"
                            class="rounded bg-slate-600 p-4"
                        >
                            <span
                                v-if="!isFile(audio)"
                                class="mb-4 inline-flex items-center rounded-full bg-grey-300 px-3 py-1 text-sm"
                            >
                                Active
                                <v-icon
                                    class="ml-1"
                                    size="20"
                                    icon="mdi-check-circle-outline"
                                    color="green"
                                />
                            </span>

                            <audio
                                preload="metadata"
                                class="mb-2 w-full"
                                controls
                                :src="getSource(audio.file)"
                            ></audio>

                            <div class="space-y-4">
                                <p class="mb-2">
                                    File name
                                    <span class="line-camp-1">
                                        {{ audio.name }}
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
                                    @click="removeAudioFile(audio.name)"
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
                    :loading="isTopicsLoading"
                    :items="topics"
                    :error-messages="errors.topic"
                    item-title="name"
                    return-object
                />
            </div>

            <div>
                <p class="mb-5">Please select language of the content</p>

                <v-select
                    v-model="language"
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

            <v-btn
                :loading="isLoading"
                type="submit"
                color="primary"
                class="text-none w-fit"
            >
                {{ content ? 'Save changes' : 'Save' }}
            </v-btn>
        </form>

        <!-- Dialog for confirm -->
        <v-dialog v-model="isDialogOpen" max-width="400">
            <div class="rounded-lg bg-dark p-7 text-center shadow-2xl">
                <h3 class="mb-5 text-xl font-semibold">
                    Are you sure you want to set current video as default?
                </h3>

                <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                    <v-btn
                        color="primary"
                        variant="outlined"
                        class="text-none flex-grow"
                        @click="isDialogOpen = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        :loading="isConfirmLoading"
                        class="text-none flex-grow"
                        color="primary"
                        @click="setVideoAsDefault"
                    >
                        Yes
                    </v-btn>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';
    import type { CreateFormEmits } from '@/components/forms/types';

    import { getTopics } from '@/api/catalog/topics/get-topics.api.ts';
    import { getDefaultContent } from '@/api/contens/get-default-content.api.ts';
    import { getBlobFile } from '@/api/contens/get-file.api.ts';
    import { getLanguages } from '@/api/contens/get-languages.api.ts';
    import { postVideo } from '@/api/contens/post-video.api.ts';
    import { setDefaultContent } from '@/api/contens/set-default-content.api.ts';
    import { updateVideo } from '@/api/contens/update-video.api.ts';
    import { useCaptureImage } from '@/hooks/useCaptureImage.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { useFormatDuration } from '@/hooks/useFormatDuration.ts';
    import { useFormatFileSize } from '@/hooks/useFormatFileSize.ts';
    import { useThrowError } from '@/hooks/useThrowError.ts';
    import type { Identifiable } from '@/ts/common';
    import type { VideoContent } from '@/ts/contents';
    import { isFile } from '@/ts/guards/file.guard.ts';
    import { createContentSchema } from '@/validations/schemas/content.schema.ts';
    import type {
        AudioInput,
        CreateContentSchema,
    } from '@/validations/types/content.validation';

    const props = defineProps<{ content?: VideoContent | null }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isContentSelected = ref(!!props.content);
    const isVideoLoaded = ref(!props.content);
    const isLoading = ref(false);

    const defaultContent = ref<VideoContent>();
    const isConfirmLoading = ref(false);
    const isDialogOpen = ref(false);

    const isShowCard = ref(false);
    const isChangesDetected = ref(false);

    /**
     * Define schema
     */
    const { defineField, values, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateContentSchema>({
            validationSchema: createContentSchema,
            initialValues: {
                audios: [],
                description: '',
                audio_enabled: false,
                narration_enabled: false,
                requires_auth: false,
            },
        });

    const [title] = defineField('title');
    const [description] = defineField('description');
    const [videoFile] = defineField('file');
    const [image] = defineField('preview_image');
    const [topic] = defineField('topic');
    const [language] = defineField('languages');
    const [tags] = defineField('tags');
    const [audios] = defineField('audios');
    const [requiresAuth] = defineField('requires_auth');
    const [withAudio] = defineField('audio_enabled');
    const [withNarration] = defineField('narration_enabled');

    /**
     * Data for content sources
     */
    const uploadedVideoFile = ref<File | null>(null);
    const imageSrc = ref('');
    const initialImageSrc = ref('');

    const videoElement = ref<HTMLVideoElement | null>(null);
    const videoSrc = ref('');
    const videoSize = ref(0);
    const videoType = ref('');
    const duration = ref(0);

    /**
     * Define fields for form
     */
    const topics = ref<Identifiable[]>([]);
    const isTopicsLoading = ref(true);

    const languagesList = ref<Identifiable[]>([]);
    const isLanguagesLoading = ref(true);

    /*
     * Fill existing data for content
     */
    if (props.content) {
        if (props.content.audios) {
            audios.value = props.content.audios;
        }

        if (props.content.preview_image) {
            isShowCard.value = true;
            imageSrc.value = props.content.preview_image;
        }

        if (props.content.tags) {
            tags.value = props.content.tags.split(', ');
        }

        // Set existing values to form
        setValues(
            useExcludeProperties({ ...props.content }, [
                'id',
                'date_created',
                'languages',
                'tags',
                'audios',
            ])
        );
    }

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

    const onVideoCapture = async () => {
        if (videoElement.value instanceof HTMLVideoElement) {
            try {
                const src = useCaptureImage(videoElement.value);

                if (src) {
                    imageSrc.value = src;
                    initialImageSrc.value = src;

                    const blob = await getBlobFile(src);

                    if (blob) {
                        image.value = new File([blob], 'preview.jpg', {
                            type: 'image/jpg',
                            lastModified: new Date().getTime(),
                        });
                    }
                }
            } catch (e) {
                useThrowError(e);
            }

            duration.value = videoElement.value.duration;
        }
    };

    const changeVideo = () => {
        videoSrc.value = '';
        isContentSelected.value = false;
    };

    const loadVideoFile = async () => {
        if (props.content) {
            try {
                const res = await getBlobFile(props.content.file);

                if (res) {
                    videoSrc.value = URL.createObjectURL(res);
                    videoType.value = res.type;
                    videoSize.value = res.size;
                }
            } finally {
                isVideoLoaded.value = true;
            }
        }
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
                isDialogOpen.value = false;
            }
        }
    };

    /*
     * Functions for file selection
     */
    const selectVideoFile = (files: UploadableFile[]) => {
        const { file, name } = files[0];

        uploadedVideoFile.value = file;
        videoFile.value = name;
        videoType.value = file.type;
        videoSize.value = file.size;

        videoSrc.value = getSource(file);
    };

    const selectAudioFiles = (files: UploadableFile[]) => {
        files.forEach((item) => {
            const isFileExist = audios.value?.some(
                (file) => item.name === file.name
            );

            if (!isFileExist) {
                const audio = new Audio(getSource(item.file));

                audio.addEventListener('loadedmetadata', () => {
                    audios.value?.push({
                        name: item.file.name,
                        size: item.file.size,
                        duration: audio.duration,
                        file: item.file,
                    });
                });
            }
        });
    };

    const selectPreviewImage = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            image.value = value[0].file;
            imageSrc.value = getSource(value[0].file);
        }
    };

    /*
     * Remove operations
     */
    const removeVideoFile = () => {
        uploadedVideoFile.value = null;
        videoFile.value = '';
    };

    const removeImage = () => {
        imageSrc.value = '';
        image.value = '';
        isShowCard.value = false;
    };

    const removeAudioFile = (fileName: string) => {
        audios.value = audios.value?.filter((file) => file.name !== fileName);
    };

    /*
     * Loading data for selection
     */
    const loadTopics = async () => {
        try {
            const items = (await getTopics()) ?? [];

            if (items.length > 0) {
                topics.value = items.map((item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                });
            }
        } finally {
            isTopicsLoading.value = false;
        }
    };

    const loadLanguages = async () => {
        try {
            languagesList.value = (await getLanguages()) ?? [];
        } finally {
            isLanguagesLoading.value = false;
        }
    };

    watch(values, (value) => {
        if (
            value.audios?.length ||
            value.description ||
            value.file ||
            value.title ||
            value.languages.id ||
            value.topic.id
        ) {
            isChangesDetected.value = true;
        }
    });

    /*
     * Submit create/update operation for the content
     */
    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;

        if (!image.value) {
            await onVideoCapture();
        }

        const body = {
            ...values,
            file: uploadedVideoFile.value as File,
            duration: Math.round(duration.value),
            languages: [language.value.id],
            tags: tags.value?.join(', '),
            topic: topic.value.id,
            preview_image: image.value as File,
            // TODO: transform audios to file
            audios: audios.value as AudioInput[],
        };

        try {
            if (props.content) {
                await updateVideo(props.content.id, body);

                toast.success('Content has been successfully updated');
            } else {
                await postVideo({
                    ...body,
                    date_created: new Date().toISOString(),
                });

                toast.success('Content has been successfully uploaded');
            }

            emits('update');
            emits('close');

            resetForm();
        } catch (e) {
            if (props.content) {
                toast.error('Content is not updated');
            } else {
                toast.error('Content is not uploaded');
            }
        } finally {
            isLoading.value = false;
        }
    });

    void loadVideoFile();
    void loadTopics();
    void loadLanguages();
    void loadDefaultContent();

    const preventReload = (event: Event) => {
        if (isChangesDetected.value) {
            event.preventDefault();
        }
    };

    onMounted(() => {
        window.addEventListener('beforeunload', preventReload);
    });

    onUnmounted(() => {
        window.removeEventListener('beforeunload', preventReload);
    });
</script>

<style scoped lang="postcss">
    .link {
        @apply block truncate text-sm font-semibold text-primary-50 underline transition-colors hover:text-primary-100;
    }
</style>
