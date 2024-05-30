<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
        <template #[`item.actions`]="{ item }">
            <div class="flex items-center justify-end gap-2">
                <button class="icon bg-primary-50">
                    <v-icon size="small" @click="() => console.log(item)">
                        mdi-pencil
                    </v-icon>

                    <v-tooltip activator="parent" location="start">
                        Edit
                    </v-tooltip>
                </button>

                <button class="icon bg-red-500">
                    <v-icon size="small"> mdi-delete </v-icon>

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

        <template #no-data>
            <v-btn color="primary"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
    import type { VDataTable } from 'vuetify/components';

    type ReadonlyHeaders = VDataTable['$props']['headers'];

    interface Props {
        headers: ReadonlyHeaders;
        items: never[];
        editable?: boolean;
    }

    defineProps<Props>();
</script>

<style scoped lang="postcss">
    .icon {
        @apply flex h-8 w-8 items-center justify-center rounded;
    }
</style>

<style>
    .v-table > .v-table__wrapper > table {
        min-width: 768px;
    }
</style>
