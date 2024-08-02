<template>
    <div v-if="editor" class="rounded border !border-grey-100 p-4">
        <div class="mb-5 flex flex-wrap items-center gap-3">
            <v-menu>
                <template #activator="{ props: activatorProps }">
                    <v-btn
                        variant="text"
                        color="white"
                        class="text-none"
                        :class="{
                            'is-active': editor.isActive('heading'),
                        }"
                        v-bind="activatorProps"
                        append-icon="mdi-chevron-down"
                    >
                        Headings
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, index) in headings"
                        :key="index"
                        :class="{
                            'is-active': editor.isActive('heading', {
                                level: item.level,
                            }),
                        }"
                        :value="index"
                    >
                        <v-list-item-title @click="item.callback">
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn
                variant="text"
                color="white"
                class="text-none"
                :class="{ 'is-active': editor.isActive('paragraph') }"
                @click="editor.chain().focus().setParagraph().run()"
            >
                Paragraph
            </v-btn>

            <div class="flex gap-1 border-l border-r border-grey-200 px-2">
                <v-btn
                    variant="text"
                    size="small"
                    icon="mdi-format-bold"
                    :class="{ 'is-active': editor.isActive('bold') }"
                    @click="editor.chain().focus().toggleBold().run()"
                >
                </v-btn>

                <v-btn
                    size="small"
                    icon="mdi-format-italic"
                    variant="text"
                    :class="{ 'is-active': editor.isActive('italic') }"
                    @click="editor.chain().focus().toggleItalic().run()"
                >
                </v-btn>

                <v-btn
                    size="small"
                    icon="mdi-format-strikethrough"
                    variant="text"
                    :class="{ 'is-active': editor.isActive('strike') }"
                    @click="editor.chain().focus().toggleStrike().run()"
                >
                </v-btn>
            </div>

            <v-btn
                size="small"
                icon="mdi-link"
                variant="text"
                :class="{ 'is-active': editor.isActive('link') }"
                @click="isURLOpen = true"
            >
            </v-btn>

            <v-btn
                size="small"
                icon="mdi-link-off"
                variant="text"
                :disabled="!editor.isActive('link')"
                @click="removeLink"
            >
            </v-btn>

            <div class="flex gap-1 border-l border-grey-200 pl-2">
                <v-btn
                    size="small"
                    icon="mdi-format-list-bulleted"
                    variant="text"
                    :class="{ 'is-active': editor.isActive('bulletList') }"
                    @click="editor.chain().focus().toggleBulletList().run()"
                >
                </v-btn>

                <v-btn
                    size="small"
                    icon=" mdi-format-list-numbered"
                    variant="text"
                    :class="{ 'is-active': editor.isActive('orderedList') }"
                    @click="editor.chain().focus().toggleOrderedList().run()"
                >
                </v-btn>
            </div>

            <div class="ml-auto flex gap-1 max-mob:order-[-2] max-mob:!ml-0">
                <v-btn
                    size="small"
                    icon="mdi-arrow-u-left-top-bold"
                    variant="text"
                    :class="{ 'is-active': editor.isActive('link') }"
                    :disabled="!editor.can().chain().focus().undo().run()"
                    @click="editor.chain().focus().undo().run()"
                >
                </v-btn>

                <v-btn
                    size="small"
                    icon="mdi-arrow-u-right-top-bold"
                    variant="text"
                    :disabled="!editor.can().chain().focus().redo().run()"
                    @click="editor.chain().focus().redo().run()"
                >
                </v-btn>
            </div>
        </div>

        <editor-content class="rounded bg-grey-300 p-3" :editor="editor" />

        <!-- Dialog for enter url -->
        <v-dialog v-model="isURLOpen" persistent max-width="400">
            <div class="rounded-lg bg-dark p-7 text-center shadow-2xl">
                <v-text-field
                    v-model="url"
                    density="compact"
                    label="Enter the URL"
                    hide-details
                    type="name"
                    class="mb-5"
                    variant="outlined"
                />

                <div class="flex items-center gap-2">
                    <v-btn
                        class="text-none flex-grow"
                        @click="isURLOpen = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        class="text-none flex-grow"
                        color="primary"
                        @click="addLink"
                    >
                        Save
                    </v-btn>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
    import { onUnmounted, ref, watch } from 'vue';
    import { Link } from '@tiptap/extension-link';
    import StarterKit from '@tiptap/starter-kit';
    import { EditorContent, useEditor } from '@tiptap/vue-3';

    interface Props {
        modelValue: string | null | undefined;
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const isURLOpen = ref(false);
    const url = ref('');

    const editor = useEditor({
        content: props.modelValue,
        extensions: [StarterKit, Link],
        editorProps: {
            attributes: {
                class: 'prose-sm focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            emits('update:modelValue', editor.getHTML());
        },
    });

    const headings = ref([
        {
            title: 'Heading 1',
            level: 1,
            callback: () =>
                editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
            title: 'Heading 2',
            level: 2,
            callback: () =>
                editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
            title: 'Heading 3',
            level: 3,
            callback: () =>
                editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
        },
    ]);

    const addLink = () => {
        if (url.value) {
            editor.value
                ?.chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url.value })
                .run();

            isURLOpen.value = false;
            url.value = '';
        }
    };

    const removeLink = () => {
        editor.value?.chain().focus().unsetLink().run();
    };

    watch(
        () => props.modelValue,
        (value) => {
            if (editor.value && value) {
                editor.value.commands.setContent(value);
            }
        },
        {
            once: true,
        }
    );

    onUnmounted(() => editor.value?.destroy());
</script>

<style>
    .is-active {
        @apply bg-primary-100;
    }
</style>
