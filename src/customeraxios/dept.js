import request from '@/utils/request.js'

export function queryDeptList(data) {
  return request({
    url: '/sysDept/queryDeptList',
    method: 'get',
    params:data
  })
}

export function queryDeptById(id) {
  return request({
    url: '/sysDept/queryDeptById',
    method: 'get',
    params:{id}
  })
}


export function add(data) {
  return request({
    url: '/sysDept/add',
    method: 'post',
    data:data
  })
}


export function getDetpTree() {
  return request({
    url: '/sysDept/getDetpTree',
    method: 'post'
  })
}


export function getAllDept() {
  return request({
    url: '/sysDept/getAllDept',
    method: 'post'
  })
}
