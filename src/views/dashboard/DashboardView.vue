<template>
    <section>
        <div class="mb-16">
            <div class="mb-16">
                <h1 v-if="profile" class="mb-1 text-2xl font-bold">
                    Hello {{ `${profile.first_name} ${profile.last_name}` }}
                </h1>

                <p class="text-grey-100">Welcome back!</p>
            </div>

            <v-card class="overflow-visible">
                <div class="">
                    <catalog-graph />
                </div>
            </v-card>
        </div>

        <div
            class="mb-10 grid grid-cols-4 gap-x-4 gap-y-12 max-tab:grid-cols-2 max-mob-md:grid-cols-1"
        >
            <info-card>
                <template #top> 0 </template>

                <template #text>
                    <div class="text-h6 font-weight-light">Total users</div>

                    <span class="mdi mdi-account-multiple text-xl"></span>
                </template>
            </info-card>

            <info-card>
                <template #top> 0 </template>

                <template #text>
                    <div class="text-h6 font-weight-light">Total admins</div>

                    <span class="mdi mdi-account-multiple text-xl"></span>
                </template>
            </info-card>

            <info-card>
                <template #top> 0 </template>

                <template #text>
                    <div class="text-h6 font-weight-light">
                        Total super admins
                    </div>

                    <span class="mdi mdi-account-multiple text-xl"></span>
                </template>
            </info-card>

            <info-card class="">
                <template #top> 0 </template>

                <template #text>
                    <div class="text-h6 font-weight-light">Total contents</div>

                    <span class="mdi mdi-play-circle text-xl"></span>
                </template>
            </info-card>
        </div>

        <div class="mb-10">
            <h2 class="mb-5 text-2xl font-bold">Last added contents</h2>

            <contents-table :items="items" />
        </div>
    </section>
</template>

<script setup lang="ts">
    import InfoCard from '@/components/base/InfoCard.vue';
    import CatalogGraph from '@/components/graph/CatalogGraph.vue';
    import ContentsTable from '@/components/tables/ContentsTable.vue';

    import { useAuthStore } from '@/stores/auth.store.ts';

    import type { Content } from '@/ts/contents';

    const { profile } = useAuthStore();

    const items: Content[] = [
        {
            id: 1000,
            file_url:
                'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4',
            image_url: '/images/example.jpg',
            title: 'Сisco',
            topic: {
                id: 100,
                name: 'Theme 1',
            },
            description:
                'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            languages: ['en', 'fr', 'de', 'es'],
            tags: ['environment', 'museum', 'luxury', 'art'],
            requires_auth: false,
            duration: 13,
            with_sound: true,
            with_narration: true,
            date_created: new Date().toISOString().split('T')[0],
        },
        {
            id: 1001,
            file_url:
                'https://videos.pexels.com/video-files/4114797/4114797-hd_1280_720_50fps.mp4',
            image_url: '/images/example.jpg',
            title: 'Сisco 2',
            topic: {
                id: 100,
                name: 'Theme 2',
            },
            description:
                'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            languages: ['en', 'fr', 'de', 'es'],
            tags: ['environment', 'museum', 'luxury', 'art'],
            requires_auth: true,
            duration: 13,
            with_sound: true,
            with_narration: true,
            date_created: new Date().toISOString().split('T')[0],
        },
    ];
</script>

<style></style>
