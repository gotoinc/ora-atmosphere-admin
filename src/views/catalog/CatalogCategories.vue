<template>
    <div class="mb-5 flex items-center gap-4 max-sm:flex-col">
        <v-text-field
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Search..."
            variant="outlined"
            hide-details
            single-line
            class="max-w-96 max-sm:w-full max-sm:max-w-full"
        ></v-text-field>

        <v-btn
            class="text-none max-sm:w-full"
            append-icon="mdi-plus"
            color="primary"
            @click="isDialogOpen = true"
        >
            Add new category
        </v-btn>
    </div>

    <catalog-table
        :loading="isLoading"
        :headers="headers"
        :items="items"
        @edit="handleEdit"
        @delete="handleDelete"
    />

    <!--  Dialogs   -->
    <teleport to="body">
        <full-screen-dialog v-model="isDialogOpen" title="Create new category">
            <create-category-form
                @close="isDialogOpen = false"
                @update="loadCategories"
            />
        </full-screen-dialog>

        <full-screen-dialog
            v-model="isEditOpen"
            :title="`Edit - ${selectedCategory?.name}`"
        >
            <create-category-form
                v-model:category="selectedCategory"
                @close="isEditOpen = false"
                @update="loadCategories"
            />
        </full-screen-dialog>

        <delete-dialog
            v-model="isDeleteOpen"
            :loading="isDeleteLoading"
            :title="selectedCategory?.name"
            @delete="confirmDelete"
        />
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';
    import FullScreenDialog from '@/components/dialogs/FullScreenDialog.vue';
    import CreateCategoryForm from '@/components/forms/CreateCategoryForm.vue';
    import CatalogTable from '@/components/tables/CatalogTable.vue';

    import { deleteCategory } from '@/api/catalog/categories/delete-category.api.ts';
    import { getCategories } from '@/api/catalog/categories/get-categories.api.ts';
    import type { CatalogItem, Category } from '@/ts/catalog';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    const toast = useToast();

    const isDialogOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);
    const isLoading = ref(false);
    const isDeleteLoading = ref(false);
    const selectedCategory = ref<Category | null>(null);

    const headers = ref<ReadonlyHeaders>([
        {
            title: 'Category',
            align: 'start',
            key: 'name',
        },
        {
            title: 'Image',
            key: 'image',
            sortable: false,
            align: 'center',
        },
        {
            title: 'Contents amount',
            key: 'contentsAmount',
        },
        {
            title: 'Date',
            key: 'date_created',
        },
        {
            title: 'Visible for all',
            key: 'requires_auth',
            align: 'center',
            sortable: false,
        },
        {
            align: 'end',
            title: 'Actions',
            key: 'actions',
            sortable: false,
        },
    ]);

    const items = ref<Category[]>([]);

    const handleEdit = (category: CatalogItem) => {
        selectedCategory.value = category as Category;

        isEditOpen.value = true;
    };

    const loadCategories = async () => {
        isLoading.value = true;

        try {
            const categories = (await getCategories()) ?? [];
            items.value = [...categories].reverse();
        } finally {
            isLoading.value = false;
        }
    };

    const confirmDelete = async () => {
        const category = selectedCategory.value as Category;

        isDeleteLoading.value = true;

        try {
            await deleteCategory(category.id);

            toast.success('Category successfully deleted');

            isDeleteOpen.value = false;

            void loadCategories();
        } catch (e) {
            toast.error('Category is not deleted');
        } finally {
            isLoading.value = false;
            isDeleteLoading.value = false;
        }
    };

    const handleDelete = (category: CatalogItem) => {
        selectedCategory.value = category as Category;

        isDeleteOpen.value = true;
    };

    void loadCategories();
</script>

<style scoped lang="postcss"></style>
