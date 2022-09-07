<template>
    <div>
      <van-nav-bar title="智慧头条-登录" />
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写正确的11位手机号', pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }]"
        />
        <van-field
          v-model="user.code"
          required
          type="password"
          name="code"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写正确的6密码', pattern:/^\d{6}$/ }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
          :disabled='isLoading'
          :loading='isLoading'
          loading-text="加载中..."
          >登录</van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token.js'
import { Notify } from 'vant'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13888888888', // 手机号
        code: '246810' // 验证码(密码-246810)
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      console.log('submit', values)

      // 状态设置为true
      this.isLoading = true

      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.data.token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        // 跳转到Layout页面
        this.$router.replace({
          path: '/layout/home'
        })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }

      // 状态设置为false
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// .van-nav-bar {
//   background: #007bff;
// }
/* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
// /deep/ .van-nav-bar__title{
//   color: white;
// }
</style>
