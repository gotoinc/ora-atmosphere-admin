<template>
    <div class="rounded bg-slate-600 p-4">
        <audio
            v-if="!getVideo(data)"
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
            <source
                :src="isFile(data.file) ? getSource(data.file) : data.file"
            />
        </video>

        <div class="mt-4 space-y-4">
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

                <p>
                    File duration:
                    {{ useFormatDuration(duration) }}
                </p>
            </template>

            <p v-else>
                Video link:

                <a target="_blank" :href="data.file" class="link">
                    {{ data.file }}
                </a>
            </p>

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

            <v-btn
                type="submit"
                color="red"
                class="text-none w-fit"
                @click="removeFile(data)"
            >
                Remove
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

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
        languagesList: Identifiable[];
        isLanguagesLoading?: boolean;
    }>();

    const emits = defineEmits<Emits>();

    const language = ref(props.data.language);
    const videoElement = ref<HTMLVideoElement | null>(null);
    const audioElement = ref<HTMLAudioElement | null>(null);

    const duration = ref(0);
    const isVideoLoaded = ref(false);

    const getVideo = (source: SourceData) => {
        if (isFile(source.file) && source.file.type.startsWith('video/')) {
            return source as VideoFile;
        }

        return;
    };

    const removeFile = (data: SourceData) => {
        getVideo(data)
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
</script>

<style scoped></style>
