<template>
    <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

    <form class="grid gap-2" @submit.prevent="onSubmit">
        <div>
            <p class="mb-3">Please enter a category name</p>

            <v-text-field
                v-model="name"
                :error-messages="errors.name"
                name="name"
                label="Category name"
                type="name"
                variant="outlined"
            />
        </div>

        <catalog-image-upload
            v-model:name="name"
            :show-card="isFileSelected"
            :background="image"
            :error="!!errors.image"
            class="mb-3"
            @upload="selectFile"
            @remove="removeFile"
        />

        <v-checkbox
            v-model="requiresAuth"
            hide-details
            color="primary"
            class="mb-5"
            density="comfortable"
            label="Visible for unregistered users"
        ></v-checkbox>

        <v-btn type="submit" color="primary" class="text-none w-fit">
            {{ category ? 'Save changes' : 'Save' }}
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';

    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import type { Category } from '@/ts/catalog';
    import { createCategorySchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateCategory } from '@/validations/types/catalog';

    const props = defineProps<{ category?: Category | null }>();

    const isFileSelected = ref(!!props.category);

    const imageFile = ref<File | null>();

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateCategory>({
            validationSchema: createCategorySchema,
            initialValues: {
                name: '',
                image: '',
            },
        });

    if (props.category) {
        setValues(
            useExcludeProperties({ ...props.category }, ['id', 'date_created'])
        );
    }

    const [name] = defineField('name');
    const [image] = defineField('image');
    const [requiresAuth] = defineField('requires_auth');

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            imageFile.value = value[0].file;
            image.value = URL.createObjectURL(value[0].file);
        }
    };

    const removeFile = () => {
        isFileSelected.value = false;

        image.value = '';
        imageFile.value = null;
    };

    const onSubmit = handleSubmit(() => {
        removeFile();
        resetForm();
    });
</script>

<style scoped></style>
