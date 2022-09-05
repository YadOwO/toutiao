// 此文件->封装3个方法->专门用于操作token
const key = 'token-about'
export const setToken = token => {
  localStorage.setItem(key, token)
}

export const getToken = () => localStorage.getItem(key)

export const removeToken = () => {
  localStorage.removeItem(key)
}
