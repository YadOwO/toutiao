import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 头像地址默认值
    userPhoto: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ffe%2F11%2F97%2Ffe119792285b42e687ebf4367f77c8de.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665111533&t=f017e85d4d9eecc18bc93e411e9bef00'
  },
  mutations: {
    SET_USERPHOTO ({ userPhoto }, value) {
      userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
