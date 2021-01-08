<template>
  <el-dialog
    class="sv-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    @open="handleDialogOpen"
    @close="handleDialogClose"
    :width="widthVal"
    append-to-body
    :close-on-click-modal="false"
    :fullscreen="fullscreen"
  >
    <slot v-if="visible" />
    <span slot="footer" class="dialog-footer" v-if="footerrable">
      <el-button @click="handleCancel" size="mini" v-if="cancelable" tabindex="-1">取 消</el-button>
      <el-button @click="handleSubmit" size="mini" v-if="submittable" type="primary" :loading="loading"  :disabled="disable"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'SDialog',
  data() {
    return {
      dialogVisible: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    onCancel: Function,
    beforeCancel: Function,
    onSubmit: Function,
    submittable: {
      type: Boolean,
      default: true,
    },
    cancelable: {
      type: Boolean,
      default: true,
    },
    width: String,
    size: String,
    loading: {
      type: Boolean,
      default: false,
    },
    disable:{
      type: Boolean,
      default: false,
    },
    fullscreen: Boolean,
  },
  computed: {
    footerrable() {
      return this.submittable || this.cancelable
    },
    widthVal() {
      let width = this.width
      if (!this.width && this.size) {
        switch (this.size) {
          case 'medium':
            width = '80vw'
            break
          case 'small':
            width = '50vw'
            break
          case 'mini':
            width = '30vw'
            break
        }
      }
      return width
    },
  },
  methods: {
    handleDialogClose() {
      this.$emit('update:visible', false)
      this.onCancel && this.onCancel()
    },
    handleDialogOpen() {
      this.$emit('update:visible', true)
    },
    close() {
      this.dialogVisible = false
    },
    handleCancel() {
      if (this.beforeCancel) {
        this.beforeCancel({ close: this.close })
      } else {
        this.close()
      }
    },
    handleSubmit() {
      if (this.onSubmit) {
        this.onSubmit()
      }
    },
  },
  watch: {
    visible(val) {
      if (val !== this.dialogVisible) {
        this.dialogVisible = val
      }
    },
  },
}
</script>

<style>
.sv-dialog .el-dialog__body {
  max-height: 55vh !important;
  overflow: auto !important;
}

.sv-dialog .el-dialog__body::-webkit-scrollbar {
  width: 7px;
  height: 1px;
}

/*滚动条滑块*/
.sv-dialog .el-dialog__body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d4d4d4;
}

/*滚动条轨道*/
.sv-dialog .el-dialog__body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background: #e8e8e8;
}
</style>
