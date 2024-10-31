<template>
    <h1 class="text-4xl font-bold text-gray-800">{{ pageTitle }}</h1>
    <div class="book-search p-5">
        <SearchBar v-model="bookStore.query" placeholder="Search by title, author, or ISBN" />
        <div class="mb-4" v-if="isAdmin">
            <ActionButton actionType="add" label="Add Book" @click="bookStore.openAddForm" />
        </div>

        <CardList :items="bookStore.paginatedBooks" :is-admin="isAdmin" />

        <div class="mt-6 flex justify-end items-center gap-4">
            <label for="pageSize" class="mr-2">Books per page:</label>
            <select id="pageSize" v-model="bookStore.pageSize" @change="changePageSize"
                class="p-1 border border-gray-300 rounded">
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="15">15</option>
            </select>

            <div v-if="bookStore.totalPages > 1" class="flex items-center">
                <button @click="previousPage" :disabled="bookStore.currentPage === 1"
                    class="bg-gray-200 px-4 py-2 mx-1 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    &lt;
                </button>
                <span class="px-2">Page {{ bookStore.currentPage }} of {{ bookStore.totalPages }}</span>
                <button @click="nextPage" :disabled="bookStore.currentPage === bookStore.totalPages"
                    class="bg-gray-200 px-4 py-2 mx-1 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    &gt;
                </button>
            </div>
        </div>

        <FormModal v-if="isAdmin" :visible="bookStore.showEditModal" @close="bookStore.closeEditForm">
            <BookForm />
        </FormModal>
    </div>
</template>

<script setup>
import { onMounted, defineProps, computed } from 'vue';
import { useBookStore } from '../../stores/useBookStore';
import SearchBar from '../utils/SearchBar.vue';
import CardList from '../utils/CardList.vue';
import BookForm from './BookForm.vue';
import ActionButton from '../utils/ActionButton.vue';
import FormModal from '../../modals/FormModal.vue';
const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const bookStore = useBookStore();

const pageTitle = computed(() => (props.isAdmin ? 'Admin Panel' : 'Book List'));

onMounted(() => {
    bookStore.fetchBooks();
});

const changePageSize = () => {
    bookStore.setPageSize(parseInt(bookStore.pageSize));
};

const previousPage = () => {
    bookStore.setCurrentPage(bookStore.currentPage - 1);
};

const nextPage = () => {
    bookStore.setCurrentPage(bookStore.currentPage + 1);
};
</script>
