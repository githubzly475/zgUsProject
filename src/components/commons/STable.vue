<template>
  <div class="sv-table">
    <!-- 普通搜索 -->
    <div class="sv-table-normal-search"
         v-if="($slots['operationbar'] || $slots['searchbar']) && !$slots['advancedSearch']"
    >
      <div class="sv-table-button-wrapper" v-if="$slots['operationbar']" style="margin-bottom: 10px;" >
        <slot name="operationbar"/>
      </div>
      <div class="sv-table-search-wrapper" v-if="$slots['searchbar']">
        <el-form inline @submit.native.prevent.stop="handleSearch">
          <slot name="searchbar"/>
          <el-form-item>
            <el-button-group style="margin-top: -3px">
              <el-button icon="el-icon-search" @click="handleSearch" type="primary" plain>搜索</el-button>
              <el-button icon="el-icon-refresh-left" @click="handleReset">重置</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 高级搜索 -->
    <div class="sv-table-normal-search"
         v-if="($slots['operationbar'] || $slots['searchbar']) && $slots['advancedSearch']"
    >
      <div class="sv-table-button-wrapper" v-if="$slots['operationbar']" style="margin-bottom: 10px;" >
        <slot name="operationbar"/>
      </div>
      <div class="sv-table-search-wrapper" v-if="$slots['searchbar']">
        <el-form inline @submit.native.prevent.stop="handleSearch" class="sv-table-search-wrapper">
          <slot name="searchbar"/>
          <el-button-group class="sv-table-search-button" v-if="$slots['searchbar']">
            <el-button icon="el-icon-search" @click="handleSearch" type="primary" plain>搜索</el-button>
            <el-button icon="el-icon-refresh-left" @click="handleReset">重置</el-button>
            <el-button icon="el-icon-s-operation" @click="advancedSearch = !advancedSearch"
                       v-if="$slots['advancedSearch']"
            >
              更多
            </el-button>
          </el-button-group>
        </el-form>


      </div>


    </div>
    <div>
      <el-form inline @submit.native.prevent.stop="handleSearch" class="advanced-search"
               v-if="$slots['advancedSearch'] && advancedSearch" style="text-align: right"
      >
        <slot name="advancedSearch"/>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="sv-table-list" ref="svTable">
      <el-table
        border
        ref="mbTable"
        :max-height="maxHeight"
        :data="data"
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll"
        :tree-props="treeProps"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :lazy="lazy"
        v-loading="loading"
        :highlight-current-row="highlightCurrentRow"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @row-contextmenu="handleRowContextMenuClick"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <el-table-column v-if="checkable" align="center" width="50" type="selection"></el-table-column>
        <el-table-column label="序号" width="80"  align="center" v-if="index">
          <template v-slot="{row, $index}">
            {{($index + 1) + paginationParams.pageSize * (paginationParams.page - 1)}}
          </template>
        </el-table-column>
        <slot name="columns"/>
      </el-table>
      <resize-observer @notify="resizeHeight"/>
    </div>
    <el-pagination
      v-if="pageable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationParams.page"
      :page-sizes="paginationSizes"
      :page-size="paginationParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationTotal">
    </el-pagination>
  </div>
</template>

<script>
import { ResizeObserver } from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'

export default {
  name: 'STable',
  components: { ResizeObserver },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    pageable: {
      type: Boolean,
      default: true
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    paginationSizes: {
      type: Array,
      default () {
        return [10, 20, 30]
      }
    },
    paginationTotal: {
      type: Number,
      default: 0
    },
    paginationParams: {
      type: Object,
      default () {
        return {
          page: 1,
          pageSize: this.paginationSizes[0]
        }
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    lazy: Boolean,
    rowKey: [String, Function],
    defaultExpandAll: Boolean,
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    treeProps: {
      type: Object,
      default () {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        }
      }
    },
    rowClassName: [String, Function],
    cellClassName: [String, Function],
    cellStyle: [String, Function],
    /* 按查询条件返回数据 */
    onSearch: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    onSelectionChange: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    onSelect: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    onSelectAll: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    onRowContextMenuClick:{
      type: Function,
      default() {
        return function () {}
      },
    },
    onRowClick: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    /* 按查询条件和分页参数返回数据 */
    onPageTurning: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    onReset: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    operationEncodingReload: {
      type: Function,
      default () {
        return function () {
        }
      }
    },
    index: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      maxHeight: Infinity,
      advancedSearch: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.resizeHeight()
    }, 100)
  },
  methods: {
    getTable () {
      return this.$refs.mbTable
    },
    resizeHeight () {
      this.maxHeight = this.$refs.svTable.offsetHeight
    },
    handleSearch() {
      this.onSearch()
      this.$emit('search')
    },
    handleReset() {
      this.onReset()
      this.$emit('reset')
    },
    handleSizeChange(pageSize) {
      const size = this.paginationParams.size
      const maxSize = Math.ceil(this.paginationTotal / pageSize)
      this.paginationParams.size = size > maxSize ? maxSize : size
      this.paginationParams.pageSize = pageSize
      this.onPageTurning(this.paginationParams)
    },
    handleCurrentChange(current) {
      this.paginationParams.page = current
      this.onPageTurning(this.paginationParams)
    },
    handleSelectionChange(selection) {
      this.onSelectionChange(selection)
    },
    handleSelect(selection, row) {
      this.onSelect(selection, row)
    },
    handleSelectAll (selection) {
      this.onSelectAll(selection)
    },
    handleRowClick (row, column, event) {
      this.onRowClick(row, column, event)
    },
    handleRowContextMenuClick(row, column, event){
      this.onRowContextMenuClick(row, column, event)
    }
  }
}
</script>

<style scoped lang="less">
  .sv-table {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;

    .sv-table-list {
      display: flex;
      flex: 1;
      margin-bottom: 12px;
      overflow: hidden;
    }
  }

  .sv-table-normal-search {
    display: flex;

    .sv-table-search-wrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      /deep/ .el-form-item {
        margin-bottom: 8px;
      }
    }
  }

  .sv-table-advanced-search {
    .sv-table-search-wrapper {
      padding-bottom: 4px;
      margin-bottom: 4px;
      border-bottom: 1px solid #ebeef5;
    }

    .sv-table-button-wrapper {
      display: flex;

      .sv-table-search-button {
        margin-left: auto;
      }
    }


    .normal-search {
      /deep/ .el-form-item {
        margin-top: 0;
      }
    }

    /deep/ .el-form-item {
      margin-bottom: 0;
      margin-top: 8px;
    }
  }
</style>
