<template>
  <transition name="smooth-in">
    <router-view />
  </transition>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

.smooth-in-enter-from {
  opacity: 0;
}

.smooth-in-enter-active,
.smooth-in-leave-active {
  transition: all 2s ease;
}

.smooth-in-leave-to {
  opacity: 0;
}

body {
  background: #fff;
}
#app {
  font-family: "Ubuntu", sans-serif;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* max-width: 800px; */
  margin: 0 auto;
  color: #555;
}
</style>
