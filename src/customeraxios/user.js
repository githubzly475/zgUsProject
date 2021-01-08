import request from '@/utils/request.js'
import Qs from 'qs';

export function queryUserList(data) {
  return request({
    url: '/sysUser/queryUserList',
    method: 'get',
   params:data
  })
}

export function save(data) {
  return request({
    url: '/sysUser/save',
    method: 'post',
    data:data
  })
}
export function getByUserId(id) {
  return request({
    url: '/sysUser/getByUserId',
    method: 'get',
    params:{id}
  })
}

export function del(id) {
  return request({
    url: '/sysUser/delByUserId',
    method: 'get',
    params:{id}
  })
}

