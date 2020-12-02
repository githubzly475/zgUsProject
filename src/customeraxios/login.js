import request from '@/utils/request.js'
import Qs from 'qs';

export function login(data) {
  return request({
    url:'/pc/login',
    method:'post',
    data:Qs.stringify(data)
  })
}
