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
                return-object
                :error-messages="errors.group_id"
                item-title="name"
                :items="groups"
                @update:model-value="selectGroupId"
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
            label="Visible for all users"
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
    import { onMounted, ref } from 'vue';
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
    import type { Group, Topic } from '@/ts/catalog';
    import type { KeysToString } from '@/ts/types/types';
    import { createThemeSchema } from '@/validations/schemas/catalog.schema.ts';
    import type {
        CreateCategory,
        CreateTheme,
    } from '@/validations/types/catalog';

    const props = defineProps<{ topic?: Topic | null }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isFileSelected = ref(!!props.topic?.image);
    const imageSrc = ref('');

    const isLoading = ref(false);
    const isGroupsLoading = ref(true);

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateTheme>({
            validationSchema: createThemeSchema,
            initialValues: {
                name: '',
            },
        });

    const group = ref<Group | null>();
    const groups = ref<Group[]>([]);

    const [name] = defineField('name');
    const [image] = defineField('image');
    const [groupId] = defineField('group_id');
    const [requiresAuth] = defineField('requires_auth');

    const excludedProperties = useExcludeProperties({ ...props.topic }, [
        'id',
        'videos',
    ]);

    if (props.topic) {
        group.value = props.topic.group;

        if (props.topic.image) {
            imageSrc.value = props.topic.image;
        }

        setValues(excludedProperties);
    }

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            imageSrc.value = URL.createObjectURL(value[0].file);
            image.value = value[0].file;
        }
    };

    const selectGroupId = (group?: Group) => {
        if (group) {
            groupId.value = group.id;
        }
    };

    const removeFile = () => {
        isFileSelected.value = false;
        image.value = null;
        imageSrc.value = '';
    };

    const onSubmit = handleSubmit(async (values) => {
        const editedValues = useCompareObjects(
            excludedProperties,
            values as KeysToString<CreateCategory>
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
                    group_id: groupId.value,
                });

                toast.success('Topic successfully updated');
            } else {
                await postTopic({
                    ...values,
                });

                toast.success('Topic successfully created');

                group.value = null;
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

    onMounted(async () => {
        try {
            groups.value = (await getGroups()) ?? [];
        } finally {
            isGroupsLoading.value = false;
        }
    });
</script>

<style scoped></style>
