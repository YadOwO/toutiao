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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
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

export default router
