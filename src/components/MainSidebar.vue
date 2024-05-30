<template>
    <aside>
        <v-navigation-drawer v-model="isExpand" color="rgb(73, 90, 255)">
            <div v-if="lgAndUp" class="p-5">
                <main-logo />
            </div>

            <v-divider></v-divider>

            <v-list nav>
                <div class="flex items-center gap-1">
                    <div
                        class="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-50"
                    >
                        <v-icon icon="mdi-account"></v-icon>
                    </div>

                    <v-list-item
                        subtitle="test@gmail.com"
                        title="Philippe Walter"
                        value="profile"
                        :to="{ name: 'profile' }"
                    ></v-list-item>
                </div>

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
            </v-list>

            <template #append>
                <v-list nav>
                    <v-list-item
                        title="Logout"
                        prepend-icon="mdi-logout"
                        value="logout"
                    ></v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>
    </aside>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useDisplay } from 'vuetify';

    const { lgAndUp } = useDisplay();

    import MainLogo from '@/components/base/MainLogo.vue';

    interface Props {
        modelValue: boolean;
    }

    interface Emits {
        (event: 'update:modelValue', value: boolean): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const isExpand = computed({
        get() {
            return props.modelValue;
        },

        set(value) {
            emits('update:modelValue', value);
        },
    });
</script>

<style scoped></style>
