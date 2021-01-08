import request from '@/utils/request.js'

export function queryRoles(data) {
  return request({
    url: '/sysRole/queryRoles',
    method: 'get',
    params:data
  })
}


export function queryRoleById(id) {
  return request({
    url: '/sysRole/queryRoleById',
    method: 'get',
    params:{id}
  })
}

export function add(data) {
  return request({
    url: '/sysRole/add',
    method: 'post',
    data:data
  })
}
