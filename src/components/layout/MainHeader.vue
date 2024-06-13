<template>
    <v-app-bar v-if="!lgAndUp" color="primary" prominent>
        <div class="container flex w-full items-center justify-between">
            <v-burger v-model="isOpen" @click="isOpen = !isOpen" />

            <div v-if="!lgAndUp" class="pr-5">
                <main-logo />
            </div>
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useDisplay } from 'vuetify';

    import MainLogo from '@/components/base/MainLogo.vue';
    import VBurger from '@/components/base/VBurger.vue';

    const { lgAndUp } = useDisplay();

    const props = defineProps<{ modelValue: boolean }>();
    const emits = defineEmits<{
        (e: 'update:modelValue', value: boolean): void;
    }>();

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
