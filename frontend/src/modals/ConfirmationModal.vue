<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this book?</h2>
            <div class="flex justify-center space-x-4">
                <ActionButton @click="confirm" actionType="delete" label="Yes" />
                <ActionButton @click="cancel" actionType="cancel" label="No" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import ActionButton from '../components/utils/ActionButton.vue';
const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
    emit('confirm');
};

const cancel = () => {
    emit('cancel');
};
</script>
