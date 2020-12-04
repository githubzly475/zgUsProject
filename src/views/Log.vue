<template>

<div>
  <el-form :model="formData"  class="form" ref="Form">
    <el-form-item label="用户名">
      <el-input v-model="formData.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="formData.password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="btn"  @click="submit">登 录</el-button>
    </el-form-item>
  </el-form>
</div>


</template>

<script>
    import Home from '@/views/Home.vue'
    import {login} from '@/customeraxios/login.js'
    import {setToken} from '@/utils/auth.js'

    export default {
        name: "Log",
        data(){
           return {
               formData: {
                   username:'',
                   password:''
               }

           }
        },
        components:{
            Home
        },
        methods:{
            log(){
                this.$router.push('/home')
            },
            submit(){
                console.log(this.formData)
                login(this.formData).then(res=>{
                  console.log(res)
                    setToken(res.data.tokenValue)
                    this.$router.push('/home')
                }).catch(error=>{

                })
            }
        }

    }
</script>

<style scoped>

</style>
