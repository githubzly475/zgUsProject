/**
 * 新增修改 表单ref定义为form
 */
import { postAction, putAction } from "@/api/manage";

export const ModalMixins = {

  data(){
    return {
      dialog: false,
      title: undefined,
      loading: false,
      disableSubmit: false,
      confirmLoading: false,
      model: {},
    }
  },

  methods:{
    add (){
      const that = this
      that.edit({})
    },
    edit(record){
      const that = this
      that.dialog = true
      that.$nextTick(()=>{
        that.$refs['dataForm'].clearValidate()
        that.$refs['dataForm'].resetFields()
        that.model = Object.assign({}, record)
      });
    },
    handleOk(){
      const that = this
      that.$refs['dataForm'].validate((valid) => {
        if(valid){
          that.confirmLoading = true
          that.loading = true
          let formData = Object.assign(this.model)
          let obj
          if (that.model.id) {
            obj = putAction(that.url.update, formData)
          } else {
            obj = postAction(that.url.insert, formData)
          }
          obj.then((res) => {
            if (res.code===200) {
              that.$message.success(res.msg || '操作成功！')
              that.$emit('ok')
            } else {
              that.$message.warning(res.msg || '操作失败！')
            }
          }).finally(() => {
            that.confirmLoading = false
            that.loading = false
            that.close()
          })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.dialog = false
    },

  }

}
