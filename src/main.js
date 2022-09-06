import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  NavBar, Form, Field, Button, Tabbar,
  TabbarItem, Icon, Tab, Tabs, Cell, List,
  PullRefresh, ActionSheet, Popup,
  Row, Col, Badge, Search
  , Image as VanImage
  , Divider
  , Tag, CellGroup
  , Image
  , Dialog
  , DatetimePicker
} from 'vant'
// 引入全部样式
import 'vant/lib/index.less'
import diretivesObj from '@/utils/directives'

Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
// 自动聚焦input
Vue.use(diretivesObj)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
