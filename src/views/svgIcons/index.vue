<template>
  <div>
    <div class="icons-container">

      <aside class="my-aside">
        <a href="https://www.iconfont.cn/" target="_blank">新增
        </a>
      </aside>
      <el-tabs type="border-card">
        <el-tab-pane label="Icons-系统图标">
          <div class="grid">
            <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
              <el-tooltip placement="top">
                <div slot="content">
                  {{ generateIconCode(item) }}
                </div>
                <div class="icon-item">
                  <svg-icon :icon-class="item" class-name="disabled" />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Element-UI Icons-Element图标">
          <div class="grid">
            <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
              <el-tooltip placement="top">
                <div slot="content">
                  {{ generateElementIconCode(item) }}
                </div>
                <div class="icon-item">
                  <i :class="'el-icon-' + item" />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>


    </div>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
  import BackToTop from '@/components/BackToTop'
  import clipboard from '@/utils/clipboard'
  import svgIcons from './svg-icons'
  import elementIcons from './element-icons'

  export default {
    name: 'Icons',
    components: { BackToTop },
    data() {
      return {
        svgIcons,
        elementIcons,
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        }
      }
    },
    methods: {
      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}" />`
      },
      generateElementIconCode(symbol) {
        return `<i class="el-icon-${symbol}" />`
      },
      handleClipboard(text, event) {
        clipboard(text, event)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px;
    overflow: hidden;

    .my-aside{
      background: #eef1f6;
      padding: 8px 24px;
      margin-bottom: 20px;
      border-radius: 2px;
      display: block;
      line-height: 32px;
      font-size: 16px;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
      color: #2c3e50;
      -webkit-font-smoothing: antialiased;
    }

    .grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
