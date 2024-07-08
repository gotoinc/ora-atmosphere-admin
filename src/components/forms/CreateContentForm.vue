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
                            ref="videoElement"
                            class="h-full w-full object-cover"
                            controls
                            @loadedmetadata="loadVideoInfo"
                        >
                            <source :src="videoSrc ?? content?.file" />
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
                                    :href="content.file"
                                    class="block truncate text-sm font-semibold text-primary-50 underline transition-colors hover:text-primary-100"
                                >
                                    {{ content.file }}
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

                                <v-checkbox
                                    v-model="isShowContentOnBanner"
                                    hide-details
                                    color="primary"
                                    density="comfortable"
                                    label="Show video on main banner by default"
                                ></v-checkbox>
                            </div>
                        </div>

                        <div class="mb-4">
                            <catalog-image-upload
                                :background="imageSrc"
                                :name="title"
                                :show-card="isShowCard"
                                class="z-10"
                                label="Select a file of background (optional)"
                                @upload="selectPreviewImage"
                                @remove="removeImage"
                            />
                        </div>

                        <div class="flex justify-end gap-3">
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
                    :file-to-remove="audioToRemove"
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

                    <div class="grid grid-cols-3 gap-3 max-tab:grid-cols-1">
                        <div
                            v-for="(audio, i) in audioFiles"
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
                                :src="getSource(audio)"
                            ></audio>

                            <div class="space-y-4">
                                <h5 class="mb-2">
                                    File name:
                                    <span class="line-camp-1">
                                        {{ isFile(audio) ? audio.name : audio }}
                                    </span>
                                </h5>

                                <p v-if="isFile(audio)">
                                    File size:
                                    {{ useFormatFileSize(audio.size) }}
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
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';
    import type { CreateFormEmits } from '@/components/forms/types';

    import { getTopics } from '@/api/catalog/topics/get-topics.api.ts';
    import { getLanguages } from '@/api/contens/get-languages.api.ts';
    import { postVideo } from '@/api/contens/post-video.api.ts';
    import { updateVideo } from '@/api/contens/update-video.api.ts';
    import { useCaptureImage } from '@/hooks/useCaptureImage.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { useFormatFileSize } from '@/hooks/useFormatFileSize.ts';
    import { useFormatVideoDuration } from '@/hooks/useFormatVideoDuration.ts';
    import type { Identifiable } from '@/ts/common';
    import type { VideoContent } from '@/ts/contents';
    import { createContentSchema } from '@/validations/schemas/content.schema.ts';
    import type { CreateContentSchema } from '@/validations/types/content.validation';

    const props = defineProps<{ content?: VideoContent | null }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isContentSelected = ref(!!props.content);
    const isVideoLoaded = ref(!!props.content);
    const isLoading = ref(false);

    const isShowCard = ref(false);

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateContentSchema>({
            validationSchema: createContentSchema,
            initialValues: {
                audios: [],
            },
        });

    /**
     * Data for content sources
     */
    const uploadedVideoFile = ref<File | null>(null);
    const videoSrc = ref(props.content?.file ?? '');
    const imageSrc = ref('');
    const initialImageSrc = ref('');

    const audioFiles = ref<Set<File | string>>(new Set());
    const audioUploadables = ref<Set<UploadableFile>>(new Set());
    const audioToRemove = ref<UploadableFile>();

    const videoElement = ref<HTMLVideoElement | null>(null);
    const duration = ref(0);

    /**
     * Define fields for form
     */
    const topics = ref();
    const isTopicsLoading = ref(true);

    const languagesList = ref<Identifiable[]>([]);
    const isLanguagesLoading = ref(true);

    const [title] = defineField('title');
    const [description] = defineField('description');
    const [videoFile] = defineField('file');
    const [image] = defineField('image');
    const [topic] = defineField('topic');
    const [language] = defineField('languages');
    const [tags] = defineField('tags');
    const [audios] = defineField('audios');
    const [requiresAuth] = defineField('requires_auth');
    const [withAudio] = defineField('audio_enabled');
    const [withNarration] = defineField('narration_enabled');
    const [isShowContentOnBanner] = defineField('show_on_main_banner');

    if (props.content) {
        if (props.content.audios) {
            audioFiles.value = new Set(
                props.content.audios.map((item) => item.file)
            );
        }

        tags.value = props.content.tags?.split(', ');

        // Set existing values to form
        setValues(
            useExcludeProperties({ ...props.content }, [
                'id',
                'date_created',
                'image',
                'languages',
                'audios',
                'tags',
            ])
        );

        image.value = '';
    }

    const getSource = (file: File | string) =>
        isFile(file) ? URL.createObjectURL(file) : file;

    const isFile = (file: File | string): file is File =>
        typeof file !== 'string';

    const selectVideoFile = (files: UploadableFile[]) => {
        uploadedVideoFile.value = files[0].file;
        videoFile.value = files[0].name;

        videoSrc.value = getSource(uploadedVideoFile.value);

        image.value = '';
    };

    const selectAudioFiles = (files: UploadableFile[]) => {
        files.forEach((item) => {
            if (!audioUploadables.value.has(item)) {
                audioUploadables.value.add(item);

                audioFiles.value.add(item.file);

                const audio = new Audio(getSource(item.file));

                audio.addEventListener('loadedmetadata', () => {
                    audios.value?.push({
                        file: item.file,
                        name: item.name,
                        size: item.file.size,
                        duration: Math.round(audio.duration),
                    });
                });
            }
        });
    };

    const loadVideoInfo = () => {
        if (videoElement.value) {
            duration.value = videoElement.value.duration;

            isVideoLoaded.value = true;
        }
    };

    const onVideoCapture = () => {
        if (videoElement.value) {
            const src = useCaptureImage(videoElement.value as HTMLVideoElement);

            if (src) {
                imageSrc.value = src;
                initialImageSrc.value = src;
            }

            duration.value = videoElement.value.duration;
        }
    };

    const selectPreviewImage = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            image.value = value[0].file;
            imageSrc.value = URL.createObjectURL(value[0].file);
        }
    };

    const changeVideo = () => {
        videoSrc.value = '';
        isContentSelected.value = false;
    };

    const removeVideoFile = () => {
        uploadedVideoFile.value = null;
        videoFile.value = '';
    };

    const removeImage = () => {
        imageSrc.value = '';
        image.value = '';
        isShowCard.value = false;
    };

    const removeAudioFile = (file: File | string) => {
        for (const item of audioUploadables.value) {
            if (item.file === file) {
                audioToRemove.value = item;
            }
        }

        if (audioToRemove.value)
            audioUploadables.value.delete(audioToRemove.value);

        audioFiles.value.delete(file);
    };

    const onSubmit = handleSubmit(async (values) => {
        isLoading.value = true;

        if (!image.value && !props.content) {
            onVideoCapture();
        }

        const body = {
            ...values,
            file: uploadedVideoFile.value as File,
            duration: Math.round(duration.value),
            languages: language.value.id,
            tags: tags.value?.join(', '),
            topic: topic.value.id,
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

    onMounted(async () => {
        try {
            topics.value = (await getTopics()) ?? [];
        } finally {
            isTopicsLoading.value = false;
        }

        try {
            languagesList.value = (await getLanguages()) ?? [];
        } finally {
            isLanguagesLoading.value = false;
        }
    });
</script>

<style scoped></style>
