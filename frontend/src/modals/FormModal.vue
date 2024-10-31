<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
        @click.self="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative transition-opacity duration-300"
            :class="{ 'opacity-100': visible, 'opacity-0': !visible }">
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                &times;
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>
