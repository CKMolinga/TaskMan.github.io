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
        component: Dashboard
    },
    {
        path: '/add-member',
        name: 'AddMember',
        component: AddMember
    },
    {
        path: '/add-task',
        name: 'AddTask',
        component: AddTask
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router