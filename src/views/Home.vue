<template>
  <div class="home container">
    <Navbar></Navbar>
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
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {Navbar}
}
</script>

<style scoped>
.container {
  max-width: 1025px;
  margin: 0 auto;
}
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  background: #2F3136;
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

@media (max-width: 767.98px){
  .hero-section {
    background: #2F3136;
  }
  .illustration {
    height: 45vh;
  }
  .two {
    padding: 0 0.1rem;
  }
  h1 {
    font-size: 1.4rem;
  }
}
</style>
