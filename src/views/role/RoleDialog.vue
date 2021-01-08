<template>
  <s-dialog :title="cutitle"  :visible.sync="visible" :on-submit="submit" :on-cancel="close"
            :loading="loading" width="30%">
    <el-form ref="Form" :model="formData" :rules="formRules" label-position="right" label-width="100px">
      <el-form-item label="名称" prop="deptName">
        <el-input v-model.trim="formData.roleName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="roleCode">
        <el-input v-model.trim="formData.roleCode" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="dataScope">
        <el-radio-group v-model="formData.dataScope">
          <el-radio v-model="formData.dataScope"  :label="1">全部</el-radio>
          <el-radio v-model="formData.dataScope"  :label="3">本级及子级</el-radio>
          <el-radio v-model="formData.dataScope"  :label="2">本级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限范围" prop="menuResource">
        <el-tree ref="tree"
                 :data="menuList"
                 node-key="menuId"
                 show-checkbox
                 :props="defaultProps"
                 :default-checked-keys="checkedKeys"
                 @check="getCheckedNodes">
        </el-tree>
      </el-form-item>
      <el-form-item label="描述" prop="role_desc">
        <el-input type="textarea" v-model.trim="formData.role_desc" placeholder="请输入名称"></el-input>
      </el-form-item>
    </el-form>

  </s-dialog>
</template>

<script>
  import SDialog from '@/components/commons/SDialog'

  import {queryMenu} from '@/customeraxios/menu'
  import {add,queryRoleById} from '@/customeraxios/role'
    export default {
        name: "RoleDialog",
        components:{SDialog},
        props:{
            cutitle:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                visible:false,
                loading:false,
                menuList:[],
                formData:{},
                formRules:{
                    roleName:[{required: true, message: '请输入名称', trigger: 'blur'}],
                    roleCode:[{required: true, message: '请输入名称', trigger: 'blur'}],
                    dataScope:[{required: true, message: '请输入名称', trigger: 'blur'}],
                },
                defaultProps:{
                    label: 'menuName',
                    children: 'children'
                },
                checkedKeys:[]
            }
        },
        methods:{
            submit(){
                this.loading=true
                add(this.formData).then(res=>{
                  this.$msg.success("添加成功");
                  this.close()
                }).catch(erro=>{
                    this.$msg.success("添加失败");
                })
            },
            open(id){
              this.visible=true
                queryMenu().then(res=>{
                  this.menuList=res.data
                }).catch(erro=>{
                })
                if(id){
                    queryRoleById(id).then(res=>{
                        this.formData=res.data
                       var m=new Array()
                    res.data.menuResource.forEach(function (item,index) {
                            m.push(item.menuId)
                    })
                   this.checkedKeys=m
                    }).catch(erro=>{

                    })
                }
            },
            close(){
                this.visible=false
                this.loading=false
                this.$refs['Form'].resetFields()
                this.formData={}
                this.menuList=[]
                this.checkedKeys=[]
            },
            getCheckedNodes(){
                console.log(this.$refs['tree'].getCheckedNodes(false,true))
              this.formData.menuResource=this.$refs['tree'].getCheckedNodes(false,true)

            }
        }
    }
</script>

<style scoped>

</style>
