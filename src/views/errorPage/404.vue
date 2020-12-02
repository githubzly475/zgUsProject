<template>
  <div class="container-404">
    <div class="http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/404.png" alt="404">
      </div>
      <div class="not-found">
        <div class="not-found__oops">糟糕!</div>
        <div class="not-found__headline"> 抱歉，您访问的页面不存在 </div>
        <div class="not-found__info"> 您访问的页面迷路了，回首页再找一找吧 </div>
        <a href="" class="not-found__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Page404',
  }
</script>

<style lang="scss" scoped>
  .container-404{
    transform: translate(-50%,-50%);
    position: absolute;
    top: 40%;
    left: 50%;
  }
  .http404 {
    position: relative;
    width: 1000px;
    padding: 0 50px;
    overflow: hidden;
    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;
      &__parent {
        width: 100%;
      }
    }
    .not-found {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
</style>
