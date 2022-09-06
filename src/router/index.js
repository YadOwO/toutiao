import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search'
import SearchResult from '@/views/Search/SearchResult'
import ArticleDetail from '@/views/ArticleDetail'
import UserEditor from '@/views/User/UserEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Layout/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'User',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  { // 搜索结果界面
    path: '/search/:keywords',
    component: SearchResult
  },
  {
    path: '/article_detail',
    component: ArticleDetail
  },
  {
    path: '/user_editor',
    component: UserEditor
  }
]

const router = new VueRouter({
  routes
})

export default router
