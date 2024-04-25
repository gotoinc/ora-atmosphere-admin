<template>
    <div class="burger" :class="{ active: modelValue }" @click="emits('click')">
        <svg viewBox="0 0 100 100">
            <path
                class="top"
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            ></path>

            <path class="middle" d="m 70,50 h -40"></path>

            <path
                class="bottom"
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            ></path>
        </svg>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        modelValue: boolean;
    }

    interface Emits {
        (event: 'click'): void;
    }

    defineProps<Props>();

    const emits = defineEmits<Emits>();
</script>

<style scoped lang="postcss">
    .burger {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;

            path {
                fill: none;
                transition:
                    stroke-dasharray 0.4s,
                    stroke-dashoffset 0.4s;
                stroke: #fff;
                stroke-width: 4;
                stroke-linecap: round;

                &.top {
                    stroke-dasharray: 40 121;
                }

                &.bottom {
                    stroke-dasharray: 40 121;
                }
            }
        }

        &.active {
            transform: rotate(45deg);

            svg path {
                &.top {
                    stroke-dashoffset: -68px;
                }

                &.bottom {
                    stroke-dashoffset: -68px;
                }
            }
        }
    }
</style>
