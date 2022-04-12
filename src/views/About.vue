<template>

<div class="container">
  <Navbar></Navbar>
  <h1>Coming Soon</h1>
</div>

</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'About',
  components: {Navbar}
}
</script>

<style scoped>
.container {
  max-width: 1025px;
  margin: 0 auto;
}
</style>