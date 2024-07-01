<template>
    <v-data-table
        :loading="loading"
        class="!rounded-lg"
        :headers="headers"
        :items="items"
    >
        <template #[`item.actions`]="{ item }">
            <div class="flex items-center justify-end gap-2">
                <button class="action-icon bg-primary-50">
                    <v-icon size="small" @click="emits('edit', item)">
                        mdi-pencil
                    </v-icon>

                    <v-tooltip activator="parent" location="start">
                        Edit
                    </v-tooltip>
                </button>

                <button class="action-icon bg-red-500">
                    <v-icon size="small" @click="emits('delete', item)">
                        mdi-delete
                    </v-icon>

                    <v-tooltip activator="parent" location="top">
                        Delete
                    </v-tooltip>
                </button>
            </div>
        </template>

        <template #[`item.image`]="{ item }">
            <v-card
                v-if="item.image"
                class="my-2 h-20 w-20"
                elevation="2"
                rounded
            >
                <v-img :src="item.image" class="h-full w-full" cover></v-img>
            </v-card>

            <div v-else>No image</div>
        </template>

        <template #[`item.requires_auth`]="{ item }">
            <v-icon
                v-if="item.requires_auth"
                icon="mdi mdi-check-circle"
                color="green"
            />

            <v-icon v-else icon="mdi mdi-cancel" color="red" />
        </template>

        <template #no-data>
            <p class="text-lg">No results</p>
        </template>

        <template #loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import type { CatalogItem } from '@/ts/catalog';
    import type { ReadonlyHeaders } from '@/ts/vuetify';

    interface Props {
        headers: ReadonlyHeaders;
        // eslint-disable-next-line
        items: any[];
        editable?: boolean;
        loading?: boolean;
    }

    interface Emits {
        (e: 'delete', value: CatalogItem): void;
        (e: 'edit', value: CatalogItem): void;
    }

    defineProps<Props>();
    const emits = defineEmits<Emits>();
</script>

<style></style>
