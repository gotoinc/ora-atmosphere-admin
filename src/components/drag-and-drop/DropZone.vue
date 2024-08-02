<template>
    <div
        :data-active="active"
        @dragenter.prevent="setActive"
        @dragover.prevent="setActive"
        @dragleave.prevent="setInactive"
        @drop.prevent="onDrop"
    >
        <slot :drop-zone-active="active"></slot>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';

    const emits = defineEmits<{
        (e: 'files-dropped', value: FileList): void;
    }>();

    const active = ref(false);
    let inActiveTimeout: ReturnType<typeof setTimeout> | undefined;
    const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

    // setActive and setInactive use timeouts, so that when you drag an item over a child element,
    // the dragleave event that is fired won't cause a flicker. A few ms should be plenty of
    // time to wait for the next dragenter event to clear the timeout and set it back to active.
    function setActive() {
        active.value = true;
        clearTimeout(inActiveTimeout);
    }

    function setInactive() {
        inActiveTimeout = setTimeout(() => {
            active.value = false;
        }, 50);
    }

    function onDrop(e: DragEvent) {
        setInactive();

        if (e.dataTransfer) {
            emits('files-dropped', e.dataTransfer.files);
        }
    }

    function preventDefaults(e: Event) {
        e.preventDefault();
    }

    onMounted(() => {
        events.forEach((eventName) => {
            document.body.addEventListener(eventName, preventDefaults);
        });
    });

    onUnmounted(() => {
        events.forEach((eventName) => {
            document.body.removeEventListener(eventName, preventDefaults);
        });
    });
</script>
