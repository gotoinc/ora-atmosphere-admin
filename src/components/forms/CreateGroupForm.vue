<template>
    <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

    <form class="grid gap-2" @submit.prevent="onSubmit">
        <fieldset>
            <p class="mb-3">Please enter a group name</p>

            <v-text-field
                v-model="name"
                name="name"
                label="Group name"
                type="name"
                variant="outlined"
                :error-messages="errors.name"
            />
        </fieldset>

        <fieldset>
            <p class="mb-3">Please select parent category</p>

            <v-select
                v-model="category"
                label="Category"
                variant="outlined"
                clearable
                :error-messages="errors.category"
                :items="['Brands & events', 'Science', 'Culture']"
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
    import { createGroupSchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateGroup } from '@/validations/types/catalog';

    const uploadedFile = ref<File | null>(null);

    const { defineField, handleSubmit, errors, resetForm } =
        useForm<CreateGroup>({
            validationSchema: createGroupSchema,
            initialValues: {
                name: '',
                background: '',
            },
        });

    const [name] = defineField('name');
    const [background] = defineField('background');
    const [category] = defineField('category');

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
