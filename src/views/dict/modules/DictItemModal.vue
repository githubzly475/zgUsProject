<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="title" width="45%" >
    <el-form v-loading="confirmLoading"  ref="dataForm" :model="model" :rules="rules" size="medium" label-width="120px" class="form-container" >
      <el-form-item label="名称" prop="keyName">
        <el-input v-model="model.keyName"  placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="数据值" prop="keyCode">
        <el-input v-model="model.keyCode" placeholder="请输入数据值" />
      </el-form-item>
      <el-form-item label="描述" prop="keyRemark">
        <el-input v-model="model.keyRemark" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="排序值" prop="keyRemark">
        <el-input-number v-model="model.valueSort" :min="0" /> （值越小越靠前）
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" v-show="!disableSubmit">
      <el-button type="text" @click="handleCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleOk">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { ModalMixins } from '@/mixins/ModalMixins'

  export default {
    name: "DictItemModal",
    mixins:[ModalMixins],
    data (){
      return {
        rules: {
          keyName: [
            { required: true, message: '名称不为空', trigger: 'blur' }
          ],
          keyCode: [
            { required: true, message: '数据值不为空', trigger: 'blur' }
          ]
        },
        url:{
          insert: 'sys/dict/insert',
          update:'sys/dict/update',
        },
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .form-container{
    width: 80%;
    margin: 0 auto;
  }
</style>
