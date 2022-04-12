<template>
  <div class="home container">
    <nav class="flex-nav">
        <div class="left-flex">
          <img class="logo" src="../assets/logo.png" alt="logo">
          <h2>TaskMan</h2>
        </div>
        <ul class="right-flex">
            <li><router-link to="/" class="nav-items">Home</router-link></li>
            <li><router-link to="/login" class="nav-items">About</router-link></li>
            <li><router-link to="/signup" class="nav-items">User Manual</router-link></li>
        </ul>
    </nav>
    <main>
      <section class="hero-section">
        <img class="illustration" src="../assets/Time-management.png" alt="hero section illustration">
      </section>
      <section class="two">
        <h1>The Task Mangement App for local service providers</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, sit! Voluptatibus reprehenderit eius esse hic obcaecati necessitatibus molestias unde earum praesentium totam quasi quis omnis enim error repellendus dolores dolorem nostrum vel sapiente perferendis eum debitis, ab quisquam. Rerum minus necessitatibus soluta in quibusdam sapiente accusamus dicta nesciunt saepe numquam.</p>
        <div class="cta flex">
          <router-link to="Signup" class="btn">Get started</router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
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
li a:hover {
  text-decoration: underline;
  text-decoration-color: #42B883;
}
li a:focus {
  color: #42B883;
}
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}
.illustration {
  /* max-width: 80%; */
  height: 50vh;
}
.two {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}
.cta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
a.btn {
  width: 100%;
  height: 1.5rem;
  border-radius: 0.3rem;
  padding: 0.5rem 3rem;
  margin-bottom: 1rem;
  outline: none;
  color: #fff;
  background-color: #42B883;
  font-weight: bold;
  text-decoration: none;
}

</style>
