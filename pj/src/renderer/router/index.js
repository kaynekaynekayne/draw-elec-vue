import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//setting->/homePage/setting
//analysis->/homePage/test
//database->/homePage/result

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
      component: require('@/components/HomePage').default,
      children:[
        {
          path:'test',
          component:require('@/components/TabPages.TestPage').default
        },
        {
          path:'result',
          component:require('@/components/TabPages/ResultPage').default
        },
        {
          path:'settings',
          component:require('@/components/TabPages/SettingsPage').default
        }

      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
