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
