<template>
    <div class="border border-dashed border-gray-500 rounded-xl">
        <div class="flex flex-col text-center" 
        :data-active="active"
        @drop.prevent="onDrop"
        @dragenter.prevent="setActive"
        @dragover.prevent="setActive"
        @dragleaver.prevent="setActive"
        >
            <slot :dropZoneActive="active"></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
const emit = defineEmits(['files-dropped']);

let active = ref(false);
let inActiveTimeout = null

function setActive() {
    active.value = true;
    clearTimeout(inActiveTimeout);
}

function setInactive() {
    inActiveTimeout = setTimeout(() => {
        active.value = false;
    }, 50)
}

function onDrop(e) {
    emit('files-dropped', [...e.dataTransfer.files]);
}

function preventDefaults(e) {
    setInactive();
    e.preventDefault();
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>

