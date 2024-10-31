<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        @click.self="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button @click="closeModal"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close Modal">
                &times;
            </button>
            <div class="flex flex-col items-center mb-4">
                <img :src="bookCoverUrl" alt="Book Cover" class="w-32 h-48 object-cover mb-4 shadow-md" />
                <h2 class="text-2xl font-bold text-center mb-2">{{ book.title }}</h2>
                <p class="text-gray-600 italic">{{ book.author }}</p>
            </div>

            <div class="border-t border-gray-200 pt-4">
                <p class="mb-2"><strong>ISBN:</strong> {{ book.isbn }}</p>
                <p class="mb-2"><strong>Publication Year:</strong> {{ book.publication_year }}</p>
                <p class="mb-2"><strong>Language:</strong> {{ book.language }}</p>
                <div class="mt-4">
                    <strong>Summary:</strong>
                    <p class="mt-1">{{ book.summary }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBookStore } from '../stores/useBookStore';
import defaultImage from '../assets/images/imageNotAvailable.png';

const bookStore = useBookStore();

const visible = computed(() => bookStore.showDetailsModal);
const book = computed(() => bookStore.selectedBook);

const closeModal = () => {
    bookStore.closeDetailsModal();
};

const bookCoverUrl = computed(() => {
    return book.value.cover_image_url || defaultImage;
});
</script>
