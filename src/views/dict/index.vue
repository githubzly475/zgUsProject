<template>
  <div class="app-container">
    <!-- conditions -->
    <div class="search-container">
      <el-form :inline="true" ref="searchForm" :model="queryParam" label-width="80px" label-position="left">
        <el-form-item label="字典名称">
          <el-input v-model="queryParam.keyName" size="medium" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典编码">
          <el-input v-model="queryParam.keyCode" size="medium" placeholder="请输入字典编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search" size="medium" @click="searchQuery">搜索</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-refresh-right" size="medium" @click="searchReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- top operations -->
    <div class="filter-container">

      <el-button class="filter-item" type="primary" icon="el-icon-plus" size="medium" @click="handleAdd">新增</el-button>

      <template v-if="batchOperation">
        <el-dropdown @command="handleCommand" placement="bottom">
          <el-button size="medium">
            批量操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='batchDel' icon="el-icon-delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>

    <!--contents-->
    <el-alert type="success" :closable="false" class="my-alert">
      <slot>
        已选择 {{alertTitle}} 项
        <el-button @click.navite.prevent="clearMultipleSelection" class="left-btn" type="text">清空</el-button>
      </slot>
    </el-alert>

    <!-- table -->
    <el-table ref="myTable"
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        type="selection"
        width="85">
      </el-table-column>
      <el-table-column
        align="center"
        label="字典名称"
        width="240"
        prop="keyName"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        label="字典编号"
        width="240"
        prop="keyCode"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="keyRemark"
        label="描述"
        show-overflow-tooltip>
      </el-table-column>
      <!--table inline operations-->
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="340">
        <template slot-scope="scope">
          <!--TODO auth-->
          <!--<div v-auth="'sys:dict:key:edit'">-->
          <div class="display-inline-div">
            <el-button
              @click.native.prevent="handleEdit(scope.row)"
              type="text"
              icon="el-icon-edit"
              size="small">
              编辑
            </el-button>
          </div>

          <!--<div class="sys:dict:value:setting">-->
          <div class="display-inline-div">
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click.native.prevent="handleDictVal(scope.row)"
              type="text"
              icon="el-icon-setting"
              size="small">
              配置字典值
            </el-button>
          </div>

          <!-- <div v-auth="'sys:dict:value:list'"> -->
          <div class="display-inline-div">
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              placement="top"
              @confirm="handleDelete(scope.row.id)"
              @cancel="handleDeleteCancel"
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
    <pagination v-show="pageParam.total>0" :total.sync="pageParam.total" :page.sync="pageParam.page" :limit.sync="pageParam.limit" @pagination="loadData" />

    <!-- add/edit modules -->
    <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal>

    <!-- DictValue -->
    <dict-item-list ref="dictItemList"></dict-item-list>
    <!-- DictValue add/edit modules-->
    <dict-item-modal ref="dictItemModal"></dict-item-modal>

  </div>
</template>

<script>

  import pagination from '@/components/Pagination'
  import DictModal from './modules/DictModal'
  import DictItemList from "./DictItemList";
  import DictItemModal from "./modules/DictItemModal"
  import { ListMixins } from '@/mixins/ListMixins'

  export default {

    name: 'DictList',

    mixins:[ListMixins],

    components: {DictModal, DictItemList, DictItemModal, pagination },

    data() {
      return {
        url:{
          list: 'sys/dict/list',
          delete:'sys/dict/delete',
          deleteBatch: 'sys/dict/delete/batch'
        }
      }
    },
    methods: {
      // 配置字典值
      handleDictVal(record){
        this.$refs.dictItemList.title = record.keyName + "：字典值列表"
        this.$refs.dictItemList.dialog = true
        this.$refs.dictItemList.getKeyId(record.id,1);
      },
    }
  }
</script>

<style lang="scss" scoped>
.display-inline-div{
  display: inline-block;
}
</style>
