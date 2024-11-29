<template>
    <div class="h-full pb-12">
        <div class="mb-5 w-full gap-4">
            <div class="mb-5 w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload video</h3>

                <drag-and-drop
                    :error="!!errors.video_files"
                    :accept="acceptedVideos"
                    multiple
                    :files-list="videoFiles"
                    :file-to-remove="videoToRemove"
                    class="mb-5"
                    @upload="selectVideoFiles"
                >
                    <template #icon>
                        <span class="mdi mdi-video-vintage text-6xl"></span>
                    </template>
                </drag-and-drop>

                <!-- Video block -->
                <div>
                    <div v-if="videos.length > 0">
                        <h4 class="mb-2 font-semibold">
                            Uploaded files
                            {{ `(${videos.length})` }}
                        </h4>

                        <p
                            v-if="videoWithErrors.length > 0"
                            class="fade-b mb-3 text-error"
                        >
                            Please select language for each files
                        </p>

                        <div class="grid grid-cols-3 gap-3 max-tab:grid-cols-1">
                            <template v-if="!isVideosLoading">
                                <file-source-card
                                    v-for="(video, i) in videos"
                                    :key="i"
                                    :data="video"
                                    media-type="video"
                                    :languages-list="languagesList"
                                    :is-languages-loading="isLanguagesLoading"
                                    @remove-video="removeVideoFile"
                                    @change-language="updateVideoLanguage"
                                    @duration-loaded="(num) => (duration = num)"
                                />
                            </template>

                            <template v-else>
                                <v-skeleton-loader
                                    v-for="i in videos.length"
                                    :key="i"
                                    class="h-64 w-full rounded"
                                />
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Audios block -->
            <div class="w-full rounded bg-grey-400 p-4">
                <h3 class="mb-5 text-lg font-semibold">Upload audio</h3>

                <v-tooltip
                    :open-on-hover="videos.length > 1"
                    location="top center"
                    origin="overlap"
                >
                    <template #activator="{ props: tooltipProps }">
                        <div v-bind="tooltipProps">
                            <drag-and-drop
                                :accept="acceptedAudios"
                                multiple
                                :file-to-remove="audioToRemove"
                                :files-list="audioFiles"
                                class="mb-5"
                                :disable="videos.length > 1"
                                @upload="selectAudioFiles"
                            >
                                <template #icon>
                                    <span class="mdi mdi-music text-6xl"></span>
                                </template>
                            </drag-and-drop>
                        </div>
                    </template>

                    <span class="text-base">
                        Audio files are unavailable if more than one video is
                        uploaded
                    </span>
                </v-tooltip>

                <div
                    v-if="audios?.length && videos.length < 2"
                    class="grid gap-2"
                >
                    <h4 class="mb-2 font-semibold">
                        Uploaded files
                        {{ `(${audios.length})` }}
                    </h4>

                    <p
                        v-if="audioWithErrors.length > 0"
                        class="fade-b mb-3 text-error"
                    >
                        Please select language for each files
                    </p>

                    <div class="grid grid-cols-3 gap-3 max-tab:grid-cols-1">
                        <template v-if="!isAudiosLoading">
                            <file-source-card
                                v-for="(audio, i) in audios"
                                :key="i"
                                media-type="audio"
                                :languages-list="languagesList"
                                :is-languages-loading="isLanguagesLoading"
                                :data="audio"
                                @remove-audio="removeAudioFile"
                                @change-language="updateAudioLanguage"
                            />
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

        <div class="mb-5">
            <h3 class="text-xl">Settings</h3>

            <v-divider class="my-3"></v-divider>

            <div class="mb-4 flex flex-wrap gap-x-10 gap-y-2">
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

            <div class="mb-5">
                <v-btn
                    v-if="content && defaultContent?.id !== content.id"
                    type="submit"
                    color="primary"
                    class="text-none w-fit"
                    @click="isDefaultContentDialog = true"
                >
                    Set as default
                </v-btn>
            </div>
        </div>

        <div class="mb-5">
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
                <p class="mb-5">Tags</p>

                <v-combobox
                    v-model="tags"
                    multiple
                    label="Tags"
                    variant="outlined"
                    @update:model-value="splitTags"
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

                <v-tabs
                    v-model="tabDescription"
                    class="mb-5 border-b border-white"
                >
                    <v-tab rounded class="text-none" color="white" :value="1">
                        Editor
                    </v-tab>

                    <v-tab rounded class="text-none" color="white" :value="2">
                        Plain HTML
                    </v-tab>
                </v-tabs>

                <content-editor
                    v-if="tabDescription === 1"
                    v-model="description"
                />

                <v-textarea
                    v-if="tabDescription === 2"
                    v-model="descriptionHTML"
                    name="description"
                    label="Paste HTML"
                    auto-grow
                    type="name"
                    variant="outlined"
                />
            </div>

            <v-btn
                :loading="isLoading || isAudiosLoading || isVideosLoading"
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
    import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import FileSourceCard from '@/components/cards/FileSourceCard.vue';
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
    import acceptedAudios from '@/constants/accepted-audios.ts';
    import acceptedVideos from '@/constants/accepted-videos.ts';
    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import { getSource } from '@/hooks/useGetSource.ts';
    import { useThrowError } from '@/hooks/useThrowError.ts';
    import type { Audio, Identifiable, VideoFile } from '@/ts/common';
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

    const isLoading = ref(false);

    const tabDescription = ref(1);
    const descriptionHTML = ref('');

    const defaultContent = ref<VideoContent>();
    const isConfirmLoading = ref(false);
    const isDefaultContentDialog = ref(false);
    const isFeedbackOpen = ref(false);
    const isSuccess = ref(false);

    const audioToRemove = ref<File>();
    const videoToRemove = ref<File>();
    const videoIdsToRemove = ref<number[]>([]);
    const audioFiles = ref<File[] | undefined>();
    const videoFiles = ref<File[] | undefined>();
    const isAudiosLoading = ref(false);
    const isVideosLoading = ref(false);

    const isShowCard = ref(false);
    const isChangesDetected = ref(false);

    /**
     * Data for content sources
     */
    const imageSrc = ref('');

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
                video_files: [],
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
    const [videos] = defineField('video_files');
    const [image] = defineField('preview_image');
    const [topic] = defineField('topic');
    const [tags] = defineField('tags');
    const [audios] = defineField('audios');
    const [requiresAuth] = defineField('requires_auth');
    const [withAudio] = defineField('audio_enabled');
    const [withNarration] = defineField('narration_enabled');

    const audioWithErrors = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return audios.value?.filter((audio) => !audio.language.id) ?? [];
    });

    const videoWithErrors = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return videos.value.filter((video) => !video.language.id) ?? [];
    });

    const splitTags = (items: string[]) => {
        tags.value = items.map((tag) => tag.split(',')).flat();
    };

    /*
     * Functions to manage audio
     */
    const updateAudioLanguage = (
        data: CreateAudio | VideoFile,
        language: Identifiable
    ) => {
        if (audios.value) {
            audios.value.forEach((item) => {
                if (item.file === data.file) {
                    item.language = { ...language };
                }
            });
        }
    };

    /*
     * Fill existing data for content
     */
    const setExistingContent = () => {
        // Set existing values to form
        setValues(
            useExcludeProperties({ ...props.content }, [
                'id',
                'date_created',
                'tags',
                'audios',
            ])
        );

        if (props.content) {
            if (props.content.preview_image) {
                imageSrc.value = props.content.preview_image;
            }

            if (props.content.tags) {
                tags.value = props.content.tags.split(', ');
            }

            if (props.content.video_files.length < 2 && props.content.audios) {
                audios.value = [...props.content.audios];
            }

            videos.value = [...props.content.video_files];
        }
    };

    /*
     * Functions to manage video
     */
    const loadDefaultContent = async () => {
        if (props.content) {
            defaultContent.value = await getDefaultContent();
        }
    };

    const updateVideoLanguage = (data: VideoFile, language: Identifiable) => {
        videos.value.forEach((item) => {
            if (item.file === data.file) {
                item.language = { ...language };
            }
        });
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
    const selectVideoFiles = (files: File[] | File) => {
        if (Array.isArray(files)) {
            files.forEach((item) => {
                videos.value.push({
                    file: item,
                    language: languagesList.value[0],
                });
            });
        }
    };

    const selectAudioFiles = (files: File[] | File) => {
        if (Array.isArray(files)) {
            files.forEach((item) => {
                const audio = new Audio(getSource(item));

                audio.addEventListener('loadedmetadata', () => {
                    audios.value?.push({
                        size: item.size,
                        duration: audio.duration,
                        file: item,
                        language: languagesList.value[0],
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
    const removeImage = () => {
        imageSrc.value = '';
        image.value = '';
        isShowCard.value = false;
    };

    const removeVideoFile = (video: VideoFile) => {
        isWatching = false;

        if (video.id) videoIdsToRemove.value.push(video.id);

        videoToRemove.value = video.file as File;
        videos.value = videos.value.filter((item) =>
            video.id ? video.id !== item.id : item.file !== video.file
        );

        if (videos.value.length < 2 && props.content?.audios) {
            audios.value = [...props.content.audios];
        }
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

    watch(values, (value) => {
        if (
            isWatching &&
            (value.audios?.length ||
                value.description ||
                value.video_files.length ||
                value.title)
        ) {
            isChangesDetected.value = true;
        }
    });

    const exit = () => {
        emits('close');
        emits('update');
    };

    const getUpdatedContent = (body: ContentInput) => {
        if (props.content) {
            /**
             * Check changes in form except of: audios, videos
             */
            const excluded = useExcludeProperties({ ...props.content }, [
                'duration',
                'audio_enabled',
                'requires_auth',
                'narration_enabled',
                'title',
                'description',
                'tags',
            ]);

            const updateBody: ContentInput = useCompareObjects(
                {
                    ...excluded,
                    topic: props.content.topic.id,
                },
                body
            ) as ContentInput;

            /**
             * Check changes in audios
             */
            const newAudios = values.audios?.filter((audio) => !audio.id);

            if (newAudios?.length) updateBody.audios = newAudios;

            /**
             * Check changes in videos
             */
            const newVideos = values.video_files.filter((video) => !video.id);

            if (newVideos.length > 0) updateBody.new_video_files = newVideos;

            if (videoIdsToRemove.value.length > 0) {
                updateBody.video_files_to_delete = videoIdsToRemove.value;
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
            duration: Math.round(duration.value),
            tags: tags.value?.join(', '),
            topic: topic.value.id,
            preview_image: image.value as File,
        };

        if (tabDescription.value === 2) {
            body.description = descriptionHTML.value;
        }

        if (values.video_files.length < 2) {
            body.audios = audios.value;
        }

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

            useThrowError(e);
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
            setExistingContent();
        }
    });

    onUnmounted(() => {
        window.removeEventListener('beforeunload', preventReload);
    });
</script>

<style scoped lang="postcss"></style>
