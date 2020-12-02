import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

/* 系统菜单管理 */
const getRouters = (params) => getAction('sysMenu/menu/getRouters', params)










/*  */
export {
  getRouters
}
