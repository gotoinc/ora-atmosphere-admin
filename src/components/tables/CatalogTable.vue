<template>
    <v-data-table
        class="!rounded-lg"
        :loading="loading"
        :headers="headers"
        :items="items"
    >
        <template #[`item.actions`]="{ item }">
            <table-action-buttons
                @delete="emits('delete', item)"
                @edit="emits('edit', item)"
            />
        </template>

        <template #[`item.name`]="{ item }">
            <p>
                {{ item.name }}
            </p>
        </template>

        <template #[`item.image`]="{ item }">
            <v-card
                v-if="item.image"
                class="mx-auto my-2 h-20 w-32"
                elevation="2"
                rounded
            >
                <v-img :src="item.image" class="h-full w-full" cover></v-img>
            </v-card>

            <div v-else>No image</div>
        </template>

        <template #[`item.date_created`]="{ item }">
            <p class="whitespace-nowrap">
                {{ useFormatDate(item.date_created) }}
            </p>
        </template>

        <template #[`item.requires_auth`]="{ item }">
            <v-icon
                v-if="!item.requires_auth"
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
    import TableActionButtons from '@/components/tables/TableActionButtons.vue';

    import { useFormatDate } from '@/hooks/useFormatDate.ts';
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
