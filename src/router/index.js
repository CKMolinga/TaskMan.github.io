import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import UserManual from '../views/UserManual.vue'
import Dashboard from '../components/Dashboard.vue'
import AddMember from '../views/Add-Member.vue'
import AddTask from '../views/Add-Task.vue'
import Notifications from '../views/Notifications.vue'
import Success_signup from '../views/succesful_signup.vue'
import Confirm_Logout from '../views/Confirm-Logout.vue'
import updateTask from '../views/Update-Task.vue'
import Confirm_Delete from '../views/Confirm-Delete.vue'

//firebase imports
import { dbAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
    let user = dbAuth.currentUser
    if (!user) {
        // redirect to login page
        next('/login')
    } else {
        next()
    }
}


const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/user-manual',
        name: 'UserManual',
        component: UserManual
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: requireAuth
    },
    {
        path: '/add-member',
        name: 'AddMember',
        component: AddMember,
        beforeEnter: requireAuth
    },
    {
        path: '/add-task',
        name: 'AddTask',
        component: AddTask,
        beforeEnter: requireAuth
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications,
        beforeEnter: requireAuth
    },
    {
        path: '/success-signup',
        name: 'Success_signup',
        component: Success_signup
    },
    {
        path: '/tasks/:id',
        name: 'UpdateTask',
        component: updateTask,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router