<template>
    <button @click="handleClick" :class="[
        baseClasses,
        computedClass,
        disabled ? 'cursor-not-allowed bg-gray-300' : 'transform hover:scale-105'
    ]" :disabled="disabled">
        {{ label }}
    </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    actionType: {
        type: String,
        required: true,
        validator: (value) => ['add', 'edit', 'delete', 'save', 'exit', 'cancel'].includes(value),
    },
    label: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
    if (!props.disabled) {
        event.stopPropagation();
        emit('click', event);
    }
};

const baseClasses = 'px-6 py-2 text-white rounded-lg shadow-md transition duration-300';

const computedClass = computed(() => {
    if (props.disabled) return '';

    switch (props.actionType) {
        case 'add':
            return 'bg-green-600 hover:bg-green-700';
        case 'edit':
            return 'bg-blue-500 hover:bg-blue-600';
        case 'delete':
            return 'bg-red-500 hover:bg-red-600';
        case 'save':
            return 'bg-indigo-500 hover:bg-indigo-600';
        case 'exit':
            return 'bg-blue-500 hover:bg-blue-700';
        default:
            return 'bg-gray-500 hover:bg-gray-600';
    }
});
</script>
