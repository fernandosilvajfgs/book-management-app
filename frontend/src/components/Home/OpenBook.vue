<template>
  <div :class="['book', { open: isOpen }]" @click="toggleBook">
    <div class="back"></div>
    <div class="page4">Hover over each button below to explore our features!</div>
    <div class="page3">⬇️⬇️</div>
    <div class="page2"></div>
    <div class="page1"></div>
    <div class="front">
      Click me! 👇
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleBook = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  background: #ccc;
}

.book {
  transform-style: preserve-3d;
  position: relative;
  height: 300px;
  cursor: pointer;
  backface-visibility: visible;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.book.open {
  transform: translateX(95px);
}

.front,
.back,
.page1,
.page2,
.page3,
.page4 {
  transform-style: preserve-3d;
  position: absolute;
  width: 200px;
  height: 100%;
  top: 0;
  left: 0;
  transform-origin: left center;
  transition: transform 0.5s ease-in-out, box-shadow 0.35s ease-in-out;
}

.front {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
  z-index: 5;
}

.front,
.back {
  background: rgb(46, 121, 182);
}

.front,
.page1,
.page3 {
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.back,
.page2,
.page4 {
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.page1 {
  background: #efefef;
}

.page2 {
  background: #efefef;
}

.page3 {
  background: #f5f5f5;
}

.page4 {
  background: #f5f5f5;

}

.page3,
.page4 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #555;
  text-align: center;
  padding: 10px;
}

.book.open .front {
  transform: rotateY(-160deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.book.open .page1 {
  transform: rotateY(-150deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.book.open .page2 {
  transform: rotateY(-30deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.book.open .page3 {
  transform: rotateY(-140deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.book.open .page4 {
  transform: rotateY(-40deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.book.open .back {
  transform: rotateY(-20deg) scale(1.1);
}
</style>