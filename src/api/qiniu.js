import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/upload/qiniu/token',
    method: 'get'
  })
}

export function upload(id, name, type) {
  const data = {
    'id': id,
    'name': name,
    'type': type
  }
  return request({
    url: '/upload/add',
    method: 'post',
    data
  })
}
