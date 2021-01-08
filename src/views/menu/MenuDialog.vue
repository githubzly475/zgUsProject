<template>
    <s-dialog :title="cutitle"  :visible.sync="visible" :on-submit="submit" :on-cancel="close"
              :loading="loading" width="30%">
      <el-form ref="FormD" :model="formData" :rules="formRules" label-position="right" label-width="100px">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model.trim="formData.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuPerms">
        <el-input v-model.trim="formData.menuPerms" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="前端跳转URL" prop="menuPath">
        <el-input v-model.trim="formData.menuPath" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="组件" prop="menuComponent">
        <el-input v-model.trim="formData.menuComponent" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="menuType" >
          <el-radio-group v-model="formData.menuType" @change="getChange">
            <el-radio v-for="(item,index) in menuTypeList" :label="index">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isShow"  label="上级菜单" prop="parentId">
          <el-tree ref="tree"
                   :data="data2"
                   node-key="menuId"
                   show-checkbox
                   :props="defaultProps"
                   :default-checked-keys="checkenParentId"
                   @check="getCheckedKeys">
          </el-tree>
        </el-form-item>

        <el-form-item label="排序" prop="menuSort">
          <el-input v-model.number="formData.menuSort" placeholder="输入数字"></el-input>
        </el-form-item>
      </el-form>
    </s-dialog>
</template>

<script>
  import SDialog from "../../components/commons/SDialog";

  import {queryMenu,addMenu,queryById} from '@/customeraxios/menu'
    export default {
        name: "MenuDialog",
        components: {SDialog},
        props:{
            cutitle:{
                type:String,
                default:''
            }
        },
        data(){
            const parentIdValidate=(rule,value,callback)=>{
                if(this.formData.menuType !=0) {
                    if (!value) {
                        return callback(new Error("上级菜单不能为空"))
                    }else {
                        if(value.indexOf(",")>0){
                            return callback(new Error("不能选择多个上级"))
                        }else{
                            callback()
                        }
                    }
                }else{
                    callback()
                }
            };
            const isNumber=(rule,value,callback)=>{
                if(!Number.isInteger(value)){
                    return callback(new Error("请输入整数"))
                }else{
                    callback()

                }
            };
            return{
                isShow:false,
                visible:false,
                loading:false,
                formData:{menuId:'',menuName:'',menuPerms:'',menuPath:'',menuComponent:'',menuType:'',parentId:'',menuSort:''},
                menuTypeList:['目录','菜单','按钮'],
                data2:[],
                checkenParentId:[],
                defaultProps:{
                    label: 'menuName',
                    children: 'children'
                },
                formRules:{
                    menuName:[{required: true, message: '请输入名称', trigger: 'blur'}],
                    menuPerms:[{required: true, message: '请输入权限标识', trigger: 'blur'}],
                    menuPath:[{required: true, message: '请输入', trigger: 'blur'}],
                    menuComponent:[{required: true, message: '请输入', trigger: 'blur'}],
                    menuType:[{required: true, message: '类型不能为空', trigger: 'change'}],
                    parentId:[{validator:parentIdValidate,trigger:'change'}],
                    /*下面两个校验方法均可*/
                   /* menuSort:[{validator:isNumber,trigger:'blur'}]*/
                    menuSort:[ { required: true, message: '不能为空',trigger:'blur'},
                        { type: 'number', message: '必须为数字值',trigger:'blur'}]
                }
            }

        },
        methods:{
            getCheckedKeys(){
                const check=this.$refs.tree.getCheckedKeys(true)
                const p=check.join(",")
                console.log(p)
                this.formData.parentId=p
               /* console.log(this.$refs.tree.getCheckedKeys());*/
            },
            getChange(value){
              if(0 != value){
                 this.isShow=true
              }else {
                  this.isShow=false
              }
            },
            submit(){
                this.$refs['FormD'].validate((validate)=>{
                    if(validate){
                          addMenu(this.formData).then(res=>{
                                      this.loading=false
                                      this.$msg.success("添加成功")
                                      this.$emit('submitSuss')
                                      this.close()
                                  }).catch(erro=>{
                                      this.$msg.error(erro)
                                      this.close()
                                  })
                    }else{
                        console.log('error submit!!');
                        return false;
                    }

                })
       /*    this.$refs['FormD'].validate((boolean,object)=>{
               if(boolean){
                   alert('submit!');
               }else{
                   console.log(object)
                   return false;
               }
           })*/
            },
        /*    submitForm() {

                this.$refs['FormD'].validate(async (valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log(valid)
                        console.log('error submit!!');
                        return false;
                    }
                });
            },*/
            close(){
                this.visible=false
                this.$refs['FormD'].resetFields()
                this.loading=false
            },
            open(id){
                this.visible=true
                queryMenu().then(res=>{
                    this.data2=res.data
                }).catch(erro=>{
                    this.$msg.error(erro)
                })
                if(id){
                    queryById(id).then(res=>{

                        this.formData=res.data
                        const arr=[res.data.parentId]

                        this.checkenParentId=arr
                        console.log(this.checkenParentId)
                    }).catch(erro=>{
                       this.$msg.error(erro)
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>
