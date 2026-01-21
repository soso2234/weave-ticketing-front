import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import QueuePage from '../pages/QueuePage.vue'
import BookingPage from '../pages/BookingPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/queue', component: QueuePage },
    { path: '/booking', component: BookingPage },
  ],
})
