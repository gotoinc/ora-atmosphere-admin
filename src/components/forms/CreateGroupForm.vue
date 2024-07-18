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
                :loading="isCategoriesLoading"
                label="Category"
                variant="outlined"
                clearable
                :error-messages="errors.category"
                :items="categories"
                return-object
                item-title="name"
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
            color="primary"
            class="text-none w-fit"
        >
            {{ group ? 'Save changes' : 'Save' }}
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';
    import type { CreateFormEmits } from '@/components/forms/types';

    import { getCategories } from '@/api/catalog/categories/get-categories.api.ts';
    import { postGroup } from '@/api/catalog/groups/post-group.api.ts';
    import { updateGroup } from '@/api/catalog/groups/update-group.api.ts';
    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { UploadableFile } from '@/hooks/useFileList.ts';
    import type { Group } from '@/ts/catalog';
    import type { Identifiable } from '@/ts/common';
    import { createGroupSchema } from '@/validations/schemas/catalog.schema.ts';
    import type { CreateGroupSchema } from '@/validations/types/catalog.validation';

    const props = defineProps<{ group?: Group | null }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isFileSelected = ref(!!props.group?.image);
    const imageSrc = ref('');

    const isLoading = ref(false);
    const isCategoriesLoading = ref(true);

    /**
     * Define schema
     */
    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateGroupSchema>({
            validationSchema: createGroupSchema,
            initialValues: {
                name: '',
            },
        });

    const [name] = defineField('name');
    const [image] = defineField('image');
    const [category] = defineField('category');
    const [requiresAuth] = defineField('requires_auth');

    const categories = ref<Identifiable[]>([]);

    /**
     * Choose properties only for edit
     */
    const excludedProperties = useExcludeProperties({ ...props.group }, [
        'id',
        'contents_amount',
        'date_created',
        'category',
    ]) as CreateGroupSchema;

    if (props.group) {
        setValues(excludedProperties);

        if (props.group.image) {
            imageSrc.value = props.group.image;
        }
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

    /**
     * Submit form
     */
    const onSubmit = handleSubmit(async (values) => {
        // Check if something was edited
        const editedValues = useCompareObjects(excludedProperties, values);

        if (props.group && !editedValues) {
            toast.error('No changes were captured');

            return;
        }

        isLoading.value = true;

        try {
            if (props.group) {
                await updateGroup(props.group.id, {
                    ...editedValues,
                    category: category.value.id,
                });

                toast.success('Group successfully updated');
            } else {
                await postGroup({
                    ...values,
                    category: category.value.id,
                    image: image.value as File,
                });

                toast.success('Group successfully created');

                removeFile();
                resetForm();
            }

            emits('update');
            emits('close');
        } catch (e) {
            if (props.group) {
                toast.error('Group not updated');
            } else {
                toast.error('Group not created');
            }
        } finally {
            isLoading.value = false;
        }
    });

    onMounted(async () => {
        try {
            const items = (await getCategories()) ?? [];

            if (items.length > 0) {
                categories.value = items.map((item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                });

                if (props.group) {
                    const selected = categories.value.find(
                        (category) => category.id === props.group?.category
                    );

                    if (selected) category.value = selected;
                }
            }
        } finally {
            isCategoriesLoading.value = false;
        }
    });
</script>

<style scoped></style>
