<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600">Admin Login</h2>

      <button @click="goHome"
        class="w-full px-4 py-2 font-semibold text-blue-600 bg-transparent border border-blue-600 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Back to Home
      </button>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-gray-600">Username</label>
          <input v-model="username" type="text" placeholder="Enter your username"
            class="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-gray-600">Password</label>
          <input v-model="password" type="password" placeholder="Enter your password"
            class="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit"
          class="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Login
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      localStorage.setItem('adminToken', token);

      errorMessage.value = '';
      router.push('/admin-view');
    } else {
      errorMessage.value = 'Invalid username or password.';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    errorMessage.value = 'Failed to login. Please try again later.';
  }
};

const goHome = () => {
  router.push('/');
};
</script>
