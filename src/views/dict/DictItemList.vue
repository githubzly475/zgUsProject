<template>
  <el-drawer
    :title="title"
    :visible.sync="dialog"
    direction="rtl"
    custom-class="overflow-y-auto"
    size="50%">
    <div class="app-container">
      <!-- conditions -->
      <div class="search-container">
        <el-form :inline="true" ref="searchForm" :model="queryParam" label-width="60px" label-position="left">
          <el-form-item label="名称">
            <el-input v-model="queryParam.valueName" size="medium" class="width-50" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="数据值">
            <el-input v-model="queryParam.valueCode" size="medium" class="width-50" placeholder="请输入数据值"></el-input>
          </el-form-item>
          <!--<template v-if="toggleSearchStatus">-->
          <!--<el-form-item label="字典名称A">-->
          <!--<el-input v-model="query.name"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="字典编号A">-->
          <!--<el-input v-model="query.code"></el-input>-->
          <!--</el-form-item>-->
          <!--</template>-->
          <el-form-item>
            <el-button class="filter-item" type="primary" icon="el-icon-search" size="medium" @click="searchQuery">搜索</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-refresh-right" size="medium" @click="searchReset">重置</el-button>
            <!--<el-button @click="toggleSearchStatus = !toggleSearchStatus"-->
            <!--type="text"-->
            <!--:icon="toggleSearchStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down '" >-->
            <!--{{ toggleSearchStatus ? '收起' : '展开'  }}-->
            <!--</el-button>-->
          </el-form-item>
        </el-form>
      </div>

      <!-- top operations -->
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-plus" size="medium" @click="handleAddCustom">新增</el-button>
      </div>

      <!-- table -->
      <el-table
        ref="myTable"
        border
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        max-height="640"
        style="width: 100%;">
        <el-table-column
          align="center"
          label="名称"
          prop="valueName"
          :resizable="false"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="数据值"
          prop="valueCode"
          :resizable="false"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="描述"
          :resizable="false"
          show-overflow-tooltip>
        </el-table-column>
        <!--table inline operations-->
        <el-table-column
          align="center"
          label="操作"
          :resizable="false"
          width="160">
          <template slot-scope="scope">
            <div class="display-inline-div">
            <!--<div v-auth="'sys:dict:value:edit'">-->
              <el-button
                @click.native.prevent="handleEdit(scope.row)"
                type="text"
                icon="el-icon-edit"
                size="small">
                编辑
              </el-button>
            </div>
            <!--<div v-auth="'sys:dict:value:delete'">-->
            <div class="display-inline-div">
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm
                placement="top"
                @onConfirm="handleDelete(scope.$index)"
                @onCancel="handleDeleteCancel"
                title="是否删除此条数据？">
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  size="small"
                  slot="reference">删除</el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!--pagination-->
      <pagination
        v-show="pageParam.total>0"
        :total.sync="pageParam.total"
        :page.sync="pageParam.page"
        :limit.sync="pageParam.limit"
        :layout="paginationConfig.layout"
        :pageSizes="paginationConfig.pageSizes"
        @pagination="loadData" />

      <!-- DictValue add/edit modules-->
      <dict-item-modal ref="modalForm" @ok="modalFormOk"></dict-item-modal>

    </div>
  </el-drawer>
</template>

<script>
  import pagination from '@/components/Pagination'
  import DictItemModal from "./modules/DictItemModal"
  import { getAction } from "@/api/manage";

  import { ListMixins } from '@/mixins/ListMixins'

  export default {
    name: "DictItemList",
    mixins:[ListMixins],
    components: { DictItemModal, pagination },
    data() {
      return {
        title: '',
        dialog: false,
        loading: false,
        paginationConfig:{
          pageSizes: [5, 10, 15],
          layout: 'total, prev, pager, next, sizes'
        },
        url:{
          list: 'sys/dict/value/list',
          delete: 'sys/dict/value/delete'
        },
        keyId: '',
      };
    },
    methods: {
      getKeyId(id,arg){
        if(id){
          this.keyId = id
          this.queryParam.keyId = id
          this.loadData(arg)
        }
      },
      loadData(arg){
        const that = this
        if(that.keyId){
          if(!that.url){
            that.$message.error("请设置url.list属性!")
            return
          }
          //加载数据 若传入参数1则加载第一页的内容
          if (arg === 1) {
            that.pageParam.page = 1
          }
          that.queryParam.keyId = that.keyId
          let params = that.getQueryParams()//查询条件

          // TODO
          // that.loading = true
          getAction(this.url.list, params).then((res) => {
            if (res.code===200) {
              that.tableData = res.data;
              that.pageParam.total = res.data.length;
            } else {
              that.$message.warning(res.msg)
            }
            that.loading = false
          })
        }
      },
      handleAddCustom(){
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = "新增"
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.getValueKeyId(this.keyId);

      }
    }
  }
</script>

<style>
  .app-container{
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid rgb(233, 233, 233);
    background: rgb(255, 255, 255);
    padding: 20px;
  }
  .width-50{
    width: 150px;
  }
  .display-inline-div {
    display: inline-block;
  }
  .el-drawer__header span:focus {
    outline: 0 !important;
    font-weight: bolder;
  }
</style>

