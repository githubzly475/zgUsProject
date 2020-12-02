import request from '@/utils/request'

/*
 * 菜单管理模块
 */
// 查找导航菜单树
export const getMenuTree = () => {
  return request({
    url: '/sysMenuSetting/menu',
    method: 'get'
  })
}

// 删除
export const deleteMenu = (id) => {
  return request({
    url: '/sysMenuSetting/menu/' + id,
    method: 'delete'
  })
}

// 保存
export const saveMenu = (data) => {
  return request({
    url: '/sysMenuSetting/menu',
    method: 'post',
    data: data
  })
}

// 更新菜单
export function updateMenu(data) {
  return request({
    url: '/sysMenuSetting/menu',
    method: 'put',
    data: data
  })
}

// 获取路由
export const getRouters = () => {
  return request({
    url: '/sysMenuSetting/menu/getRouters',
    method: 'get'
  })
}
// 获取菜单列表
export const getMenus = () => {
  return request({
    url: '/sysMenuSetting/menu/getMenus',
    method: 'get'
  })
}
