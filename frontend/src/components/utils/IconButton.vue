<template>
    <button @click="handleClick"
        :class="[computedClass, 'p-4 rounded-full text-white shadow-md transition duration-300 transform hover:scale-105']"
        :disabled="disabled">
        <font-awesome-icon v-if="actionType === 'save'" :icon="['fas', 'image']" />
        <font-awesome-icon v-else-if="actionType === 'edit'" :icon="['fas', 'edit']" />
        <font-awesome-icon v-else-if="actionType === 'delete'" :icon="['fas', 'trash']" />
        <font-awesome-icon v-else-if="actionType === 'confirm'" :icon="['fas', 'check']" />
        <font-awesome-icon v-else-if="actionType === 'cancel'" :icon="['fas', 'times']" />
    </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faImage, faEdit, faTrash, faCheck, faTimes);

const props = defineProps({
    actionType: {
        type: String,
        required: true,
        validator: (value) => ['add', 'edit', 'delete', 'save', 'cancel'].includes(value),
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

const computedClass = computed(() => {
    if (props.disabled) return 'bg-gray-300 cursor-not-allowed';

    switch (props.actionType) {
        case 'add':
            return 'bg-green-600 hover:bg-green-700';
        case 'edit':
            return 'bg-blue-500 hover:bg-blue-600';
        case 'delete':
            return 'bg-red-500 hover:bg-red-600';
        case 'save':
            return 'bg-indigo-500 hover:bg-indigo-600';
        default:
            return 'bg-gray-500 hover:bg-gray-600';
    }
});
</script>
