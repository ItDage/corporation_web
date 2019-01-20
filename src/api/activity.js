import request from '@/utils/request'

// 添加活动--后台
export function add(data) {
  return request({
    url: '/activity/add',
    method: 'post',
    data
  })
}

// 获取活动列表
export function getAllActivityByParam(data) {
  return request({
    url: '/activity/getListByParam',
    method: 'post',
    data
  })
}
