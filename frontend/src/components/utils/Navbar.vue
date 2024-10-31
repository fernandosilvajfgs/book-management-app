<template>
    <nav class="bg-blue-400 text-white px-4 py-4 flex justify-between items-center rounded-2xl">
        <div class="flex items-center">
            <span class="font-bold text-xl">BookNest 📚</span>
        </div>

        <div>
            <ActionButton v-if="!isAdmin" @click="goHome" actionType="exit" label="Back to Home" />
            <ActionButton v-if="isAdmin" @click="logout" actionType="exit" label="Logout" />
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import ActionButton from './ActionButton.vue';
const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const router = useRouter();

const goHome = () => {
    router.push('/');
};

const logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
};
</script>
