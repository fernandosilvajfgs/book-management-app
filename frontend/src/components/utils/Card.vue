<template>
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-2/3 max-w-xl mx-auto transform hover:scale-105"
        :class="{ 'cursor-pointer': !isAdmin }" @click="handleCardClick">
        <div
            :class="isAdmin ? 'flex flex-wrap items-center gap-4' : 'flex flex-col items-center text-center space-y-4'">
            <img :src="coverImageUrl" alt="Book Cover" class="w-24 h-32 object-cover rounded-lg shadow-md" />
            <div :class="isAdmin ? 'flex-1 min-w-[150px]' : 'mt-2 space-y-2'">
                <h3 class="text-xl font-semibold text-gray-800">{{ item.title }}</h3>
                <p class="text-sm font-medium text-gray-500">{{ item.author }}</p>
                <p class="text-sm font-medium text-gray-500">{{ item.publication_year }}</p>
                <p class="text-sm font-medium text-gray-500">{{ item.isbn }}</p>
            </div>

            <div v-if="isAdmin" class="flex space-x-2 items-center">
                <IconButton actionType="edit" label="Edit" @click.stop="editItem"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex justify-center items-center shadow-md hover:shadow-lg" />
                <IconButton actionType="delete" label="Delete" @click.stop="openDeleteConfirmation"
                    class="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 w-10 h-10 flex justify-center items-center shadow-md hover:shadow-lg" />
                <IconButton v-if="!item.cover_image_url" actionType="save" label="Generate Book Cover"
                    @click.stop="generateCover"
                    class="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 w-10 h-10 flex justify-center items-center shadow-md hover:shadow-lg" />
            </div>
        </div>

        <ConfirmationModal v-if="showDeleteModal" @confirm="confirmDelete" @cancel="cancelDelete" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { useBookStore } from '../../stores/useBookStore';
import ConfirmationModal from '../../modals/ConfirmationModal.vue';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import IconButton from './IconButton.vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const bookStore = useBookStore();
const showDeleteModal = ref(false);

const coverImageUrl = computed(() => {
    return props.item.cover_image_url || imageNotAvailable;
});

const handleCardClick = () => {
    if (!props.isAdmin) {
        bookStore.selectBookForDetails(props.item);
    }
};

const editItem = (event) => {
    event.stopPropagation();
    bookStore.selectBookForEdit(props.item);
};

const openDeleteConfirmation = () => {
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    bookStore.deleteBook(props.item.id);
    showDeleteModal.value = false;
};

const cancelDelete = () => {
    showDeleteModal.value = false;
};

const generateCover = async () => {
    try {
        await bookStore.generateBookCover(props.item.id);
        console.log(`Cover generated for book ID: ${props.item.id}`);
    } catch (error) {
        console.error(`Failed to generate cover for book ID: ${props.item.id}`, error);
    }
};
</script>
