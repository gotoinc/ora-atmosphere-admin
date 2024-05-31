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
                :error-messages="errors.name"
                variant="outlined"
            />
        </div>

        <div>
            <p class="mb-3">Please select parent group</p>

            <v-select
                v-model="group"
                label="Group"
                variant="outlined"
                clearable
                :error-messages="errors.group_id"
                return-object
                item-title="name"
                :items="groups"
                @update:model-value="selectGroupId"
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

        <v-btn type="submit" class="text-none w-fit" color="primary">
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
    import type { CategoryBrief, Topic } from '@/ts/catalog';
    import { createThemeSchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateTheme } from '@/validations/types/catalog';

    const props = defineProps<{ topic?: Topic | null }>();

    const isFileSelected = ref(!!props.topic);
    const imageFile = ref<File | null>();

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateTheme>({
            validationSchema: createThemeSchema,
            initialValues: {
                name: '',
                image: '',
            },
        });

    const group = ref<CategoryBrief | null>();
    const [name] = defineField('name');
    const [image] = defineField('image');
    const [groupId] = defineField('group_id');
    const [requiresAuth] = defineField('requires_auth');

    if (props.topic) {
        group.value = props.topic.group;
        groupId.value = props.topic.group.id;

        setValues(
            useExcludeProperties({ ...props.topic }, ['id', 'date_created'])
        );
    }

    /**
     * Test groups
     */
    const groups = [
        {
            id: 2,
            name: 'Science',
        },
        {
            id: 1,
            name: 'Brands',
        },
    ];

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            image.value = URL.createObjectURL(value[0].file);
            imageFile.value = value[0].file;
        }
    };

    const selectGroupId = (group?: CategoryBrief) => {
        if (group) {
            groupId.value = group.id;
        }
    };

    const removeFile = () => {
        isFileSelected.value = false;
        image.value = '';
        imageFile.value = null;
    };

    const onSubmit = handleSubmit(() => {
        group.value = null;
        removeFile();
        resetForm();
    });
</script>

<style scoped></style>
