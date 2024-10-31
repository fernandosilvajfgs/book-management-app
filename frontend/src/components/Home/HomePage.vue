<template>
  <div class="w-full h-2 bg-blue-500 absolute top-10"></div>

  <div class="flex w-full min-h-screen bg-white">
    <div
      :class="['w-1/3 flex items-center justify-center transition-all duration-500', hoveringUser ? 'bg-blue-100 shadow-lg' : 'bg-white']">
      <div v-if="hoveringUser"
        class="p-8 text-left space-y-4 animate-slideInLeft transform transition-transform duration-500">
        <h3 class="text-3xl font-bold text-blue-600 flex items-center space-x-2">
          <span>🚀</span>
          <span>User Features</span>
        </h3>
        <ul class="mt-4 space-y-3 text-gray-700 list-disc list-inside">
          <li class="flex items-center space-x-2">
            <span>📚</span>
            <span>View all the books</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>🔍</span>
            <span>Search your favorite books</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>📄</span>
            <span>View book details</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="w-1/3 flex flex-col items-center justify-center space-y-8">
      <h1 class="text-6xl font-extrabold text-blue-600">BookNest</h1>
      <p class="text-xl text-gray-600 italic">Your Personal Book Collection Manager</p>
      <div class="relative w-full flex justify-center items-center mt-4">
        <div class="w-auto sm:w-1/2 md:w-3/5 lg:w-1/3">
          <OpenBook />
        </div>
      </div>

      <div class="flex space-x-4 pt-5">
        <button @click="goToUserView" @mouseover="hoveringUser = true" @mouseleave="hoveringUser = false"
          class="w-48 h-14 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400">
          Enter as User
        </button>

        <button @click="goToAdminLogin" @mouseover="hoveringAdmin = true" @mouseleave="hoveringAdmin = false"
          class="w-48 h-14 px-6 py-3 text-lg font-semibold text-blue-500 bg-white border border-blue-500 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-400">
          Enter as Admin
        </button>
      </div>
    </div>

    <div
      :class="['w-1/3 flex items-center justify-center transition-all duration-500', hoveringAdmin ? 'bg-blue-700 shadow-lg' : 'bg-white']">
      <div v-if="hoveringAdmin"
        class="p-8 text-left space-y-4 animate-slideInRight transform transition-transform duration-500">
        <h3 class="text-3xl font-bold text-white flex items-center space-x-2">
          <span>🛠️</span>
          <span>Admin Features</span>
        </h3>
        <ul class="mt-4 space-y-3 text-gray-200 list-disc list-inside">
          <li class="flex items-center space-x-2">
            <span>➕</span>
            <span>Add new books</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>✏️</span>
            <span>Edit or delete books</span>
          </li>
          <li class="flex items-center space-x-2">
            <span>🎨</span>
            <span>Generate book covers</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="w-full h-2 bg-blue-500 absolute bottom-10"></div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import OpenBook from './OpenBook.vue';

const hoveringUser = ref(false);
const hoveringAdmin = ref(false);
const router = useRouter();

const goToUserView = () => {
  router.push('/user');
};

const goToAdminLogin = () => {
  router.push('/admin');
};
</script>
