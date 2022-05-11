<template>
<div class="container">
    <nav class="flex-nav">
        <div class="left-flex">
            <img class="logo" src="../assets/logo.png" alt="logo">
            <h2>TaskMan</h2>
        </div>
        <ul class="right-flex">
            <li>
                <router-link to="/" class="nav-items">Home</router-link>
            </li>
            <li>
                <router-link to="/about" class="nav-items">About</router-link>
            </li>
            <li>
                <router-link to="/user-manual" class="nav-items">User Manual</router-link>
            </li>
        </ul>
        <!-- Hamburger Menu -->
        <div class="hamburger-menu" >
            <span class="material-icons" @click="toggleMenu">
                menu
            </span>
        </div>
    </nav>
    <ul class="mobile-menu">
            <li>
                <router-link to="/" class="nav-items">Home</router-link>
            </li>
            <li>
                <router-link to="/about" class="nav-items">About</router-link>
            </li>
            <li>
                <router-link to="/user-manual" class="nav-items">User Manual</router-link>
            </li>
        </ul>
</div>
</template>

<script>
export default {
  setup() {
    return {
      // hide the hamburger menu
      // isMenuOpen: false,
     
      // toggle the hamburger menu
      toggleMenu() {
        document.querySelector('.mobile-menu').classList.toggle('open');

      }

    }
  }
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
.hamburger-menu {
    display: none;
    cursor: pointer;
    margin-right: 1rem;
}

.mobile-menu {
    display: none;
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

@media (max-width: 767.98px){
  .right-flex {
    display: none;
  }
  .hamburger-menu {
    display: block;
  }
  .hamburger-menu:hover {
    color: #42B883;
  }
  .open {
    display: flex;
    flex-direction: column;
    height: 15vh;
    padding: 0 1rem;
  }
  ul li {
    display: block;
    margin-bottom: 1rem;
    }
}
</style>
