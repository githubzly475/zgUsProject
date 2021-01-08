import request from '@/utils/request.js'
import Qs from "qs";

export function getRouters() {
  return request({
    url:'sysMenu/menu/getRouters',
    method:'get'

  })

}
