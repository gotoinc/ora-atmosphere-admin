<template>
    <section>
        <div class="mb-16">
            <div class="mb-16">
                <template v-if="profile">
                    <h1 class="mb-1 text-2xl font-bold">
                        Hello,
                        {{ `${profile.first_name} ${profile.last_name}` }}!
                    </h1>

                    <p class="text-grey-100">Welcome back!</p>
                </template>

                <v-skeleton-loader v-else class="h-12 w-36" />
            </div>

            <v-card v-if="false" class="overflow-visible">
                <!-- TODO: show graph -->
                <div>
                    <!--                    <catalog-graph /> -->
                </div>
            </v-card>
        </div>

        <div
            class="mb-10 grid grid-cols-4 gap-x-4 gap-y-12 max-tab:grid-cols-2 max-mob-md:grid-cols-1"
        >
            <info-card>
                <template #top>
                    <v-progress-circular
                        v-if="isLoading || !dashboardStats"
                        indeterminate
                    ></v-progress-circular>

                    <span v-else>
                        {{ dashboardStats.total_users }}
                    </span>
                </template>

                <template #text>
                    <div class="flex items-center gap-3">
                        <h3
                            class="text-h6 font-weight-light flex items-center gap-3"
                        >
                            Total users
                        </h3>

                        <span class="mdi mdi-account-multiple text-xl"></span>
                    </div>
                </template>
            </info-card>

            <info-card>
                <template #top>
                    <v-progress-circular
                        v-if="isLoading || !dashboardStats"
                        indeterminate
                    ></v-progress-circular>

                    <span v-else>
                        {{ dashboardStats.total_admins }}
                    </span>
                </template>

                <template #text>
                    <div class="text-h6 font-weight-light">Total admins</div>

                    <span class="mdi mdi-account-multiple text-xl"></span>
                </template>
            </info-card>

            <info-card>
                <template #top>
                    <v-progress-circular
                        v-if="isLoading || !dashboardStats"
                        indeterminate
                    ></v-progress-circular>

                    <span v-else>
                        {{ dashboardStats.total_super_admins }}
                    </span>
                </template>

                <template #text>
                    <div class="text-h6 font-weight-light">
                        Total super admins
                    </div>

                    <span class="mdi mdi-account-multiple text-xl"></span>
                </template>
            </info-card>

            <info-card class="">
                <template #top>
                    <v-progress-circular
                        v-if="isLoading || !dashboardStats"
                        indeterminate
                    ></v-progress-circular>

                    <span v-else>
                        {{ dashboardStats.total_videos }}
                    </span>
                </template>

                <template #text>
                    <router-link
                        class="flex items-end gap-3 transition-colors hover:text-primary-50"
                        :to="{ name: 'contents' }"
                    >
                        <div class="text-h6 font-weight-light">
                            Total contents
                        </div>

                        <span class="mdi mdi-play-circle text-xl"></span>
                    </router-link>
                </template>
            </info-card>
        </div>

        <div class="mb-10">
            <h2 class="mb-5 text-2xl font-bold">Last added contents</h2>

            <contents-table :loading="isLoading" :items="items" />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toastification';

    import InfoCard from '@/components/base/InfoCard.vue';
    import ContentsTable from '@/components/tables/ContentsTable.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { getDashboardStats } from '@/api/stats/dashboard-stats.api.ts';
    import type { VideoContent } from '@/ts/contents';
    import type { DashboardStats } from '@/ts/stats';

    const toast = useToast();

    const { profile } = storeToRefs(useAuthStore());

    const isLoading = ref(true);

    const dashboardStats = ref<DashboardStats>();

    const items = ref<VideoContent[]>([]);

    onMounted(async () => {
        try {
            dashboardStats.value = await getDashboardStats();

            if (dashboardStats.value?.latest_videos)
                items.value = dashboardStats.value.latest_videos;
        } catch (e) {
            toast.error('The dashboard statistics could not be found');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style></style>
