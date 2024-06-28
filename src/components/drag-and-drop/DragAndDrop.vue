<template>
    <drop-zone
        v-slot="{ dropZoneActive }"
        :class="{
            'bg-primary-100': files.length > 0 && !multiple,
        }"
        class="drop-area group w-full rounded bg-grey-200 p-3 text-center transition-colors"
        @files-dropped="checkFileType"
    >
        <div
            :class="{
                '!border-red-500': error,
            }"
            class="relative flex h-full min-h-24 items-center justify-center rounded border-2 border-dashed border-white transition-colors"
        >
            <label
                v-if="files.length === 0 || multiple"
                class="flex h-full w-full cursor-pointer flex-col items-center justify-center p-10 max-sm:p-5"
                :for="inputID"
            >
                <span
                    class="transition-transform group-hover:-translate-y-2"
                    :class="{ '-translate-y-2': dropZoneActive }"
                >
                    <slot name="icon">
                        <svg
                            class="mx-auto h-20 w-20 max-sm:h-10 max-sm:w-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                                fill="#fff"
                            />
                        </svg>
                    </slot>
                </span>

                <span class="mt-4 block text-2xl max-sm:text-xl">
                    <strong>Choose a file</strong> or drag it here
                </span>

                <input
                    :id="inputID"
                    class="sr-only"
                    :accept="acceptFileTypes"
                    type="file"
                    :multiple="multiple"
                    @change="onInputChange"
                />
            </label>

            <div v-else-if="!multiple" class="mx-auto w-fit">
                <span class="line-clamp-2 break-all text-lg max-sm:text-base">
                    {{ files[0].name }}
                </span>

                <span
                    class="absolute right-0 top-0 flex h-5 w-5 -translate-x-2 translate-y-2 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:!bg-red-500 hover:!text-white"
                    @click="onRemoveFile"
                >
                    <v-icon size="14" icon="mdi-close" />
                </span>
            </div>
        </div>

        <v-snackbar v-model="showAlert" :timeout="2000" color="red">
            This file type is not supported
        </v-snackbar>
    </drop-zone>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    import DropZone from '@/components/drag-and-drop/DropZone.vue';

    // File Management
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { useFiles } from '@/hooks/useFileList.ts';
    import { useGeneratedID } from '@/hooks/useGeneratedID.ts';

    interface Props {
        error?: boolean;
        multiple?: boolean;
        accept?: string[];
    }

    interface Emits {
        (e: 'upload', value: UploadableFile[]): void;
        (e: 'remove'): void;
    }

    const emits = defineEmits<Emits>();
    const props = defineProps<Props>();

    const acceptFileTypes = computed(() =>
        props.accept ? props.accept.join(', ') : ''
    );

    const inputID = `file-input-${useGeneratedID()}`;

    const showAlert = ref(false);

    const { files, addFiles, removeFile } = useFiles();

    const checkFileType = (newFiles: FileList | File[]) => {
        if (!props.multiple && newFiles.length > 1) {
            showAlert.value = true;
            return;
        }

        if (!props.accept) {
            addFiles(newFiles);

            emits('upload', files.value);

            return;
        }

        if (props.accept.includes(newFiles[0].type)) {
            addFiles(newFiles);

            emits('upload', files.value);
        } else {
            showAlert.value = true;
        }
    };

    const onInputChange = (e: Event) => {
        const input = e.target as HTMLInputElement;

        if (input.files) {
            checkFileType(input.files);
        }

        input.value = ''; // reset so that selecting the same file again will still cause it to fire this change
    };

    const onRemoveFile = () => {
        removeFile(files.value[0]);
        emits('remove');
    };
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
