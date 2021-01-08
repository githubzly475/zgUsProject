<template>
  <div>
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button size="mini" type="primary" icon="el-icon-plus" permission="sys:menu:add"
                 v-if="hasPerm('sys:menu:add')"
                 @click="add">新增</el-button>
      <el-button size="mini" type="primary" icon="el-icon-plus"  v-if="hasPerm('sys:menu:delete')"
                 @click="add">按钮权限控制</el-button>

    </div>
    <el-table :data="menuList"
             row-key="menuId"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="menuName" label="名称" sortable >
      </el-table-column>

      <el-table-column prop="menuPerms" label="权限标识" sortable >
      </el-table-column>

      <el-table-column prop="menuPath" label="前端跳转URL" sortable >
      </el-table-column>

      <el-table-column prop="menuComponent" label="菜单组件" sortable >
      </el-table-column>

      <el-table-column prop="menuType" label="菜单类型"  >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.menuType === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.menuType === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.menuType === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column  label="操作"  width="180">
        <template slot-scope="scope">
          <el-button  size="mini" type="primary" icon="el-icon-edit"  @click="edit(scope.row)"/>
          <el-button  type="danger" size="mini"  icon="el-icon-delete" @click="subDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <MenuDialog ref="menuAdd" :cutitle="title" @submitSuss="queryMenu"></MenuDialog>
  </div>
</template>

<script>
  import MenuDialog from '@/views/menu/MenuDialog'
import {queryMenu,deleteById} from '@/customeraxios/menu'
    export default {
        name: "index",
        components:{MenuDialog},
        data(){
            return{
                menuList:[],
                title:''
            }
        },
        methods:{
            queryMenu(){
                queryMenu().then(res=>{
                    this.menuList=res.data
                }).catch(error=>{
                    this.$msg.error("查询失败")
                })
            },
            edit(row){
                this.title='编辑'
                this.$refs['menuAdd'].open(row.menuId)
            },
            subDelete(row){
                this.$confirm('确定删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res=>{
                    deleteById(row.menuId).then(res=>{
                        this.$notify({
                            title: '删除成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.queryMenu()

                    }).catch(erro=>{
                      this.$msg.error("删除失败")
                    })
                }).catch(erro=>{
                    this.$msg.info("已经取消删除")
                })

            },
            add(){
                this.title='新增'
                this.$refs['menuAdd'].open('')
            }

        },
        created() {
            this.queryMenu()
        }
    }
</script>

<style scoped>

</style>
