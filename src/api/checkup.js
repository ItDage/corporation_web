import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/checkup/add',
    method: 'post',
    data
  })
}

export function getAll(data) {
  return request({
    url: '/checkup/getAll',
    method: 'post',
    data
  })
}
