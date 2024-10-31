<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="flex flex-col items-center">
            <div class="loader book">
                <figure class="page"></figure>
                <figure class="page"></figure>
                <figure class="page"></figure>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBookStore } from '../../stores/useBookStore';
const bookStore = useBookStore();
const isVisible = computed(() => bookStore.loading);
</script>

<style scoped>
.loader {
    margin: auto;
}

.book {
    border: 4px solid #FFFFFF;
    width: 60px;
    height: 45px;
    position: relative;
    perspective: 150px;
}

.page {
    display: block;
    width: 30px;
    height: 45px;
    border: 4px solid #FFFFFF;
    border-left: 1px solid #445ea7;
    margin: 0;
    position: absolute;
    right: -4px;
    top: -4px;
    overflow: hidden;
    background: #445ea7;
    transform-style: preserve-3d;
    transform-origin: left center;
}

.book .page:nth-child(1) {
    animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 0s infinite;
}

.book .page:nth-child(2) {
    animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 0.6s infinite;
}

.book .page:nth-child(3) {
    animation: pageTurn 1.2s cubic-bezier(0, .39, 1, .68) 1.2s infinite;
}

@keyframes pageTurn {
    0% {
        transform: rotateY(0deg);
    }

    20% {
        background: #2d3d97;
    }

    40% {
        background: rgb(60, 62, 177);
        transform: rotateY(-180deg);
    }

    100% {
        background: rgb(60, 62, 177);
        transform: rotateY(-180deg);
    }
}
</style>