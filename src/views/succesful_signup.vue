<template>
  <h2>Success!</h2>
  <div class="flex-container">
      <img class="left-flex img-flex" src="../assets/success.png" alt="sign-up icon">
      <p> You have succesfully signup, we are redirecting you to the 
          <span class="hint">
              <router-link to="/login">login page </router-link>
          </span> 
      </p>
  </div>
</template>

<script>

export default {
    // Redirect to login page after 3 seconds 
    mounted() {
        setTimeout(() => {
            this.$router.push('/login')
        }, 4000)
    }

  
}
</script>

<style scoped>
h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #42B883;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: capitalize;
}

.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
.left-flex {
  max-width: 38%;
}
h3 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
}
span.hint a {
    text-decoration: none;
  color: #42B883;
}
p {
  font-size: 1.3rem;
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
}

/* Medium screen devices  */
@media screen and (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
  .left-flex {
    max-width: 70%;
  }
}

/* Mobile responsive styles  */

@media only screen and (max-width: 600px) {
  .flex-container {
    flex-direction: column;
  }
  .left-flex {
    max-width: 90%;
  }
  
  h3 {
    font-size: 1.2rem;
  }

}
</style>