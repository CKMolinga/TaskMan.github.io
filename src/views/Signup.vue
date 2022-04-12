<template>
  <h2>Register Account</h2>
  <div class="flex-container">
      <img class="left-flex img-flex" src="../assets/Sign-up-icon.png" alt="sign-up icon">
      <div class="right-flex">
          <img src="../assets/logo.png" alt="logo" class="logo">
          <h3>Personal Information</h3>
          <form action="" method="">
              <label for="name">Fullname <span class="required">*</span></label>
                <input type="text" name="name" id="name" placeholder="Enter your fullname" required>
              <label for="name">Email <span class="required">*</span></label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required>
              <label for="name">Password <span class="required">*</span></label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required>
              <label for="name">Confirm Password <span class="required">*</span></label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm your password" required>
              <button type="submit" class="btn">Register</button>
              <p class="hint">Already have an account? <span class="hint"><router-link to="Login">Login</router-link></span></p>
          </form>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #42B883;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
}

.flex-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
  justify-content: space-evenly;
}
.left-flex {
  max-width: 30%;
  height: 100%;
}
.right-flex {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-flex {
  width: 50%;
  height: auto;
}
.logo {
  width: 15%;
  height: auto;
}
h3 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
}
form {
  width: 80%;
  height: auto;
}
label {
  font-size: 1.2rem;
font-weight: bold;
color: rgba(0, 0, 0, 0.651);
  margin-bottom: 0.5rem;
}
span.required {
  color: red;
}
input {
  width: 100%;
  height: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  outline: none;
}
button {
  width: 50%;
  height: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: #42B883;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}
span.hint a {
  color: #42B883;
}

@media screen and (max-width: 960px) {
.right-flex {
    width: 50%;
}
}

/* Medium screen devices  */
@media screen and (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
  .left-flex {
    display: none;
  }
  .right-flex {
    width: 80%;
    height: 100%;
  }
}

/* Mobile responsive styles  */

@media only screen and (max-width: 600px) {
  .flex-container {
    flex-direction: column;
  }
  .left-flex {
    display: none;
  }
  .right-flex {
    width: 100%;
    margin-bottom: 1rem;
    border: none;
  }
  h3 {
    font-size: 1.2rem;
  }
  form {
    width: 80%;
  }
  label {
    font-size: 1rem;
  }
    input {
        width: 100%;
        height: 1.5rem;
        padding: 0.5rem;
        margin-bottom: 1rem;
        outline: none;
    }

}
</style>