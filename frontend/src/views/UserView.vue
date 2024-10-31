<template>
    <div class="user-view p-5 min-h-screen bg-cover bg-center">
        <Navbar />
        <BigCard>
            <BookSearch />
        </BigCard>
        <BookDetailsModal />
    </div>
</template>

<script setup>
import Navbar from '../components/utils/Navbar.vue';
import BookSearch from '../components/BookList/BookSearch.vue';
import BigCard from '../components/utils/BigCard.vue';
import BookDetailsModal from '../modals/BookDetailsModal.vue';</script>


<style scoped>
.user-view {
    background-image: url('../assets/images/background.jpg');
}
</style>
