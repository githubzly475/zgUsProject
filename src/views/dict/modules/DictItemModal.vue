<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="title" width="45%" >
    <el-form v-loading="confirmLoading"  ref="dataForm" :model="model" :rules="rules" size="medium" label-width="120px" class="form-container" >
      <el-form-item label="名称" prop="valueName">
        <el-input v-model="model.valueName"  placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="数据值" prop="valueCode">
        <el-input v-model="model.valueCode" placeholder="请输入数据值" />
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="model.remark" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="排序值" prop="keyRemark">
        <el-input-number v-model="model.valueSort" :min="0" />（值越小越靠前）
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" v-show="!disableSubmit">
      <el-button type="text" @click="handleCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleOkCustom">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { ModalMixins } from '@/mixins/ModalMixins'
  import { postAction, putAction } from "@/api/manage";

  export default {
    name: "DictItemModal",
    mixins: [ModalMixins],
    data (){
      return {
        rules: {
          valueName: [
            { required: true, message: '名称不为空', trigger: 'blur' }
          ],
          valueCode: [
            { required: true, message: '数据值不为空', trigger: 'blur' }
          ]
        },
        url:{
          insert: 'sys/dict/value/insert',
          update:'sys/dict/value/update',
        },
        keyId: '',
        addKeyId: false
      }
    },
    created() {

    },
    methods: {
      getValueKeyId(id){
        if(id){
          this.keyId = id
          this.addKeyId = true
        }
      },
      handleOkCustom(){
        const that = this
        that.$refs['dataForm'].validate((valid) => {
          if(valid){
            that.confirmLoading = true
            that.loading = true
            if(that.addKeyId){ // 新增暂时这么处理
              this.model.keyId = that.keyId
            }
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
      }
    }
  }
</script>

<style scoped>
  .form-container{
    width: 80%;
    margin: 0 auto;
  }
</style>
