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

        <div>
            <template v-if="!background">
                <p class="mb-3">Please choose a file of background</p>

                <drag-and-drop
                    :error="!!errors.background"
                    @upload="selectFile"
                    @remove="removeFile"
                />
            </template>

            <template v-else>
                <p class="mb-2 font-semibold">Card preview:</p>

                <v-btn
                    color="error"
                    class="text-none mb-3 w-fit"
                    @click="removeFile"
                >
                    Reset background
                </v-btn>

                <category-card :img="backgroundSrc" :name="name" />
            </template>
        </div>

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

    import CategoryCard from '@/components/base/CategoryCard.vue';
    import DragAndDrop from '@/components/drag-and-drop/DragAndDrop.vue';

    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import { createCategorySchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateCategory } from '@/validations/types/catalog';

    const backgroundSrc = ref('');

    const { defineField, handleSubmit, errors, resetForm } =
        useForm<CreateCategory>({
            validationSchema: createCategorySchema,
            initialValues: {
                name: '',
            },
        });

    const [name] = defineField('name');
    const [background] = defineField('background');
    const [requiresAuth] = defineField('requires_auth');

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            background.value = value[0].file;
            backgroundSrc.value = URL.createObjectURL(background.value);
        }
    };

    const removeFile = () => {
        background.value = null;
        backgroundSrc.value = '';
    };

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
