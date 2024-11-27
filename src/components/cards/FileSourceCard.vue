<template>
    <div class="flex flex-col rounded bg-slate-600 p-4">
        <audio
            v-if="mediaType === 'audio'"
            ref="audioElement"
            preload="metadata"
            class="w-full"
            controls
            :src="getSource(data.file)"
            @loadedmetadata="loadAudiosMetadata"
        ></audio>

        <video
            v-else
            ref="videoElement"
            class="h-48 w-full rounded-lg object-cover"
            controls
            playsinline
            crossorigin="anonymous"
            @loadedmetadata="loadVideoMetadata"
        >
            <source :src="getVideoSrc(data.file)" />
        </video>

        <div class="mt-4 flex-grow space-y-4">
            <template v-if="isFile(data.file)">
                <div>
                    <span> File name:</span>

                    <p class="block truncate font-semibold">
                        {{ getFileName(data.file.name) }}
                    </p>
                </div>

                <p>
                    File size:
                    {{ useFormatFileSize(data.file.size) }}
                </p>
            </template>

            <p v-else>
                <span class="capitalize">{{ mediaType }}</span> link:

                <a target="_blank" :href="data.file" class="link">
                    {{ data.file }}
                </a>
            </p>

            <p>
                File duration:
                {{ useFormatDuration(duration) }}
            </p>

            <template v-if="isFile(data.file)">
                <p class="my-3">Please select language</p>

                <v-select
                    v-model="language"
                    label="Languages"
                    variant="outlined"
                    clearable
                    item-title="name"
                    :loading="isLanguagesLoading"
                    :items="languagesList"
                    return-object
                    @update:model-value="updateLanguage"
                />
            </template>

            <v-text-field
                v-else
                label="Language"
                :model-value="language.name"
                variant="outlined"
                :readonly="!isFile(data.file)"
            />
        </div>

        <v-btn
            type="submit"
            color="red"
            class="text-none w-fit"
            @click="removeFile(data)"
        >
            Remove
        </v-btn>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    import { useFormatDuration } from '@/hooks/useFormatDuration.ts';
    import { getFileName, useFormatFileSize } from '@/hooks/useFormatFile.ts';
    import { getSource } from '@/hooks/useGetSource.ts';
    import type { Identifiable, VideoFile } from '@/ts/common';
    import { isFile } from '@/ts/guards/file.guard.ts';
    import type { CreateAudio } from '@/validations/types/content.validation';

    type SourceData = CreateAudio | VideoFile;

    interface Emits {
        (e: 'remove-audio', value: CreateAudio): void;
        (e: 'remove-video', value: VideoFile): void;
        (e: 'duration-loaded', value: number): void;
        (e: 'change-language', value: SourceData, language: Identifiable): void;
    }

    const props = defineProps<{
        data: SourceData;
        mediaType: 'audio' | 'video';
        languagesList: Identifiable[];
        isLanguagesLoading?: boolean;
    }>();

    const emits = defineEmits<Emits>();

    const language = ref(props.data.language);
    const videoElement = ref<HTMLVideoElement | null>(null);
    const audioElement = ref<HTMLAudioElement | null>(null);

    const duration = ref(0);
    const isVideoLoaded = ref(false);

    const getVideoSrc = (src: string | File) =>
        isFile(src) ? getSource(src) : src;

    const removeFile = (data: SourceData) => {
        props.mediaType === 'video'
            ? emits('remove-video', data)
            : emits('remove-audio', data as CreateAudio);
    };

    const loadVideoMetadata = () => {
        if (videoElement.value) {
            duration.value = videoElement.value.duration;
            emits('duration-loaded', duration.value);
            isVideoLoaded.value = true;
        }
    };

    const loadAudiosMetadata = () => {
        if (audioElement.value) {
            duration.value = audioElement.value.duration;
            isVideoLoaded.value = true;
        }
    };

    const updateLanguage = (language: Identifiable) => {
        emits('change-language', props.data, language);
    };

    watch(
        () => props.data,
        (value) => {
            if (videoElement.value) {
                videoElement.value.src = getVideoSrc(value.file);
            }
        }
    );
</script>

<style scoped lang="postcss">
    .link {
        @apply block truncate text-sm font-semibold text-primary-50 underline transition-colors hover:text-primary-100;
    }

    .edit-icon {
        @apply ml-2 flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-grey-200;
    }
</style>
