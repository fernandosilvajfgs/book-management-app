<template>
    <div class="card-list">
        <div v-if="items.length > 0" class="flex flex-col gap-4 items-center">
            <Card v-for="(item, index) in items" :key="item.id || index" :item="item" :is-admin="isAdmin" />
        </div>
        <p v-else class="mt-4 text-gray-500">No books found.</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Card from './Card.vue';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});
</script>