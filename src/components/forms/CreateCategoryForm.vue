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
            :background="imageSrc"
            :error="errors.image"
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
            label="Disable for unregistered users"
        ></v-checkbox>

        <v-btn
            :loading="isLoading"
            type="submit"
            color="primary"
            class="text-none w-fit"
        >
            {{ category ? 'Save changes' : 'Save' }}
        </v-btn>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import CatalogImageUpload from '@/components/drag-and-drop/CatalogImageUpload.vue';
    import type { CreateFormEmits } from '@/components/forms/types';

    import { postCategories } from '@/api/catalog/categories/post-category.api.ts';
    import { updateCategory } from '@/api/catalog/categories/update-category.api.ts';
    import { useExcludeProperties } from '@/hooks/useExcludeProperties.ts';
    import type { Category } from '@/ts/catalog';
    import { createCategorySchema } from '@/validations/schemas/catalog.schema.ts';
    import type {
        CategoryInput,
        CreateCategorySchema,
    } from '@/validations/types/catalog.validation';

    interface Props {
        category?: Category | null;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<CreateFormEmits>();

    const toast = useToast();

    const isFileSelected = ref(!!props.category?.image);
    const isLoading = ref(false);
    const imageSrc = ref('');

    /**
     * Define schema
     */
    const { defineField, handleSubmit, errors, resetForm, setValues } =
        useForm<CreateCategorySchema>({
            validationSchema: createCategorySchema,
            initialValues: {
                name: '',
                requires_auth: false,
                image: '',
            },
        });

    const [name] = defineField('name');
    const [image] = defineField('image');
    const [requiresAuth] = defineField('requires_auth');

    /**
     * Choose properties only for edit
     */
    const excludedProperties = useExcludeProperties({ ...props.category }, [
        'id',
        'contents_amount',
        'date_created',
    ]) as CreateCategorySchema;

    /**
     * Set existing values
     */
    if (props.category) {
        setValues(excludedProperties);

        if (props.category.image) {
            imageSrc.value = props.category.image;
        }
    }

    /**
     * Manage image file
     */
    const selectFile = (value: File[] | File) => {
        if (!Array.isArray(value)) {
            image.value = value;
            imageSrc.value = URL.createObjectURL(value);
            isFileSelected.value = true;
        }
    };

    const removeFile = () => {
        isFileSelected.value = false;
        imageSrc.value = '';
        image.value = '';
    };

    const getEditedValues = (values: CreateCategorySchema) => {
        const editedValues: Partial<CategoryInput> = {};

        if (values.image !== excludedProperties.image) {
            editedValues.image = values.image as File;
        }

        if (values.name !== excludedProperties.name) {
            editedValues.name = values.name;
        }

        if (values.requires_auth !== excludedProperties.requires_auth) {
            editedValues.requires_auth = values.requires_auth;
        }

        return editedValues;
    };

    /**
     * Submit form
     */
    const onSubmit = handleSubmit(async (values) => {
        // Check if something was edited
        const editedValues = getEditedValues(values);

        if (props.category && Object.keys(editedValues).length === 0) {
            toast.error('No changes were captured');

            return;
        }

        isLoading.value = true;

        try {
            // Update category
            if (props.category) {
                await updateCategory(props.category.id, {
                    ...editedValues,
                });

                toast.success('Category successfully updated');
            } else {
                // Create category
                await postCategories({
                    ...values,
                    image: image.value as File,
                });

                toast.success('Category successfully created');

                removeFile();
                resetForm();
            }

            emits('update');
            emits('close');
        } catch (e) {
            if (props.category) {
                toast.error('Category not updated');
            } else {
                toast.error('Category not created');
            }
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped></style>
