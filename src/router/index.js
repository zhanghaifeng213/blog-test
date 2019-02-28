import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Main from '@/components/main'
import PublishArticle from '@/components/publish-article'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/publish-article",
          name: "publish-article",
          component: PublishArticle
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
