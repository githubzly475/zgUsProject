import request from '@/utils/request'
//按条件查询
export function getList(params){
  return request({
    url: 'org/getList',
    method: 'get',
    params: params
  })
}

//新增提交
export function addOrg(data){
  return request({
    url: 'org/addOrg',
    method: 'post',
    data: data
  })
}

//编辑提交
export function edit(data){
  return request({
    url: 'org/editOrg',
    method: 'post',
    data: data
  })
}
//编辑查询记录
export function editById(id){
  return request({
    url: 'org/editById',
    method: 'get',
    params: {id:id}
  })
}

//单条删除
export function del(id) {
  return request({
    //url: 'org/del?id=' + id,
    url: 'org/del',
    method: 'get',
    params:{id:id}
  })
}

//多条删除
export function delIds(ids) {
  return request({
    //url: 'org/del?id=' + id,
    url: 'org/delIds',
    method: 'get',
    params:{ids:ids}
  })
}
//查询连锁  父子关系

export function getParentOrg() {
  return request({
    url: 'org/getParentOrg',
    method: 'get'

  })
}
