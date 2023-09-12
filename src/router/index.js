// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [ //RUTA DE INICIO
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },

      { //RUTA DE LA SECCION TABLA
        path: '/tabla',
        name: 'Tabla',
        component: () => import('@/views/Tabla.vue'),
      },
      {
        path: '/crud',
        name: 'Crud',  //RUTA DE LA SECCION TABLA CRUD
        component: () => import('@/views/Crud.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router