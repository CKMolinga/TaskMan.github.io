<template>
  <div class="container">
    <nav class="sidebar">
      <ul class="sidebar-menu">
        <li class="sidebar-menu__item">
          <router-link to="/dashboard" class="sidebar-menu__link">
            <img src="../assets/logo.png" alt="logo" class="logo" />
          </router-link>
        </li>
        <li class="sidebar-menu__item menu-icon">
          <router-link to="/dashboard" class="sidebar-menu__link">
            <span class="material-icons">work</span>
          </router-link>
        </li>
        <li class="sidebar-menu__item menu-icon">
          <router-link to="/add-member" class="sidebar-menu__link">
            <span class="material-icons">people</span>
          </router-link>
        </li>
        <li class="sidebar-menu__item menu-icon">
          <router-link to="/notifications" class="sidebar-menu__link disabled">
            <span class="material-icons">notifications</span>
          </router-link>
        </li>
      </ul>
      <div class="profile-items">
        <div class="profile-img"></div>
        <h4>Hello {{ user.displayName }}</h4>
      </div>
    </nav>

    <main class="left-flex">
      <!--  RESPONSIVE HEADER  -->
      <div class="responsive-design">
        <div class="responsive-header flex-mobile-header">
          <div class="mobile-view-header-logo">
            <img src="../assets/logo.png" alt="logo" class="logo" />
          </div>

          <div class="hamburger-menu">
            <span class="material-icons hamburger-menu" @click="toggleMenu"
              >menu</span
            >
          </div>
        </div>
      </div>

      <div class="dropDown-menu">
        <ul class="dropDown-menu__list">
          <li class="dropDown-menu__item">
            <router-link to="/dashboard" class="dropDown-menu__link">
              <span>Dashboard</span>
            </router-link>
          </li>
          <li class="dropDown-menu__item">
            <router-link to="/add-member" class="dropDown-menu__link">
              <span>Add Member</span>
            </router-link>
          </li>

          <li class="dropDown-menu__item">
            <router-link to="/add-task" class="dropDown-menu__link">
              <span>Add Task</span>
            </router-link>
          </li>
          <li class="dropDown-menu__item">
            <router-link
              to="/notifications"
              class="dropDown-menu__link disabled"
            >
              <span>Notifications</span>
            </router-link>
          </li>
          <li class="dropDown-menu__item">
            <router-link to="/login" class="dropDown-menu__link" v-if="user">
              <span @click="handleClick">Logout</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- RESPONSIVE HEADER / -->

      <!-- MOBILE-VIEW  -->

      <div class="mobile-view">
        <div class="mobile-container">
          <section
            class="mobile-tasks"
            v-for="task in computedTask"
            :key="task.id"
          >
            <section class="flex-task-group">
              <section class="task-group-item">
                <div class="task-group-item-list">
                  <h3 class="task-headers">name</h3>
                  <p class="task-content">
                    {{ task.title }}
                  </p>
                </div>
              </section>
              <section class="task-group-item">
                <div class="task-group-item-list">
                  <h3 class="task-headers">status</h3>
                  <p
                    style="padding: 10px"
                    class="task-content"
                    v-bind:class="{
                      completed: task.status === 'Completed',
                      'in-progress': task.status === 'In Progress',
                      pending: task.status === 'Pending',
                      cancelled: task.status === 'Cancelled',
                    }"
                  >
                    {{ task.status }}
                  </p>
                </div>
              </section>
              <section class="task-group-item">
                <div class="task-group-item-list">
                  <h3 class="task-headers">AssignedTo</h3>
                  <div v-if="task.assignedTo.length">
                    <p
                      class="task-content"
                      v-for="tag in task.assignedTo"
                      :key="tag"
                    >
                      {{ tag }}
                    </p>
                  </div>
                  <p v-else>Not assigned</p>
                </div>
              </section>
              <section class="task-group-item">
                <div class="task-group-item-list">
                  <h3 class="task-headers">Due Date</h3>
                  <p class="task-content">
                    {{ task.dueDate }}
                  </p>
                </div>
              </section>
              <section class="task-group-item">
                <div class="task-group-item-list action">
                  <span class="material-icons edit" @click="callUpdate(task.id)"
                    >edit</span
                  >
                  <span
                    class="material-icons delete"
                    @click="callDeleteTask(task)"
                    >delete</span
                  >

                  <transition name="smooth-in">
                    <div class="overlay" v-if="modal">
                      <div class="modal confirm-delete-modal">
                        <div class="modal-content">
                          <div class="modal-header">
                            <span class="close" @click="toggleModal"
                              >&times;</span
                            >
                          </div>
                          <div class="modal-body">
                            <h3>Are you sure you want to Delete?</h3>
                          </div>
                          <p class="delete-animation" v-if="deleteProcess">
                            <span class="deleting">Deleting..........</span>
                          </p>
                          <p class="delete-animation" v-if="noDelete">
                            <span class="deleting">Not Deleted...</span>
                          </p>
                          <div class="modal-footer">
                            <div class="flex-logout-btns">
                              <button
                                class="logout-btn"
                                style="margin-right: 8px"
                                @click="toggleModal"
                              >
                                Cancel
                              </button>
                              <button
                                class="logout-btn delete-btn"
                                @click="handleDelete()"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </section>
            </section>
          </section>
          <section class="mobile-tasks add-tasks">
            <router-link to="/add-task">
              <span class="add-task">Add Task</span>
            </router-link>
          </section>
        </div>
      </div>

      <!-- MOBILE-VIEW  /-->

      <section class="top">
        <div class="add-task">
          <router-link to="/add-task">Add Task</router-link>
        </div>
        <div class="logout-trigger" v-if="user">
          <router-link to="/login" @click="handleClick">
            <div class="flex-logout-btns">
              <span style="margin-right: 8px">Logout</span>
              <span class="material-icons" @click="handleClick">logout</span>
            </div>
          </router-link>
        </div>
      </section>

      <div>
        <section class="tasks">
          <div class="task-group">
            <!-- Todo: Rename to {User's-name Tasklist}  -->
            <h3>{{ user.displayName }}'s Task List</h3>
          </div>
          <transition name="slide">
            <div class="tasks-table" v-if="start">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Assigned to</th>
                    <th>Due date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="task in computedTask" :key="task.id">
                    <td class="flex-description">
                      <span>{{ task.title }}</span>
                      <span class="material-icons comment disabled"
                        >comment</span
                      >
                    </td>
                    <td
                      class="task-group-select"
                      v-bind:class="{
                        completed: task.status === 'Completed',
                        'in-progress': task.status === 'In Progress',
                        pending: task.status === 'Pending',
                        cancelled: task.status === 'Cancelled',
                      }"
                    >
                      {{ task.status }}
                    </td>
                    <td v-if="task.assignedTo.length">
                      <span
                        v-for="tag in task.assignedTo"
                        :key="tag"
                        style="padding: 0 5px"
                      >
                        {{ tag }}
                      </span>
                    </td>
                    <td v-else>Not assigned</td>
                    <td>{{ task.dueDate }}</td>
                    <td @click="callUpdate(task.id)">
                      <span class="material-icons edit">edit</span>
                    </td>
                    <td>
                      <span
                        class="material-icons delete"
                        @click="callDeleteTask(task)"
                        >delete</span
                      >

                      <!-- rough work! -->

                      <!-- CONFIRM LOGOUT OVERLAY  -->
                      <transition name="smooth-in">
                        <div class="overlay" v-if="modal">
                          <div class="modal confirm-delete-modal">
                            <div class="modal-content">
                              <div class="modal-header">
                                <span class="close" @click="toggleModal"
                                  >&times;</span
                                >
                              </div>
                              <div class="modal-body">
                                <h3>Are you sure you want to Delete?</h3>
                              </div>
                              <p class="delete-animation" v-if="deleteProcess">
                                <span class="deleting">Deleting..........</span>
                              </p>
                              <p class="delete-animation" v-if="noDelete">
                                <span class="deleting">Not Deleted...</span>
                              </p>
                              <div class="modal-footer">
                                <div class="flex-logout-btns">
                                  <button
                                    class="logout-btn"
                                    style="margin-right: 8px"
                                    @click="toggleModal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    class="logout-btn delete-btn"
                                    @click="handleDelete()"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <router-link to="/add-task">
                        <span class="material-icons">add_circle_outline</span>
                      </router-link>
                    </td>
                    <td>
                      <!-- <span class="material-icons">add_circle_outline</span> -->
                    </td>
                    <td>
                      <!-- <span class="material-icons">add_circle_outline</span> -->
                    </td>
                    <td>
                      <!-- <span class="material-icons">add_circle_outline</span> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </transition>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from "vue";
import { db } from "../firebase/config";
import { deleteDoc } from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

import getTasks from "../composables/getTasks";
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import getMembers from "../composables/getMembers";

export default {
  name: "Dashboard",

  setup() {
    const route = useRoute();
    const router = useRouter();
    let taskToBeDeleted = {};
    let computedTask = ref([]);
    let modal = ref(false);
    let deleteProcess = ref(false);
    let noDelete = ref(false);
    let start = ref(false);

    const { logout } = useLogout();
    const { user } = getUser();

    const getData = async () => {
      try {
        const { members } = await getMembers();
        let list = members.map((data) => {
          return data.data().username;
        });

        console.log(list);

        for (let i = 0; i < list.length; i++) {
          //  console.log(members[i].data())
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    // Redirects user to login page if they are not logged in
    watch(user, () => {
      if (!user.value) {
        router.push("/login");
      }
    });

    onMounted(async () => {
      try {
        start.value = true;
        let { tasks } = await getTasks();
        computedTask.value = tasks.map((data) => data.data());
        console.log(computedTask.value);
      } catch (err) {
        console.log(err);
      }
    });

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("Logged out");
        router.push("/login");
      }
    };

    // toggle modal
    const toggleModal = () => {
      modal.value = !modal.value;
      taskToBeDeleted = {};
    };

    // toggle menu
    const toggleMenu = () => {
      const menu = document.querySelector(".dropDown-menu");
      menu.classList.toggle("show-menu");
    };

    const callDeleteTask = (task) => {
      modal.value = true;

      taskToBeDeleted = task;
    };
    // delete task
    const handleDelete = async () => {
      console.log("Task to be deleted ", taskToBeDeleted, taskToBeDeleted.id);

      try {
        await db
          .collection("tasks")
          .get()
          .then((res) => {
            console.log(res.docs);
            for (let i = 0; i < res.docs.length; i++) {
              if (
                res.docs[i].data().id === parseInt(taskToBeDeleted.id) ||
                res.docs[i].data().id === taskToBeDeleted.id
              ) {
                console.log(res.docs[i].u_.path.segments[6]);
                db.collection("tasks")
                  .doc(res.docs[i].u_.path.segments[6])
                  .delete()
                  .then(async () => {
                    try {
                      console.log("task deleted");
                      deleteProcess.value = true;
                      noDelete.value = false;
                      let { tasks } = await getTasks();
                      computedTask.value = tasks.map((data) => data.data());

                      setTimeout(() => {
                        modal.value = false;
                        deleteProcess.value = false;
                      }, 3000);
                    } catch (err) {
                      noDelete.value = true;
                      console.log(err);
                      setTimeout(() => {
                        noDelete.value = false;
                      }, 2000);
                    }
                  })
                  .catch((err) => console.log(err));
              } else {
                noDelete.value = true;

                setTimeout(() => {
                  noDelete.value = false;
                }, 2000);
                console.log("nope");
              }
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        noDelete.value = true;
        console.log(err);
      }

      // tasks = getTasks().tasks;
    };

    // call update task

    async function callUpdate(id) {
      try {
        console.log(id);
        await db
          .collection("tasks")
          .get()
          .then((res) => {
            for (let i = 0; i < res.docs.length; i++) {
              if (
                res.docs[i].data().id === parseInt(id) ||
                res.docs[i].data().id === id
              ) {
                console.log(res.docs[i].u_.path.segments[6]);
                router.push({
                  name: "UpdateTask",
                  params: {
                    id: res.docs[i].u_.path.segments[6],
                    title: res.docs[i].data().title,
                    assignedTo: res.docs[i].data().assignedTo,
                    description: res.docs[i].data().description,
                    dueDate: res.docs[i].data().dueDate,
                    status: res.docs[i].data().status,
                  },
                });
              }
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }

    return {
      modal,
      user,
      start,
      deleteProcess,
      noDelete,
      handleClick,
      handleDelete,
      toggleMenu,
      toggleModal,
      callDeleteTask,
      computedTask,
      taskToBeDeleted,
      callUpdate,
    };
  },
};
</script>

<style scoped>
.smooth-in-enter-from {
  opacity: 0;
}

.smooth-in-enter-active,
.smooth-in-leave-active {
  transition: all 1s ease;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.smooth-in-leave-to {
  opacity: 0;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

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
  background: #42b883;
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
div.profile-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  color: #fff;
}
.profile-img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #fff;
  margin-bottom: 1rem;
  background-image: url("../assets/userimg1.png");
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
  overflow-y: scroll;
}

div.responsive-design {
  display: none;
}

.mobile-view {
  display: none;
}

div.dropDown-menu {
  display: none;
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
  position: sticky;
  top: 0;
  z-index: 100;
}
div.hamburger-menu {
  display: none;
}

.disabled {
  cursor: not-allowed;
}

.add-task {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #292f4c;
  border-radius: 0.2rem;
}
.add-task a {
  color: #fff;
  text-decoration: none;
}
.logout-trigger {
  /* display: flex;
    align-items: center;
    justify-content: center; */
  padding: 0.5rem 1rem;
  color: #292f4c;
}
.logout-trigger a {
  color: #292f4c;
  text-decoration: none;
  padding: 0.5rem 0.2rem;
}
.flex-logout-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section.tasks {
  padding: 0 1rem;
}
.task-group {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  color: #292f4c;
  border-radius: 0.2rem;
}
.task-group span {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
.task-group h3 {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
.tasks-table {
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: #292f4c;
  color: #fff;
}
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #e5e5e5;
}
table th {
  padding: 0.5rem;
  font-weight: bold;
  text-align: left;
  background: #f1f1f1;
  color: #292f4c;
  border: 1px solid #e5e5e5;
}
table td {
  text-align: left;
  border: 1px solid #e5e5e5;
  padding: 1rem;
}
td .material-icons {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
td .assign-new-member {
  font-size: 1.5rem;
  margin-left: 1.5rem;
  cursor: pointer;
}
td.flex-description {
  display: flex;
  justify-content: space-between;
  border-bottom: 0;
  border-right: 0;
  border-left: 0;
}
/* push comment icons to right  */
span.comment {
  /* margin-left: 2rem; */
  cursor: not-allowed;
}
/* Red background color to indicate a cancelled task */
.cancelled {
  background-color: #f5a9a9;
}
/* Green background color to indicate a completed task */
.completed {
  background-color: #a9f5a9;
}
/* Blue background color to indicate a pending task */
.pending {
  background-color: #a9e6f5;
}
/* Yellow background color to indicate a in progress task */
.in-progress {
  background-color: #ffff00;
}
.task-group-select select {
  width: 100%;
  outline: none;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}
select option {
  color: #292f4c;
}
a {
  text-decoration: none;
  color: #fff;
}
span.delete {
  color: rgba(212, 41, 41, 0.938);
}

/* Overlay background of whole page */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
  backdrop-filter: blur(2px);
  display: block;
}

/* .show-modal {
  display: block;
} */

/* modal style */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background-color: #fff;
  z-index: 101;
  padding: 30px;
  border-radius: 5px;
  color: #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.modal-content {
  height: auto;
  border-radius: 0.2rem;
  padding: 1rem;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-header a {
  text-decoration: none;
}
span.close {
  position: absolute;
  right: 20px;
  top: 10px;
  color: #292f4c;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  cursor: pointer;
}
.modal-body {
  padding: 1rem;
}
.modal-body h3 {
  font-size: 1.5rem;
  text-align: center;
}

.delete-animation {
  width: 150px;
  height: 35px;
  border-right: 3px solid red;
  margin: auto;
  position: relative;
}

.delete-animation::after {
  content: "";
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  position: absolute;
  top: 0;
  right: -90%;
  animation: cover 2s linear infinite alternate forwards;
}

@keyframes cover {
  from {
    right: -90%;
  }
  to {
    right: -62%;
  }
}

.delete-animation .deleting {
  color: red;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 23px;
}
.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
.logout-btn {
  padding: 0.8rem 1.5rem;
  color: #fff;
  background-color: #292f4c;
  border-radius: 0.2rem;
  cursor: pointer;
  outline: none;
  border: none;
}
.logout-btn:hover {
  transform: scale(1.1);
}
.delete-btn {
  background-color: red;
}

@media (max-width: 767.98px) {
  nav.sidebar {
    display: none;
  }
  main.left-flex {
    width: 100%;
  }
  div.responsive-design {
    display: block;
  }
  .responsive-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    width: 50%;
    height: auto;
  }
  div.hamburger-menu {
    display: flex;
    padding: 0.5rem 1rem;
  }
  div.show-menu {
    display: flex;
    flex-direction: column;
  }
  section.top {
    display: none;
  }
  span.hamburger-menu {
    font-size: 2rem;
    cursor: pointer;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  ul.dropDown-menu__list li {
    list-style-type: none;
    padding: 0.5rem 1rem;
  }
  ul.dropDown-menu__list li a {
    color: #000;
    /* border-bottom: 1px solid #292F4C; */
  }
  td .comment {
    display: none;
  }
}

/* Mobile styles */
@media (max-width: 620px) {
  section.tasks {
    display: none;
  }
  .mobile-view {
    display: block;
    width: 100%;
  }
  .logo {
    width: 40%;
    height: auto;
  }
  .mobile-container {
    width: 100%;
  }
  .mobile-tasks {
    padding: 0.5rem;
  }
  .flex-task-group {
    display: flex;
    flex-direction: column;
    width: 95%;
    background-color: #292f4c;
    color: #fff;
    padding: 0 10px;
  }
  .task-group-item-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  h3.task-headers {
    text-transform: uppercase;
  }
  p.task-content {
    text-transform: capitalize;
  }
  div.action {
    margin: 10px 0;
  }
  span.delete,
  span.edit {
    cursor: pointer;
  }
  span.add-task {
    max-width: 93%;
  }
}
</style>
