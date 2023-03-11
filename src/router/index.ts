import { createRouter, createWebHistory } from 'vue-router'
import CardListView from '@/views/CardListView.vue'
import AboutView from '@/views/AboutView.vue'
import CardDetailsView from '@/views/CardDetailsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'card-list',
      component: CardListView,
      props: (route) => ({ page: route.query.page || '1' })
    },
    {
      path: '/add',
      name: 'add-card',
      component: () => import('@/views/AddCardView.vue')
    },
    {
      path: '/card/:id',
      name: 'card-details',
      props: true,
      component: CardDetailsView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
