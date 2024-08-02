<template>
    <v-dialog v-model="isOpen" persistent max-width="400">
        <div class="rounded-lg bg-dark p-7 text-center shadow-2xl">
            <template v-if="loading">
                <div class="relative mb-5 h-20">
                    <v-loader />
                </div>

                <h3 class="text-xl font-semibold">
                    {{ loadingTitle }}
                </h3>
            </template>

            <template v-else-if="success">
                <v-icon
                    icon="mdi-check-circle-outline"
                    size="60"
                    color="green"
                    class="mx-auto mb-4"
                />

                <h3 class="mb-5 text-xl font-semibold">
                    {{ successTitle }}
                </h3>

                <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                    <v-btn
                        color="primary"
                        class="text-none flex-grow"
                        @click="emits('close')"
                    >
                        Close
                    </v-btn>
                </div>
            </template>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    import VLoader from '@/components/base/VLoader.vue';

    interface Props {
        modelValue: boolean;
        title?: string;
        success?: boolean;
        successTitle?: string;
        loadingTitle?: string;
        loading?: boolean;
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
        (e: 'close'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        title: 'Are you sure?',
    });
    const emits = defineEmits<Emits>();

    const isOpen = computed({
        get() {
            return props.modelValue;
        },

        set(value) {
            emits('update:modelValue', value);
        },
    });
</script>

<style scoped></style>
