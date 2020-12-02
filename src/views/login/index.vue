<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登 录</span>
      </div>
      <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model.trim="loginForm.username"
              placeholder="请输入登录名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              prefix-icon="el-icon-user"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model.trim="loginForm.password"
              name="password"
              type="password"
              tabindex="2"
              placeholder="请输入登录密码"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-form-item>
            <el-col :span="12" style="overflow:hidden">
              <el-form-item prop="captcha">
                <el-input
                  v-model="loginForm.code"
                  type="test"
                  auto-complete="off"
                  placeholder="验证码, 单击图片刷新"
                  style="width: 100%;"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item>
                <img
                  style="width: 85%;height: 35px;float: right;"
                  class="pointer"
                  :src="src"
                  alt=""
                  @click="refreshCaptcha"
                >
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>

        </el-form>
      </div>
    </el-card>
  </div>

</template>

<script>

import { timeFix } from '@/utils/util'
import { Notification } from 'element-ui'

export default {
  name: 'Login',
  data () {
    const validateUsername = ( rule, value, callback) => {
      if(!value){
        callback(new Error('请输入登录名'))
      }else{
        callback()
      }
    }
    const validatePassword = ( rule, value, callback) => {
      if(!value){
        callback(new Error('请输入登录密码'))
      }else{
        callback()
      }
    }
    return {
      // TODO
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: '',
        t: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      redirect: undefined,
      src:''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.refreshCaptcha();
  },
  methods: {
    refreshCaptcha: function() {
      this.loginForm.code = ''
      this.loginForm.t = new Date().getTime()
      // this.loginForm.src = process.env.BASE_API + '/captcha.jpg?t=' + this.loginForm.t
      this.src = '/captcha.jpg?t=' + this.loginForm.t
    },
    handleLogin() {
      let that = this
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          that.loading = true
          that.$store.dispatch('user/login', this.loginForm).then((res) => {
            that.$router.push({ path: that.redirect || '/' })
            setTimeout(() => {
              Notification.success({
                title: '欢迎',
                message: `${timeFix()}，欢迎回来`
              })
            }, 1000)
            that.loading = false
          }).catch(() => {
            that.loading = false
            this.refreshCaptcha()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    display:flex;
    justify-content:center;
    align-items: center;
    min-width: 480px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 200px;
    min-width: 480px;
  }
  .pointer {
    cursor: pointer;
  }
</style>
