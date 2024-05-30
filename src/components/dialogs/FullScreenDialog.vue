<template>
    <v-dialog
        v-model="isDialogOpen"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <v-card>
            <v-toolbar class="mb-5" color="primary">
                <div class="container flex items-center">
                    <v-toolbar-title>
                        {{ title }}
                    </v-toolbar-title>

                    <v-btn
                        icon="mdi-close"
                        @click="isDialogOpen = false"
                    ></v-btn>
                </div>
            </v-toolbar>

            <div class="container flex-grow">
                <slot></slot>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface Props {
        title: string;
        modelValue: boolean;
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const isDialogOpen = computed({
        get() {
            return props.modelValue;
        },

        set(value) {
            emits('update:modelValue', value);
        },
    });
</script>

<style scoped></style>
