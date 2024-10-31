<template>
  <div id="app">
    <router-view />
  </div>

  <Loader v-if="isLoading" />

</template>

<script setup>
import Loader from './components/utils/Loader.vue';
import { useBookStore } from './stores/useBookStore';
import { computed } from 'vue';


const bookStore = useBookStore();

const isLoading = computed(() => bookStore.loading);


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
