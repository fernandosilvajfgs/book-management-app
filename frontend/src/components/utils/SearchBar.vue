<template>

    <div class="search-bar">
        <input v-model="localQuery" @input="onInput" :placeholder="placeholder"
            class="w-1/3 p-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Search...',
    },
});

const emit = defineEmits(['update:modelValue']);

const localQuery = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    localQuery.value = newValue;
});

const onInput = () => {
    emit('update:modelValue', localQuery.value);
};
</script>