<template>
    <drop-zone
        v-slot="{ dropZoneActive }"
        :class="{
            'bg-primary-100': files.length > 0,
        }"
        class="drop-area group mb-5 w-full rounded bg-grey-100 p-3 text-center transition-colors"
        @files-dropped="dropFiles"
    >
        <div
            :class="{ '!border-white': dropZoneActive || files.length > 0 }"
            class="rounded border-2 border-dashed !border-grey-200 p-10 transition-colors"
        >
            <label
                v-if="files.length === 0"
                class="cursor-pointer"
                for="file-input"
            >
                <svg
                    :class="{ '-translate-y-2': dropZoneActive }"
                    class="mx-auto h-20 w-20 transition-transform group-hover:-translate-y-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                        fill="#fff"
                    />
                </svg>

                <span class="mt-4 block text-2xl">
                    <strong>Choose a file</strong> or drag it here
                </span>

                <input id="file-input" type="file" @change="onInputChange" />
            </label>

            <div v-else class="relative mx-auto w-fit">
                <span class="text-lg">
                    {{ files[0].name }}
                </span>

                <span
                    class="absolute bottom-full left-full flex h-5 w-5 translate-x-2 translate-y-3 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:!bg-red-500 hover:!text-white"
                    @click="removeFile(files[0])"
                >
                    <v-icon size="14" icon="mdi-close" />
                </span>
            </div>
        </div>
    </drop-zone>
</template>

<script setup lang="ts">
    import DropZone from '@/components/drag-and-drop/DropZone.vue';

    // File Management
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { useFiles } from '@/hooks/useFileList.ts';

    interface Emits {
        (e: 'upload', value: UploadableFile[] | UploadableFile): void;
    }

    const emits = defineEmits<Emits>();

    const { files, addFiles, removeFile } = useFiles();

    const dropFiles = (newFiles: FileList | File[]) => {
        addFiles(newFiles);

        emits('upload', files.value);
    };

    function onInputChange(e: Event) {
        const input = e.target as HTMLInputElement;

        if (input.files) {
            addFiles(input.files);
        }

        input.value = ''; // reset so that selecting the same file again will still cause it to fire this change

        emits('upload', files.value);
    }
</script>

<style scoped lang="postcss">
    .drop-area {
        &[data-active='true'] {
            @apply bg-primary-100;
        }
    }

    label {
        input[type='file']:not(:focus-visible) {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        }
    }
</style>
