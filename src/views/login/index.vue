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
        <el-button type="primary" class="btn"  @click="denglu">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
    import Home from '@/views/Home.vue'
    import {login} from '@/customeraxios/login.js'
    import {setToken} from '@/utils/auth.js'

    export default {
        name: "Login",
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
            denglu(){
                /*    console.log(this.formData)
                    login(this.formData).then(res=>{
                      console.log(res)
                        setToken(res.data.tokenValue)
                        this.$store.commit('SET_TOKEN',res.data.tokenHead+res.data.tokenValue)
                        this.$router.push('/home')
                    }).catch(error=>{

                    })*/
                this.$store.dispatch('user/login', this.formData).then((res) => {
                    console.log('ddddddddddd')
                    this.$router.push({ path: this.redirect || '/' })
                    // this.$router.push({path: that.redirect || '/'})
                }).catch(error=>{
                    console.log(error)
                    console.log('eeeeeee')
                })


                /*  this.$store.dispatch('user/login', this.formData).then((res) => {
                      this.$router.push('/home')
                  })*/
            }
        }

    }
</script>

<style scoped>

</style>
