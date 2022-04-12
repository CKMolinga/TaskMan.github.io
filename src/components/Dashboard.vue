<template>
  <div class="container">
      <nav class="sidebar">
          <ul class="sidebar-menu">
                <li class="sidebar-menu__item">
                    <router-link to="/dashboard" class="sidebar-menu__link">
                        <img src="../assets/logo.png" alt="logo" class="logo">
                    </router-link>
                </li>
                <li class="sidebar-menu__item menu-icon">
                    <router-link to="/dashboard" class="sidebar-menu__link">
                        <span class="material-icons">work</span>
                    </router-link>
                </li>
                <li class="sidebar-menu__item menu-icon">
                    <router-link to="/dashboard" class="sidebar-menu__link">
                        <span class="material-icons">people</span>
                    </router-link>
                </li>
                <li class="sidebar-menu__item menu-icon">
                    <router-link to="/dashboard" class="sidebar-menu__link">
                        <span class="material-icons">notifications</span>
                    </router-link>
                </li>
          </ul>
          <router-link to="/dashboard">
            <div class="profile-img"></div>
          </router-link>
      </nav>
      <main class="left-flex">
          <section class="top">
              <div class="add-task">
                  <router-link to="/dashboard">New Task</router-link>
              </div>
              <div class="logout-trigger">
                    <router-link to="/login">Logout</router-link>
                    <router-link to="/login">
                        <span class="material-icons">logout</span>
                    </router-link>
              </div>
          </section>
      </main>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 1rem;

}
nav.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    width: 14vw;
    height: 100%;
    background: #42B883;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
ul.sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}
ul.sidebar-menu li {
    margin: 1rem 0;
}
ul.sidebar-menu li a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    color: #fff;
    text-decoration: none;
}
ul.sidebar-menu li a:hover {
    color: #fff;
}
ul.sidebar-menu li a .material-icons {
    font-size: 1.5rem;
    margin-right: 0.5rem;
}
ul.sidebar-menu li.menu-icon a:hover {
    background: none;
    transform: scale(1.1);
}
.logo {
    width: 50%;
    height: auto;
}
.profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #fff;
    margin-bottom: 1rem;
    background-image: url('../assets/profile.jpg');
    background-size: cover;
    background-position: center;

}
.profile-img:hover {
    transform: scale(1.1);
}
main.left-flex {
    width: 85vw;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
section.top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 5rem;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}
.add-task {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    color: #fff;
    background-color: #292F4C;
    border-radius: 0.2rem; 
}
.add-task a {
    color: #fff;
    text-decoration: none;
}
.logout-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    color: #292F4C;
}
.logout-trigger a {
    color: #292F4C;
    text-decoration: none;
    padding: 0.5rem 0.2rem;
}
</style>