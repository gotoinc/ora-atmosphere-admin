<template>
    <aside
        ref="sidebarElement"
        :class="{ invisible: !isExpand }"
        class="fixed left-0 top-0 z-20 h-screen w-64"
    >
        <v-navigation-drawer v-model="isExpand" color="rgb(73, 90, 255)">
            <div v-if="lgAndUp" class="p-5">
                <main-logo />
            </div>

            <v-divider></v-divider>

            <v-list nav>
                <div v-if="profile" class="mb-1 flex items-center gap-1">
                    <div
                        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50"
                    >
                        <v-icon icon="mdi-account"></v-icon>
                    </div>

                    <v-list-item
                        :subtitle="profile.email"
                        :title="`${profile.first_name} ${profile.last_name}`"
                        value="profile"
                        :to="{ name: 'profile' }"
                    ></v-list-item>
                </div>

                <v-skeleton-loader
                    v-else
                    color="primary"
                    class="mb-2 w-full"
                    type="list-item-avatar"
                />

                <v-divider></v-divider>

                <v-list-item
                    :to="{ name: 'dashboard' }"
                    prepend-icon="mdi-home"
                    title="Dashboard"
                    value="dashboard"
                ></v-list-item>

                <v-list-item
                    :to="{ name: 'contents' }"
                    prepend-icon="mdi-video-vintage"
                    title="Contents"
                    value="contents"
                ></v-list-item>

                <v-list-item
                    :to="{ name: 'catalogView' }"
                    prepend-icon="mdi-shape-outline"
                    title="Catalog"
                    value="categories"
                ></v-list-item>

                <v-list-item
                    v-if="isSuperAdmin"
                    :to="{ name: 'usersView' }"
                    prepend-icon="mdi-account-group"
                    title="Users"
                    value="users"
                ></v-list-item>
            </v-list>

            <template #append>
                <v-list nav>
                    <v-list-item
                        title="Logout"
                        prepend-icon="mdi-logout"
                        value="logout"
                        @click="isDialogOpen = true"
                    ></v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <teleport to="body">
            <v-dialog v-model="isDialogOpen" max-width="400">
                <div
                    class="flex min-h-48 items-center justify-center rounded-lg bg-dark p-5 text-center shadow-2xl"
                >
                    <div>
                        <h3 class="mb-10 text-xl font-semibold">
                            Are you sure you want to logout?
                        </h3>

                        <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                            <v-btn
                                color="primary"
                                variant="outlined"
                                class="text-none flex-grow"
                                @click="isDialogOpen = false"
                            >
                                Cancel
                            </v-btn>

                            <v-btn
                                class="text-none flex-grow"
                                color="primary"
                                :loading="isLoading"
                                @click="handleLogout"
                            >
                                Yes, logout
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-dialog>
        </teleport>
    </aside>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useDisplay } from 'vuetify';

    const { lgAndUp } = useDisplay();

    import { useRouter } from 'vue-router';

    import MainLogo from '@/components/base/MainLogo.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    interface Props {
        modelValue: boolean;
    }

    interface Emits {
        (event: 'update:modelValue', value: boolean): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const router = useRouter();
    const authStore = useAuthStore();
    const { profile, isSuperAdmin } = storeToRefs(authStore);

    const isExpand = computed({
        get() {
            return props.modelValue;
        },

        set(value) {
            emits('update:modelValue', value);
        },
    });

    const isDialogOpen = ref(false);
    const isLoading = ref(false);

    const handleLogout = () => {
        isLoading.value = true;

        try {
            // await logout();
            authStore.clearAuth();

            void router.push({ name: 'auth' });
        } finally {
            isLoading.value = false;
        }
    };

    if (
        !profile.value &&
        router.currentRoute.value.name !== 'profileInfoView'
    ) {
        void authStore.getProfileInfo();
    }

    const sidebarElement = ref<HTMLElement>();
</script>

<style scoped></style>
