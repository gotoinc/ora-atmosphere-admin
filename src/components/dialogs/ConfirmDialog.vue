<template>
    <v-dialog v-model="isOpen" max-width="400">
        <div class="rounded-lg bg-dark p-7 text-center shadow-2xl">
            <h3 class="mb-5 text-xl font-semibold">
                {{ title }}
            </h3>

            <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                <v-btn
                    color="primary"
                    variant="outlined"
                    class="text-none flex-grow"
                    @click="isOpen = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    :loading="loading"
                    class="text-none flex-grow"
                    color="primary"
                    @click="emits('confirm')"
                >
                    Yes
                </v-btn>
            </div>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface Props {
        modelValue: boolean;
        title?: string;
        loading?: boolean;
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
        (e: 'confirm'): void;
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
