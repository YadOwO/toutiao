// 基于 axios 封装的请求模块
import ajax from 'axios'
// import router from '@/router'
import { Notify } from 'vant'
import { getToken, removeToken, setToken } from '@/utils/token.js'
import { refreshTokenAPI } from '@/api'

// 新建一个新的axios实例
const axios = ajax.create({
  baseURL: 'http://toutiao.itheima.net' // 基地址
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前给请求头加上token
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 如果身份过期（401错误）
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份过期！' })
    // 跳转至登陆界面
    removeToken()
    // router.replace('/login')
    // 使用refresh_token换回来的新token继续使用
    const res = await refreshTokenAPI()
    // 1.更新token到本地
    setToken(res.data.data.token)
    // 2.更新的token在请求头里
    error.config.headers.Authorization = `Bearer ${res.data.data.token}`
    // 3.未完成的请求 再一次发起
    return axios(error.config)
  }
  return Promise.reject(error)
})

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })

// 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
//   return $.ajax({
//     url: url,
//     type: method,
//     data: data,
//     header: headers
//   })
}
