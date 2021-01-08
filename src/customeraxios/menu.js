import request from '@/utils/request.js'

export function queryMenu(data) {
  return request({
    url: '/sysMenu/queryMenu',
    method: 'get',
    params:data
  })
}

export function addMenu(data) {
  return request({
    url: '/sysMenu/addMenu',
    method: 'post',
    data:data
  })
}

export function queryById(id) {
  return request({
    url: '/sysMenu/queryById',
    method: 'get',
    params:{id:id}
  })
}

export function deleteById(id) {
  return request({
    url: '/sysMenu/deleteById',
    method: 'get',
    params:{id:id}
  })
}
