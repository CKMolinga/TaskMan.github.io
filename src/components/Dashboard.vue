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
                    <router-link to="/add-member" class="sidebar-menu__link">
                        <span class="material-icons">people</span>
                    </router-link>
                </li>
                <li class="sidebar-menu__item menu-icon">
                    <router-link to="/notifications" class="sidebar-menu__link">
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

          <div class="hamburger-menu">
                <span class="material-icons hamburger-menu" @click="toggleMenu">menu</span>
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
                        <router-link to="/notifications" class="dropDown-menu__link">
                            <span>Notifications</span>
                        </router-link>
                    </li>
                    <li class="dropDown-menu__item">
                        <router-link to="/settings" class="dropDown-menu__link">
                            <span>Settings</span>
                        </router-link>
                    </li>
                    <li class="dropDown-menu__item">
                        <router-link to="/logout" class="dropDown-menu__link">
                            <span>Logout</span>
                        </router-link>
                    </li>
                </ul>
          </div>

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
                  <h3> {{ user.displayName }}'s Task List</h3>
              </div>
              <div class="tasks-table">
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
                                    <span class="material-icons comment">comment</span>
                                </td>
                                <td class="task-group-select" v-bind:class="{ 'completed': task.status === 'Completed', 'in-progress': task.status === 'In Progress', 'pending': task.status === 'Pending', 'cancelled': task.status === 'Cancelled' }">
                                    {{ task.status }}
                                </td>
                                <td>
                                    {{ task.assignedTo }}
                                    <span class="material-icons assign-new-member">add_circle_outline</span>
                                </td>
                                <td>{{ task.dueDate }}</td>
                                <td>
                                    <span class="material-icons edit">edit</span>
                                </td>
                                <td>
                                    <span class="material-icons delete" @click="callDeleteTask(task)">delete</span>

                                    

                                <!-- CONFIRM LOGOUT OVERLAY  -->
                                <div class="overlay">
                                <div class="modal confirm-delete-modal">
                                    <div class="modal-content">
                                     <div class="modal-header">
                                         <span class="close" @click="toggleModal">&times;</span>
                                    </div>
                                    <div class="modal-body">
                                        <h3>Are you sure you want to Delete?</h3>
                                    </div>
                                    <div class="modal-footer">
                                            <div class="flex-logout-btns">
                                                <button class="logout-btn" style="margin-right: 8px" @click="toggleModal">Cancel</button>
                                                <button class="logout-btn delete-btn" @click="handleDelete()">Delete</button>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

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
          </section>
            </div>

      </main>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { db } from '../firebase/config'
import { deleteDoc } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'


import getTasks from '../composables/getTasks'
import getSingleTask from '../composables/getSingleTask'
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import getMembers from '../composables/getMembers'


export default {
    name: 'Dashboard',
    
    setup() {
        const route = useRoute()
        const router = useRouter()
        let taskToBeDeleted = {};
        let { tasks, error, load } = getTasks()
        const { task, taskError, taskLoad } = getSingleTask()
        const { logout } = useLogout()
        const { user } = getUser()
        const { members, memberError, memberLoad } = getMembers()

        // Redirects user to login page if they are not logged in
        watch(user, () => {
            if(!user.value) {
                router.push('/login')
            }
        })

        let computedTask = computed(() => {
              return tasks.value;
        })

        load()

        const handleClick = async () => {
            await logout()
            if (!error.value) {
                console.log("Logged out")
                router.push('/login')
            }
        }

        // toggle modal 
        const toggleModal = () => {
            const modal = document.querySelector('.overlay')
            modal.classList.toggle('show-modal')
            taskToBeDeleted = {}; 
        }

        // toggle menu
        const toggleMenu = () => {
            const menu = document.querySelector('.dropDown-menu')
            menu.classList.toggle('show-menu')
        }

         const callDeleteTask = (task) => {
            const modal = document.querySelector('.overlay')
            modal.classList.toggle('show-modal')
            taskToBeDeleted = task;
        }

        // delete task
        const handleDelete = () => {
            console.log('Task to be deleted ', taskToBeDeleted);
             db.collection('tasks').doc(taskToBeDeleted?.id).delete()
             tasks = getTasks().tasks;
             toggleModal()
        }

        return { tasks, task, error, taskError, user, handleClick, handleDelete, toggleMenu, toggleModal,callDeleteTask, computedTask, taskToBeDeleted, members, memberError, memberLoad }

    }

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
    background-image: url('../assets/userimg1.png');
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
    /* display: flex;
    align-items: center;
    justify-content: center; */
    padding: 0.5rem 1rem;
    color: #292F4C;
}
.logout-trigger a {
    color: #292F4C;
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
    color: #292F4C;
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
    background-color: #292F4C;
    color: #fff;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #E5E5E5;
}
table th {
    padding: 0.5rem;
    font-weight: bold;
    text-align: left;
    background: #f1f1f1;
    color: #292F4C;
    border: 1px solid #E5E5E5;
}
table td {
    text-align: left;
    border: 1px solid #E5E5E5;
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
td .comment {
    /* margin-left: 2rem; */
}
/* Red background color to indicate a cancelled task */
td.cancelled {
    background-color: #F5A9A9;
}
/* Green background color to indicate a completed task */
td.completed {
    background-color: #A9F5A9;
}
/* Blue background color to indicate a pending task */
td.pending {
    background-color: #a9e6f5;
}
/* Yellow background color to indicate a in progress task */
td.in-progress {
    background-color: #FFFF00;
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
    color: #292F4C;
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
  display: none;
}

.show-modal {
    display: block;
}

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
    color: #292F4C;
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
    background-color: #292F4C;
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

@media (max-width: 767.98px){
    nav.sidebar {
        display: none;
    }
    main.left-flex {
        width: 100%;
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
}

/* Responsive-Design */
/* @media screen and (max-width: 768px) {
    .task-group {
        flex-direction: column;
    }
    .task-group span {
        margin-right: 0;
    }
    .task-group h3 {
        margin-right: 0;
    }
    .task-group-select {
        display: none;
    }
    .tasks-table {
        flex-direction: column;
    }
    .tasks-table table {
        width: 100%;
    }
    .tasks-table table th {
        padding: 0.5rem;
        font-weight: bold;
        text-align: left;
        background: #f1f1f1;
        color: #292F4C;
        border: 1px solid #E5E5E5;
    }
    .tasks-table table td {
        text-align: left;
        border: 1px solid #E5E5E5;
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
        color: #292F4C;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    span.delete {
        color: rgba(212, 41, 41, 0.938);
    }
    .overlay {
        display: none;
    }
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
        color: #292F4C;
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
        background-color: #292F4C;
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
} */


</style>