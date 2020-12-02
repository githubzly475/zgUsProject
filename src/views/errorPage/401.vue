<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">您的权限不足...</h1>
        <h2>哎呀！您不能操作此模块</h2>
        <h6>建议您联系管理员授权!</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/dashboard">返回首页</router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Page401',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 100px;
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
