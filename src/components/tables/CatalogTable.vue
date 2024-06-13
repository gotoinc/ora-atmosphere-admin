<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
        <template #[`item.actions`]>
            <table-action-buttons />
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

        <template #no-data>
            <v-btn color="primary"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import TableActionButtons from '@/components/tables/TableActionButtons.vue';

    import type { ReadonlyHeaders } from '@/ts/vuetify';

    interface Props {
        headers: ReadonlyHeaders;
        // eslint-disable-next-line
        items: any[];
        editable?: boolean;
    }

    defineProps<Props>();
</script>

<style></style>
