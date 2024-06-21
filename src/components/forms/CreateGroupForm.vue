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
            label="Visible for unregistered users"
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
    import type { Category, Group } from '@/ts/catalog';
    import type { KeysToString } from '@/ts/types/types';
    import { createGroupSchema } from '@/validations/schemas/catalog.schema.ts';
    import type {
        CreateCategory,
        CreateGroup,
    } from '@/validations/types/catalog';

    const props = defineProps<{ group?: Group | null }>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isFileSelected = ref(!!props.group?.image);
    const imageSrc = ref('');

    const isLoading = ref(false);
    const isCategoriesLoading = ref(true);

    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateGroup>({
            validationSchema: createGroupSchema,
            initialValues: {
                name: '',
            },
        });

    const category = ref<Category | null>();
    const categories = ref<Category[]>([]);

    const [name] = defineField('name');
    const [image] = defineField('image');
    // const [categoryId] = defineField('category_id');
    const [requiresAuth] = defineField('requires_auth');

    const excludedProperties = useExcludeProperties({ ...props.group }, [
        'id',
        'date_created',
        'topics',
    ]);

    if (props.group) {
        category.value = props.group.category;
        // categoryId.value = props.group.category.id;

        setValues(excludedProperties);

        if (props.group.image) {
            imageSrc.value = props.group.image;
        }
    }

    const selectFile = (value: UploadableFile[] | UploadableFile) => {
        if (Array.isArray(value)) {
            imageSrc.value = URL.createObjectURL(value[0].file);
            image.value = value[0].file;
        }
    };

    // const selectCategoryId = (category?: Identifiable) => {
    //     if (category) {
    //         categoryId.value = category.id;
    //     }
    // };

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

        if (props.group && !editedValues) {
            toast.error('No changes were captured');

            return;
        }

        isLoading.value = true;

        try {
            if (props.group) {
                await updateGroup(props.group.id, {
                    ...editedValues,
                });

                toast.success('Group successfully updated');
            } else {
                await postGroup({
                    ...values,
                    // category_id: categoryId.value,
                });

                toast.success('Group successfully created');

                category.value = null;
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
            categories.value = (await getCategories()) ?? [];
        } finally {
            isCategoriesLoading.value = false;
        }
    });
</script>

<style scoped></style>
