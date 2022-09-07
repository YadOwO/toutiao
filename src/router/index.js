import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEditor from '@/views/User/UserEdit'
// import Chat from '@/views/Chat'
import { getToken } from '@/utils/token.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    // 独享守卫
    beforeEnter (to, from, next) {
      // 如果登录了，不要切换到登录界面
      if (getToken()?.length > 0) {
        next(false) // 留在原地
      } else {
        next()
      }
    }
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'User',
        component: () => import('@/views/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  { // 搜索结果界面
    path: '/search/:keywords',
    component: () => import('@/views/Search/SearchResult')
  },
  {
    path: '/article_detail',
    component: () => import('@/views/ArticleDetail')
  },
  {
    path: '/user_editor',
    component: () => import('@/views/User/UserEdit')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

// // 路由 - 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 如果登录了，不要切换到登录界面
//   if (getToken()?.length > 0 && to.path === '/login') {
//     next(false) // 留在原地
//   } else {
//     next()
//   }
// })

export default router
