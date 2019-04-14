import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true,
        isUseCache: false
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
