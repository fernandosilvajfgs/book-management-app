<template>
    <div class="admin-view p-5 min-h-screen bg-cover bg-center">
        <Navbar :isAdmin="true" />
        <BigCard>
            <BookSearch :isAdmin="true" />
        </BigCard>
    </div>
</template>

<script setup>
import Navbar from '../components/utils/Navbar.vue';
import BookSearch from '../components/BookList/BookSearch.vue';
import BigCard from '../components/utils/BigCard.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from '../stores/useBookStore';

const router = useRouter();
const isAdminLoggedIn = ref(!!localStorage.getItem('adminToken'));
const bookStore = useBookStore();

watch(isAdminLoggedIn, (newValue) => {
    if (!newValue) {
        router.push('/admin');
    }
});

const checkAdminToken = () => {
    isAdminLoggedIn.value = !!localStorage.getItem('adminToken');
};

setInterval(checkAdminToken, 1000);

</script>

<style scoped>
.admin-view {
    background-image: url('../assets/images/background.jpg');
}
</style>
