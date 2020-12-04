import request from '@/utils/request.js'
import Qs from 'qs';

export function login(data) {
  return request({
    url:'/user/login',
    method:'post',
    data:Qs.stringify(data)
  })
}
