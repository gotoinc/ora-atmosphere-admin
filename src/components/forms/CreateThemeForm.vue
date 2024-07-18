<template>
    <h3 class="mb-5 text-lg">Please fill out the fields below</h3>

    <form class="grid gap-2" @submit.prevent="onSubmit">
        <div>
            <p class="mb-3">Please enter a theme name</p>

            <v-text-field
                v-model="name"
                name="name"
                label="Theme name"
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
                return-object
                :error-messages="errors.group"
                item-title="name"
                :items="groups"
            />
        </div>

        <catalog-image-upload
            v-model:name="name"
            :show-card="isFileSelected"
            :background="imageSrc"
            :error="errors.image"
            @upload="selectFile"
            @remove="removeFile"
        />

        <v-checkbox
            v-model="requiresAuth"
            hide-details
            color="primary"
            class="mb-5"
            density="comfortable"
            label="Disable for unregistered users"
        ></v-checkbox>

        <v-btn
            :loading="isLoading"
            type="submit"
            class="text-none w-fit"
            color="primary"
        >
            Save
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';
    import type { CreateFormEmits } from '@/components/forms/types';

    import { getGroups } from '@/api/catalog/groups/get-groups.api.ts';
    import { postTopic } from '@/api/catalog/topics/post-topic.api.ts';
    import { updateTopic } from '@/api/catalog/topics/update-topic.api.ts';
    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import type { Topic } from '@/ts/catalog';
    import type { Identifiable } from '@/ts/common';
    import { createThemeSchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateTopicSchema } from '@/validations/types/catalog.validation';

    const props = defineProps<{ topic?: Topic | null }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isFileSelected = ref(!!props.topic?.image);
    const imageSrc = ref('');

    const isLoading = ref(false);
    const isGroupsLoading = ref(true);

    /**
     * Define schema
     */
    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateTopicSchema>({
            validationSchema: createThemeSchema,
            initialValues: {
                name: '',
            },
        });

    const [name] = defineField('name');
    const [image] = defineField('image');
    const [group] = defineField('group');
    const [requiresAuth] = defineField('requires_auth');

    const groups = ref<Identifiable[]>([]);

    /**
     * Choose properties only for edit
     */
    const excludedProperties = useExcludeProperties({ ...props.topic }, [
        'id',
        'group',
    ]) as CreateTopicSchema;

    if (props.topic) {
        if (props.topic.image) {
            imageSrc.value = props.topic.image;
        }

        setValues(excludedProperties);
    }

    /**
     * Manage image file
     */
    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            imageSrc.value = URL.createObjectURL(value[0].file);
            image.value = value[0].file;
        }
    };

    const removeFile = () => {
        isFileSelected.value = false;
        image.value = '';
        imageSrc.value = '';
    };

    const loadGroups = async () => {
        isGroupsLoading.value = true;

        try {
            const items = (await getGroups()) ?? [];

            if (items.length > 0) {
                groups.value = items.map((item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                });

                if (props.topic) {
                    const selected = items.find(
                        (item) => item.id === props.topic?.group
                    );

                    if (selected) group.value = selected;
                }
            }
        } finally {
            isGroupsLoading.value = false;
        }
    };

    /**
     * Submit form
     */
    const onSubmit = handleSubmit(async (values) => {
        const editedValues = useCompareObjects(
            {
                ...excludedProperties,
                group: group.value,
            },
            values
        );

        if (props.topic && !editedValues) {
            toast.error('No changes were captured');

            return;
        }

        isLoading.value = true;

        try {
            if (props.topic) {
                await updateTopic(props.topic.id, {
                    ...editedValues,
                    group_id: group.value.id,
                });

                toast.success('Topic successfully updated');
            } else {
                await postTopic({
                    name: values.name,
                    requires_auth: values.requires_auth,
                    group_id: group.value.id,
                    image: image.value as File,
                });

                toast.success('Topic successfully created');

                removeFile();
                resetForm();
            }

            emits('update');
            emits('close');
        } catch (e) {
            if (props.topic) {
                toast.error('Topic not updated');
            } else {
                toast.error('Topic not created');
            }
        } finally {
            isLoading.value = false;
        }
    });

    void loadGroups();
</script>

<style scoped></style>
