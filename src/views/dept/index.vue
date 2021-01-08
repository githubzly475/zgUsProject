<template>
    <div class="sv-row">
      <el-card slot="left" class="sv-content sv-col-24">
        <s-table   :data="data"
                   :pagination-total="sysDept.total"
                   :pagination-params="sysDept.pager"
                   :on-page-turning="onDeptPageTurning"
                   :loading="sysDept.loading"
                   :on-reset="handleReset"
                   :on-search="handleSearch"
        >
        <template slot="columns">
          <el-table-column label="部门名称" prop="deptName"></el-table-column>
          <el-table-column label="创建时间" prop="createTime">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatCreateDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="createUser"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button  size="mini" type="primary" icon="el-icon-tickets" @click="detail(id)"/>
              <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit(row.id)"/>

            </template>
          </el-table-column>
        </template>
          <template slot="operationbar">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建2</el-button>
          </template>

          <template slot="searchbar">
            <el-form-item>
              <el-input placeholder="部门名称" v-model="searchParams.deptName" clearable />
            </el-form-item>
          </template>
        </s-table>
        <dept-dialog ref="deptDialog" :cutitle="title" @submitOver="getDetpList"></dept-dialog>
      </el-card>
    </div>
</template>

<script>

import STable from '@/components/commons/STable'
import DeptDialog from "./DeptDialog";
import {formatDate} from '@/utils/date'

import {queryDeptList} from '@/customeraxios/dept'

    export default {
        name: "index",
        components:{STable,DeptDialog},
        data(){
            return{
                title:'',
                sysDept:{total:0,loading:false,pager: { page: 1, pageSize: 10 }},
                data:[],
                searchParams:{deptName:''}
            }
        },
        methods:{
            onDeptPageTurning(pager) {
                this.sysDept.pager = pager
                this.getDetpList()
            },
            getDetpList(){
                const data={...this.sysDept.pager,...this.searchParams}
                queryDeptList(data).then(res=>{
                  this.data=res.data.list;
                  this.sysDept.total=res.data.total;
                }).catch(error=>{

                })
            },
            handleSearch(){
                this.sysDept.pager.page=1
              this.getDetpList()

            },
            handleReset(){
              this.searchParams.deptName=null;
              this.getDetpList();
            },
            handleAdd(){
                this.title='部门添加'
              this.$refs['deptDialog'].open('')
            },
            detail(id){

            },
            edit(id){

                this.title='编辑'
                this.$refs['deptDialog'].open(id)
            }


        },created() {
            this.getDetpList()
        },
        filters:{
            formatCreateDate(time){
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        }

    }
</script>

<style scoped>

</style>
