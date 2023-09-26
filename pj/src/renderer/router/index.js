import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: require('@/components/HomePage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
