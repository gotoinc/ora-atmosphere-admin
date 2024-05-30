<template>
    <v-data-table class="!rounded-lg" :headers="headers" :items="items">
        <template #[`item.actions`]="{ item }">
            <div class="flex items-center justify-end gap-2">
                <button class="action-icon bg-primary-50">
                    <v-icon size="small" @click="() => console.log(item)">
                        mdi-pencil
                    </v-icon>

                    <v-tooltip activator="parent" location="start">
                        Edit
                    </v-tooltip>
                </button>

                <button class="action-icon bg-red-500">
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
