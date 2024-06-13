<template>
    <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

    <form class="grid gap-2" @submit.prevent="onSubmit">
        <div>
            <p class="mb-3">Please enter a group name</p>

            <v-text-field
                v-model="name"
                name="name"
                label="Group name"
                type="name"
                variant="outlined"
                :error-messages="errors.name"
            />
        </div>

        <div>
            <p class="mb-3">Please select parent category</p>

            <v-select
                v-model="category"
                label="Category"
                variant="outlined"
                clearable
                :error-messages="errors.category_id"
                :items="categories"
                return-object
                item-title="name"
                @update:model-value="selectCategoryId"
            />
        </div>

        <catalog-image-upload
            v-model:name="name"
            :show-card="isFileSelected"
            :background="image"
            :error="!!errors.image"
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
            Save
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';

    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import type { CategoryBrief, Group } from '@/ts/catalog';
    import { createGroupSchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateGroup } from '@/validations/types/catalog';

    const props = defineProps<{ group?: Group | null }>();

    const isFileSelected = ref(!!props.group);
    const imageFile = ref<File | null>();

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateGroup>({
            validationSchema: createGroupSchema,
            initialValues: {
                name: '',
                image: '',
            },
        });

    const category = ref<CategoryBrief | null>();
    const [name] = defineField('name');
    const [image] = defineField('image');
    const [categoryId] = defineField('category_id');
    const [requiresAuth] = defineField('requires_auth');

    if (props.group) {
        category.value = props.group.category;
        categoryId.value = props.group.category.id;

        setValues(
            useExcludeProperties({ ...props.group }, ['id', 'date_created'])
        );
    }

    /**
     * Test categories
     */
    const categories = [
        {
            id: 2,
            name: 'Science',
        },
        {
            id: 1,
            name: 'Brands & events',
        },
    ];

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            image.value = URL.createObjectURL(value[0].file);
            imageFile.value = value[0].file;
        }
    };

    const selectCategoryId = (category?: CategoryBrief) => {
        if (category) {
            categoryId.value = category.id;
        }
    };

    const removeFile = () => {
        isFileSelected.value = false;
        image.value = '';
        imageFile.value = null;
    };

    const onSubmit = handleSubmit(() => {
        category.value = null;
        removeFile();
        resetForm();
    });
</script>

<style scoped></style>
