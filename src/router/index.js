import Vue from 'vue'
import Router from 'vue-router'
import bookshelf from '@/components/bookshelf'
import HelloWorld from '@/components/HelloWorld'
import booki from '@/components/booki'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: bookshelf
    },
    {
      path: '/booki/:id',
      name: 'booki',
      component: booki
    },
    {
      path: '/booki/:id',
      name: 'booki',
      component: booki
    },
  ]
})
