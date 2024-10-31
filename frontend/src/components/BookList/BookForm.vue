<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">{{ modalTitle }}</h2>

        <div class="border-b border-gray-300 mb-6"></div>

        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label>ISBN</label>
                <input v-model="isbn" class="w-full p-2 border rounded" type="text" required @blur="validateISBN" />
                <p v-if="isbnError" class="text-red-500 text-sm">{{ isbnError }}</p>
            </div>

            <div class="mb-4">
                <label>Title</label>
                <input v-model="title" class="w-full p-2 border rounded" type="text" required />
            </div>

            <div class="mb-4">
                <label>Author</label>
                <input v-model="author" class="w-full p-2 border rounded" type="text" required />
            </div>

            <div class="mb-4 relative">
                <label>Publication Year</label>
                <input v-model="publicationYear" @focus="showYearDropdown = true" @blur="hideYearDropdown"
                    @input="validateYear" class="w-full p-2 border rounded" type="text" required />
                <p v-if="yearError" class="text-red-500 text-sm">{{ yearError }}</p>

                <ul v-if="showYearDropdown"
                    class="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto mt-1 z-10"
                    @mousedown.prevent>
                    <li v-for="year in yearsRange" :key="year" @click="selectYear(year)"
                        class="px-4 py-2 cursor-pointer hover:bg-gray-200">
                        {{ year }}
                    </li>
                </ul>
            </div>

            <div class="mb-4 relative">
                <label class="block text-gray-700">Language</label>
                <input v-model="languageQuery" @focus="showLanguageDropdown = true" @input="filterLanguages"
                    class="w-full p-2 border rounded" type="text" required autocomplete="off" />
                <ul v-if="showLanguageDropdown && filteredLanguages.length"
                    class="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto mt-1 z-10">
                    <li v-for="lang in filteredLanguages" :key="lang" @click="selectLanguage(lang)"
                        class="px-4 py-2 cursor-pointer hover:bg-gray-200">
                        {{ lang }}
                    </li>
                </ul>
            </div>

            <div class="mb-4" v-if="!id">
                <label class="block text-gray-700">
                    <input type="checkbox" v-model="generateCover" class="mr-2" />
                    Generate Book Cover?
                </label>
            </div>

            <div class="flex justify-end">
                <ActionButton :disabled="!isFormChanged" actionType="save" label="Save" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useBookStore } from '../../stores/useBookStore';
import ActionButton from '../utils/ActionButton.vue';

const bookStore = useBookStore();

const id = ref(null);
const isbn = ref('');
const title = ref('');
const author = ref('');
const publicationYear = ref('');
const languageQuery = ref('');
const generateCover = ref(false);

const initialValues = ref({ isbn: '', title: '', author: '', publicationYear: '', languageQuery: '' });

const isbnError = ref('');
const yearError = ref('');
const currentYear = new Date().getFullYear();

const showYearDropdown = ref(false);
const yearsRange = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

const validateISBN = () => {
    if (!/^\d{13}$/.test(isbn.value)) {
        isbnError.value = 'ISBN must be exactly 13 digits.';
        return;
    }

    const duplicateISBN = bookStore.books.some(
        (book) => book.isbn === isbn.value && book.id !== id.value
    );

    if (duplicateISBN) {
        isbnError.value = 'This ISBN already exists.';
    } else {
        isbnError.value = '';
    }
};

const validateYear = () => {
    const year = Number(publicationYear.value);
    yearError.value = year > currentYear || year < 0 ? `Enter a valid year up to ${currentYear}.` : '';
};

const selectYear = (year) => {
    publicationYear.value = year;
    showYearDropdown.value = false;
};

const hideYearDropdown = () => {
    setTimeout(() => {
        showYearDropdown.value = false;
    }, 200);
};

const showLanguageDropdown = ref(false);
const languageOptions = [
    'English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Russian', 'Italian', 'Portuguese'
];
const filteredLanguages = ref(languageOptions);

const filterLanguages = () => {
    filteredLanguages.value = languageOptions.filter((lang) =>
        lang.toLowerCase().includes(languageQuery.value.toLowerCase())
    );
};

const selectLanguage = (lang) => {
    languageQuery.value = lang;
    showLanguageDropdown.value = false;
};

const resetForm = () => {
    id.value = null;
    isbn.value = '';
    title.value = '';
    author.value = '';
    publicationYear.value = '';
    languageQuery.value = '';
    generateCover.value = false;
    initialValues.value = {
        isbn: '',
        title: '',
        author: '',
        publicationYear: '',
        languageQuery: '',
    };
};

watch(
    () => bookStore.selectedBook,
    (newBook) => {
        if (newBook) {
            id.value = newBook.id || null;
            isbn.value = newBook.isbn || '';
            title.value = newBook.title || '';
            author.value = newBook.author || '';
            publicationYear.value = newBook.publication_year || '';
            languageQuery.value = newBook.language || '';
            generateCover.value = false;
            initialValues.value = {
                isbn: isbn.value,
                title: title.value,
                author: author.value,
                publicationYear: publicationYear.value,
                languageQuery: languageQuery.value,
            };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const isFormChanged = computed(() => {
    return (
        isbn.value !== initialValues.value.isbn ||
        title.value !== initialValues.value.title ||
        author.value !== initialValues.value.author ||
        publicationYear.value !== initialValues.value.publicationYear ||
        languageQuery.value !== initialValues.value.languageQuery
    );
});

const modalTitle = computed(() => (id.value ? 'Edit Book' : 'Add Book'));

const submitForm = () => {
    validateISBN();
    validateYear();

    if (isbnError.value || yearError.value) return;

    const payload = {
        isbn: isbn.value,
        title: title.value,
        author: author.value,
        publication_year: publicationYear.value,
        language: languageQuery.value,
        generateCover: generateCover.value,
    };

    if (id.value) {
        payload.id = id.value;
        if (bookStore.selectedBook.cover_image_url) {
            payload.cover_image_url = bookStore.selectedBook.cover_image_url;
        }
        bookStore.updateBook(payload);
    } else {
        bookStore.saveBook(payload);
    }

    resetForm();
};
</script>
