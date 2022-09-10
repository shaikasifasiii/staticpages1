import Task2 from '../views/Task2.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImageWithButton from '../views/ImageWithButton.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ImageWithButton,
    },
    {
      path: '/extra-tasks',
      name: 'Task2',
      component: Task2
    },
    {
      path: '/images-with-scroll',
      name: 'ImagesWithScroll',
      component: HomeView
    },
    
  ]
})

export default router
