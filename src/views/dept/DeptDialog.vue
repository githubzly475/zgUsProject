<template>
  <s-dialog :title="cutitle"  :visible.sync="visible" :on-submit="submit" :on-cancel="close"
            :loading="loading" width="30%">
    <el-form ref="Form" :model="formData" :rules="formRules" label-position="right" label-width="100px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model.trim="formData.deptName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="上级部门名称" prop="parentId">
        <!--用下拉框-->
        <el-select  v-model="formData.parentId">
          <el-option  v-for="item in sysDeptList"
                      :key="item.id"
                      :label="item.deptName"
                      :value="item.id">
          </el-option>
        </el-select>

       <!-- 测试el-tree
       <el-tree  ref="tree"
                  :data="data2"
                  node-key="id"
                  show-checkbox
                  :props="defaultProps"
                  @check="getCheckedKeys">
        </el-tree>-->
      </el-form-item>
    </el-form>

  </s-dialog>
</template>

<script>
  import SDialog from "@/components/commons/SDialog";
  import {queryDeptById,add,getDetpTree,getAllDept} from '@/customeraxios/dept'
    export default {
        name: "DeptDialog",
        components: {SDialog},
        props:{
          cutitle:{
              type:String,
              default:''
          }
        },
        data(){
            return {
                visible:false,
                loading:false,
                formData:{id:'',deptName: '',parentId:''},
                formRules:{
                    deptName:[{required: true, message: '请输入部门名称', trigger: 'blur'}]
                },
                data2:[],
                defaultProps:{
                    label: 'name',
                    children: 'children'
                },
                sysDeptList:[]
            }
        },
        methods:{
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            open(id){
              this.visible=true
                /*getDetpTree 获取的部门树  用el-tree*/
              /*  getDetpTree().then(res=>{
                    this.data2=res.data

                }).catch(erro=>{

                })*/
              /*用下拉框，获取所有部门*/
                getAllDept().then(res=>{
                  this.sysDeptList=res.data
                }).catch(erro=>{

                })

              if(id){
                  queryDeptById(id).then(ress =>{
                     this.formData=ress.data;
                  }).catch(erro =>{
                      this.$msg.error(erro)
                  })
              }

            },
            getDeptTree(){

            },
            close(){
              this.visible=false;
              this.$refs['Form'].resetFields()
               this.loading=false
            },
          submit(){
              const  validate= this.$refs['Form'].validate().then(res=> {
                    this.loading = true
                    add(this.formData).then(res => {
                        this.loading = false
                        this.$msg.success('添加成功')
                        this.$emit('submitOver')
                        this.close()
                    }).catch(erro => {
                        this.$msg.error('添加失败')
                        this.close()
                    })
                }
              ).catch(error=>{
                  this.$msg.error(error)
              })




          },

        }

    }
</script>

<style scoped>

</style>
