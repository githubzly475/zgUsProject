<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="title" width="45%" >
    <el-form v-loading="confirmLoading"  ref="dataForm" :model="model" :rules="rules" size="medium" label-width="100px" class="dict-container" >
      <el-form-item label="字典名称" prop="keyName">
        <el-input v-model="model.keyName"  placeholder="请输入字典名称" />
      </el-form-item>
      <el-form-item label="字典编号" prop="keyCode">
        <el-input v-model="model.keyCode" placeholder="请输入字典编号" />
      </el-form-item>
      <el-form-item label="字典描述" prop="keyRemark">
        <el-input v-model="model.keyRemark" placeholder="请输入字典描述" />
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
    name: "DictModal",
    mixins:[ModalMixins],
    data (){
      return {
        rules: {
          keyName: [
            { required: true, message: '字典名称不为空', trigger: 'blur' }
          ],
          keyCode: [
            { required: true, message: '字典编号不为空', trigger: 'blur' }
          ]
        },
        url:{
          insert: 'sys/dict/insert',
          update:'sys/dict/update',
        },
      }
    },
    methods: {

    }

  }
</script>

<style scoped>
  .dict-container{
    width: 80%;
    margin: 0 auto;
  }
</style>
