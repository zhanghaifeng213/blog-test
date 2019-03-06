import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Main from '@/components/main'
import ArticleDetail from '@/components/article-detail'
import PublishArticle from '@/components/publish-article'
import store from '@/store/index.js'


Vue.use(Router)

const router = new Router({
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
        },
        {
          path: "/article-detail",
          name: "article-detail",
          component: ArticleDetail
        }

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === "/home") {
    next()
  }
  if (store.state.hasLogin) {
    store.dispatch('handleInfo').then(res => {
      next()
    })
  } else {
    next()
  }
})
export default router