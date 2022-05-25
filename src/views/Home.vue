<template>
  <div class="home container">
    <Navbar></Navbar>
    <main>
      <section class="hero-section">
        <img
          class="illustration"
          src="../assets/Time-management.png"
          alt="hero section illustration"
        />
      </section>
      <section class="two">
        <h1>Best Solution For Local Service Providers</h1>
        <p>
          TaskMan is the best solution for local services providers in Cameroon
          to manage tasks, as well as assigned tasks to workers. Be Productive
          as a service provider while going about your busy daily schedule. Keep
          track of tasks and their status from your device.
        </p>
        <div class="cta flex">
          <router-link to="Signup" class="btn">Get started</router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: { Navbar },
};
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
  background: #2f3136;
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
  background-color: #42b883;
  font-weight: bold;
  text-decoration: none;
}

@media (max-width: 767.98px) {
  .hero-section {
    background: #2f3136;
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
