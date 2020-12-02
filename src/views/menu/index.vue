<!--suppress ALL -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-refresh" @click="findTreeData">刷新</el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加菜单</el-button>
    </div>

    <el-table
      :data="tableTreeData.filter(data => !search || data.menuName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;margin-bottom: 20px;"
      row-key="menuId"
      v-loading="loading"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="menuName"
        label="名称"
        width="220">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="medium"
            placeholder="输入名称搜索">
            <template slot="prepend">名称</template>
          </el-input>
        </template>
      </el-table-column>

      <el-table-column label="图标" align="center" width="100">
        <template slot-scope="scope" v-if="scope.row.menuIcon">
          <svg-icon :icon-class="scope.row.menuIcon" />
        </template>
      </el-table-column>

      <el-table-column label="类型" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.menuType === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.menuType === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.menuType === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="parentName"
        label="上级菜单"
        align="center"
        width="140"/>

      <el-table-column
        prop="menuPath"
        label="菜单URL"
        align="center"
        width="140"/>

      <el-table-column
        prop="menuComponent"
        label="菜单组件"
        align="center"/>

      <el-table-column
        prop="menuPerms"
        label="授权标识"
        align="center"/>

      <el-table-column
        prop="menuSort"
        label="排序"
        align="center"
        width="90"/>

      <el-table-column label="操作" fixed="right" width="150" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 新增修改界面 -->
    <el-dialog
      :title="!dataForm.menuId ? '新增' : '修改'"
      width="50%"

      :visible.sync="dialogVisible"
      :close-on-click-modal="false">

      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        v-loading="submitLoading"
        label-width="80px"
        size="small"
        style="text-align:left;">

        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="dataForm.menuType" :disabled="disabled" @change="typeSelect" >
            <el-radio v-for="(type, index) in menuTypeList" :key="index" :label="index">{{ type }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="dataForm.menuType !== 2" label="菜单图标">
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            @show="$refs['iconSelect'].reset()">
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="dataForm.menuIcon" placeholder="点击选择图标" readonly>
              <svg-icon
                v-if="dataForm.menuIcon"
                slot="prefix"
                :icon-class="dataForm.menuIcon"
                class="el-input__icon"
                style="height: 32px;width: 16px;"/>
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>

        <el-form-item :label="menuTypeList[dataForm.menuType] + '名称'" prop="menuName">
          <el-input v-model.trim="dataForm.menuName" :placeholder="menuTypeList[dataForm.menuType] + '名称'" />
        </el-form-item>

        <el-form-item v-if="dataForm.menuType !== 0" label="上级菜单" prop="parentName">
          <popup-tree-input
            :data="popupTreeData"
            :props="popupTreeProps"
            :prop="dataForm.parentName === null||dataForm.parentName === ''?'根节点':dataForm.parentName"
            :node-key="''+dataForm.parentId"
            :current-change-handle="handleTreeSelectChange"/>
        </el-form-item>

        <el-form-item v-if="dataForm.menuType !== 0" label="授权标识" prop="menuPerms">
          <el-input v-model.trim="dataForm.menuPerms" placeholder="如: sys:user:add, sys:user:edit, sys:user:delete" />
        </el-form-item>

        <el-form-item v-if="dataForm.menuType === 1" label="菜单路由" prop="menuComponent">
          <el-row>
            <el-col :span="22">
              <el-input v-model.trim="dataForm.menuComponent" placeholder="路由组件" />
            </el-col>
            <el-col :span="2" class="icon-list__tips">
              <el-tooltip placement="top" effect="light" style="padding: 10px;">
                <div slot="content">
                  <p>路由组件格式：</p>
                  <p>1.常规业务开发的功能URL，如用户管理，Views目录下页面路径为 @view/sys/user, 此处填写 sys/user。</p>
                </div>
                <i class="el-icon-warning" />
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item v-if="dataForm.menuType !== 2" label="菜单URL" prop="menuPath">
          <el-col :span="22">
            <el-input v-model.trim="dataForm.menuPath" placeholder="菜单URL" />
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light" style="padding: 10px;">
              <div slot="content">
                <p>URL格式：</p>
                <p>1.常规业务开发的功能URL，此处对应浏览器URL显示。</p>
              </div>
              <i class="el-icon-warning" />
            </el-tooltip>
          </el-col>
        </el-form-item>

        <el-form-item v-if="dataForm.menuType !== 2" label="排序编号" prop="menuSort">
          <el-input-number
            v-model="dataForm.menuSort"
            controls-position="right"
            :min="0"
            label="排序编号"/>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="submitForm">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
  import PopupTreeInput from '@/components/PopupTreeInput'
  import IconSelect from '@/components/IconSelect'
  import { saveMenu, getMenuTree, updateMenu, deleteMenu } from '@/api/menu'
  import { formatData, getPar } from '@/utils/webUtils'

  export default {
    components: { PopupTreeInput, IconSelect },
    data() {
      const validateName = ( rule, value, callback) => {
        if(!value.trim){
          callback(new Error('请输入名称'))
        }else{
          callback()
        }
      }
      const menuTypeValiator = (rule, value, callback) =>{
        let menuTypeValiator = this.menuTypeValiator
        let menuType = this.dataForm.menuType
        switch (menuType) {
          case 1:
            if (menuTypeValiator !== 0) {
              callback(new Error('上级菜单只能为目录类型'))
            }
            break
          case 2:
            if(menuTypeValiator !== 1){
              callback(new Error('上级菜单只能为菜单类型'))
            }
            break
        }
      }
      const menuPermsValiator = (rule, value, callback)=>{
        let menuType = this.dataForm.menuType
        if(menuType !==0 && !value){
          callback(new Error('必填项不能为空'))
        }else{
          callback()
        }
      }
      const menuComponentValiator = (rule, value, callback)=>{
        let menuType = this.dataForm.menuType
        if(menuType===1 && !value){
          callback(new Error('必填项不能为空'))
        }else{
          callback()
        }
      }
      const menuPathValiator = (rule, value, callback)=>{
        let menuType = this.dataForm.menuType
        if(menuType !==2 && !value){
          callback(new Error('必填项不能为空'))
        }else{
          callback()
        }
      }
      return {
        isEditForm: false,
        loading: false,
        submitLoading: false,
        search:'',
        dialogVisible: false, // 控制弹出框
        disabled: false,
        menuTypeList: ['目录', '菜单', '按钮'],
        menuTypeValiator: '', // 校验规则使用
        dataForm: {
          menuId: '',
          menuType: 1,
          menuName: '',
          parentId: 0,
          menuComponent: '',
          parentName: '',
          menuPath: '',
          menuPerms: '',
          menuSort: 0,
          menuIcon: ''
        },
        tableTreeData: [],
        // 表单校验
        dataRule: {
          menuName: [
            { required: true, trigger: 'blur', message: '名称不能为空' }
          ],
          parentName: [
            { required: true, trigger: 'blur', validator: menuTypeValiator }
          ],
          menuPerms: [
            { required: true, trigger: 'blur', validator: menuPermsValiator }
          ],
          menuComponent: [
            { required: true, trigger: 'blur', validator: menuComponentValiator }
          ],
          menuPath: [
            { required: true, trigger: 'blur', validator: menuPathValiator }
          ]
        },

        popupTreeData: [],
        popupTreeProps: {
          label: 'menuName',
          children: 'children'
        },
      }
    },

    created() {
      this.findTreeData()
    },

    methods: {
      selected(name) {
        this.dataForm.menuIcon = name
      },
      // 获取数据
      findTreeData: function() {
        this.loading = true
        getMenuTree().then(res => {
          this.loading = false
          if(res.code === 200 && res.data){
            this.tableTreeData = res.data
            this.popupTreeData = this.getParentMenuTree(res.data)
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        }).catch(() =>{
          this.loading = false
          this.$message({
            type: 'error',
            message: '发生未知错误，请稍后重试！'
          })
        })
      },
      // 获取上级菜单树
      getParentMenuTree: function(tableTreeDdata) {
        const parent = {
          parentId: 0,
          menuName: '根节点',
          children: tableTreeDdata
        }
        return [parent]
      },

      handleFind: function() {
        this.findTreeData()
      },

      init(row){
        this.$nextTick(()=>{
          this.$refs['dataForm'].clearValidate()
        })
      },

      typeSelect(value){
        this.dataForm = {
          menuId: '',
          menuType: value,
          menuName: '',
          parentId: 0,
          menuComponent: '',
          parentName: '',
          menuPath: '',
          menuPerms: '',
          menuSort: 0,
          menuIcon: ''
        }
        this.init({})
      },

      // 显示新增界面
      handleAdd: function() {
        this.dialogVisible = true
        this.isEditForm = false
        this.init({})
        this.disabled = false
        this.dataForm = {
          menuId: '',
          menuType: 2,
          menuName: '',
          parentId: '',
          menuComponent: '',
          parentName: '',
          menuPath: '',
          menuPerms: '',
          menuSort: 0,
          menuIcon: ''
        }
      },

      // 显示编辑页面
      handleEdit: function(row) {
        this.isEditForm = true
        this.dialogVisible = true
        this.disabled = true
        const { menuId, menuType, menuName, parentId, parentName, menuComponent, menuPath, menuPerms, menuSort, menuIcon } = row
        this.init()
        this.dataForm.menuId = menuId
        this.dataForm.menuType = menuType
        this.dataForm.menuName = menuName
        this.dataForm.parentId = parentId
        this.dataForm.menuComponent = menuComponent
        this.dataForm.parentName = parentName
        this.dataForm.menuPath = menuPath
        this.dataForm.menuPerms = menuPerms
        this.dataForm.menuSort = menuSort
        this.dataForm.menuIcon = menuIcon
        if(parentId && menuType === 1){ // 处理校验
          let treeData = this.popupTreeData[0].children
          let t = treeData.find(item => item.menuId === parentId)
          console.log('t',t)
          this.menuTypeValiator = t.menuType
        }
      },
      // 菜单树选中
      handleTreeSelectChange(data) {
        this.dataForm.parentId = data.menuId
        this.dataForm.parentName = data.menuName
        this.menuTypeValiator = data.menuType
        this.$refs['dataForm'].validateField('parentName')
      },

      // 删除操作
      handleDelete: function(row) {
        const that = this
        this.$confirm('此操作将把分类删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteMenu(row.menuId).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                that.findTreeData()
              } else {
                this.$message({
                  type: 'error',
                  message: response.msg
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '发生未知错误，已取消删除！'
            })
          })
      },

      // 新增修改操作
      submitForm: function() {
        const that = this
        that.submitLoading = true
        if (that.isEditForm) {
          updateMenu(that.dataForm).then(response => {
            if (response.code === 200) {
              that.$message({
                type: 'success',
                message: '操作成功'
              })
              that.dialogVisible = false
              that.submitLoading = false
              that.findTreeData()
            } else {
              that.submitLoading = false
              that.$message({
                type: 'error',
                message: response.msg
              })
            }
          }).catch(() =>{
            that.submitLoading = false
            that.$message({
              type: 'info',
              message: '已取消本次操作'
            })
          })
        } else {
          saveMenu(that.dataForm).then(response => {
            if (response.code === 200) {
              that.$message({
                type: 'success',
                message: '操作成功'
              })
              that.submitLoading = false
              that.dialogVisible = false
              that.findTreeData()
            } else {
              that.submitLoading = false
              that.$message({
                type: 'error',
                message: response.msg
              })
            }
          }).catch(() =>{
            that.submitLoading = false
            that.$message({
              type: 'info',
              message: '已取消本次操作'
            })
          })
        }
      }
    }
  }
</script>
