<template>
    <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

    <form class="grid gap-2" @submit.prevent="onSubmit">
        <fieldset>
            <p class="mb-3">Please enter a category name</p>

            <v-text-field
                v-model="name"
                :error-messages="errors.name"
                name="name"
                label="Category name"
                type="name"
                variant="outlined"
            />
        </fieldset>

        <fieldset>
            <p class="mb-3">Please choose a file of background</p>

            <drag-and-drop
                :error="!!errors.background"
                @upload="selectFile"
                @remove="removeFile"
            />
        </fieldset>

        <v-btn type="submit" color="primary" class="text-none w-fit">
            Save
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useForm } from 'vee-validate';

    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { createCategorySchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateCategory } from '@/validations/types/catalog';

    const uploadedFile = ref<File | null>(null);

    const { defineField, handleSubmit, errors, resetForm } =
        useForm<CreateCategory>({
            validationSchema: createCategorySchema,
            initialValues: {
                name: '',
                background: '',
            },
        });

    const [name] = defineField('name');
    const [background] = defineField('background');

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            uploadedFile.value = value[0].file;
            background.value = value[0].name;
        }
    };

    const removeFile = () => {
        uploadedFile.value = null;
        background.value = '';
    };

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
