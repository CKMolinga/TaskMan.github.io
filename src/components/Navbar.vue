<template>
  <div class="container">
      <nav class="flex-nav">
        <div class="left-flex">
          <img class="logo" src="../assets/logo.png" alt="logo">
          <h2>TaskMan</h2>
        </div>
        <ul class="right-flex">
            <li><router-link to="/" class="nav-items">Home</router-link></li>
            <li><router-link to="/about" class="nav-items">About</router-link></li>
            <li><router-link to="/user-manual" class="nav-items">User Manual</router-link></li>
        </ul>
    </nav>
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped>
.container {
  max-width: 1025px;
  margin: 0 auto;
}
.flex-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}
.left-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  max-width: 30%;
  height: 100%;
}
.right-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  max-width: 40%;
  height: 100%;
}
.logo {
  width: 35%;
  height: auto;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline-block;
  margin-right: 1rem;
}
li a {
  color: #000;
  text-decoration: none;
}

/* LoVe HAte  */

li a:hover {
  text-decoration: underline;
  text-decoration-color: #42B883;
}

</style>