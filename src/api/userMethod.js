// 用户操作的js
import request from '@/utils/request'

export function getAllUser(token) {
  const data = {
    token
  }
  return request({
    url: '/user/getAllUser',
    method: 'post',
    data
  })
}

export function sendValidCode(email) {
  const data = {
    email
  }
  return request({
    url: '/user/sendValidCode',
    method: 'post',
    data
  })
}
