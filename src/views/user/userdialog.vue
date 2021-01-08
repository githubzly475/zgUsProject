<template>
  <div>

    <s-dialog :title="cutitle"  :visible.sync="visible" :on-submit="submit" :on-cancel="close"
              :loading="loading" width="30%">
      <el-form ref="Form" :model="formData" :rules="formRules" label-position="right" label-width="100px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model.trim="formData.username" placeholder="请输入主题"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select  v-model.trim="formData.gender" placeholder="性别">
            <el-option v-for="item in gender"
                       :key="item.key"
                       :label="item.value"
                       :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input  v-model.trim="formData.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input  v-model.trim="formData.email" placeholder="邮箱"></el-input>
        </el-form-item>
      </el-form>

    </s-dialog>
  </div>



</template>

<script>
   import SDialog from '@/components/commons/SDialog'
   import {save,getByUserId} from '@/customeraxios/user'

    export default {
        name: "UserDialog",
        components:{SDialog},
        props:{
            cutitle:{
                type:String,
                default:''
            }
        },
        data(){
            const checkPhone = (rule, value, callback) => {
                if (value && value.length > 0) {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的11位数字电话号码'))
                    }
                } else {
                    callback()
                }
            }
            return {
                visible:false,
                loading:false,
                formData:{id:'',username:'',gender:'',phone:'',email: ''},
                formRules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}],
                    phone: [{required: false, validator: checkPhone, message: '请输入正确的手机号'}]

                },
                gender: [
                    {key: 1, value: '男'}, {key: 2, value: '女'}
                ]
            }
        },
        methods:{
            open(id){
                this.visible=true
                if(id){
                    getByUserId(id).then(res=>{
                       this.formData=res.data
                    }).catch(erro=>{

                    })
                }
            },
            close() {
                this.$refs['Form'].resetFields()
                this.visible = false
                this.loading = false
            },
            submit(){
              const  validate= this.$refs['Form'].validate()
                if(validate){
                    this.loading = true
                    save(this.formData).then(res=>{
                        this.loading = false
                        this.$msg.success('添加成功')
                        this.$emit('submitOver')
                        this.close()
                    }).catch(erro=>{
                        this.loading = false
                        this.$msg.success('添加失败')
                        this.close()
                    })
                }else{
                    return
                }
            }

        }

    }
</script>

<style scoped>

</style>
