/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 * table中ref定义myTable
 * TODO export import upload image
 */
import { filterObj } from '@/utils/util'
import { getAction, deleteAction } from "@/api/manage"
import { formatData } from "@/utils/webUtils"


export const ListMixins = {

  computed:{
    batchOperation: function () {
      return this.alertTitle > 0 ? true : false
    }
  },

  data(){
    return {
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      tableData: [],
      /* table加载状态 */
      loading: false,
      /* 多选 */
      multipleSelection: [],
      /* 选择项 */
      alertTitle: 0,
      /* 分页 */
      pageParam: {
        page: 1,
        limit: 10,
        total: 0
      },
    }
  },
  created() {
    this.loadData();
  },
  methods:{
    loadData(arg) {
      const that = this
      if(!that.url){
        that.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        that.pageParam.page = 1
      }
      let params = that.getQueryParams()//查询条件

      // TODO
      // console.log('params:',params)

      // that.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.code===200) {
          that.tableData = res.data
          that.pageParam.total = res.data.length
        } else {
          that.$message.warning(res.msg)
        }
        that.loading = false
      })
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      let param = Object.assign(sqp, this.queryParam)
      param.pageNo = this.pageParam.page
      param.pageSize = this.pageParam.limit
      return filterObj(param)
    },
    searchQuery() {
      this.loadData(1)
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.alertTitle = val.length
    },
    clearMultipleSelection(){
      this.$refs.myTable.clearSelection()
    },
    handleCommand(val){
      switch (val) {
        case 'batchDel':
          this.handleBatchDel()
          break;
        default:
          console.log('please set dropdown command or do not have methods about this command')
          break;
      }
    },
    handleBatchDel() {
      const that = this
      if(!that.url.deleteBatch){
        that.$message.error("请设置url.deleteBatch属性!")
        return
      }
      if (that.multipleSelection.length <= 0) {
        that.$message.warning('请至少选择一条记录！')
        return
      } else {
        let ids = []
        for (let a = 0; a < this.multipleSelection.length; a++) {
          ids.push(this.multipleSelection[a].id)
        }
        that.$confirm('是否删除选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(()=>{
            that.loading = true
            deleteAction(that.url.deleteBatch, {ids: ids.join(",")}).then((res) => {
              if (res.code === 200) {
                that.$message.success(res.msg)
                that.loadData()
                that.clearMultipleSelection()
              } else {
                that.$message.warning(res.msg)
              }
            }).finally(() => {
              that.loading = false
            });
          })
          .catch(() =>{
            that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    handleDelete(id) {
      const that = this
      if(!that.url.delete){
        that.$message.error("请设置url.delete属性!")
        return
      }
      deleteAction(that.url.delete, {id: id}).then((res) => {
        if (res.code === 200) {
          that.$message.success(res.msg)
          that.loadData()
        } else {
          that.$message.warning(res.msg)
        }
      });
    },
    handleDeleteCancel(){
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    },
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = "编辑"
      this.$refs.modalForm.disableSubmit = false
    },
    handleAdd: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = "新增"
      this.$refs.modalForm.disableSubmit = false
    },
    handleDetail:function(record){
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title="详情"
      this.$refs.modalForm.disableSubmit = true
    },
    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData();
    },

  }

}
