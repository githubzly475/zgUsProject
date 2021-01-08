<template>
  <div class="sv-row">
    <el-card slot="left" class="sv-content sv-col-24">
      <s-table   :data="data"
                 :pagination-total="sysRole.total"
                 :pagination-params="sysRole.pager"
                 :on-page-turning="onPageTurning"
                 :loading="sysRole.loading"
                 :on-reset="handleReset"
                 :on-search="handleSearch"
      >
        <template slot="columns">
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色标识" prop="roleCode"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="创建时间" prop="createTime">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatCreateDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="createBy"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button  size="mini" type="primary" icon="el-icon-tickets" @click="detail(scope.row)"/>
              <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
              <el-button  size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row)"/>
            </template>
          </el-table-column>
        </template>
        <template slot="operationbar">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建</el-button>
        </template>
        <template slot="searchbar">
          <el-form-item>
            <el-input placeholder="部门名称" v-model="searchParams.roleName" clearable />
          </el-form-item>
        </template>
      </s-table>
      <role-dialog ref="roleDialog" :cutitle="title" @submitOver="getTableList"></role-dialog>
    </el-card>
  </div>
</template>

<script>
  import STable from '@/components/commons/STable'
  import RoleDialog from "./RoleDialog";
  import {formatDate} from '@/utils/date'
  import {queryRoles} from '@/customeraxios/role'
    export default {
        name: "index",
        components:{STable,RoleDialog},
        data(){
            return{
                title:'',
                sysRole:{total:0,loading:false,pager: { page: 1, pageSize: 10 }},
                data:[],
                searchParams:{roleName:''}
            }
        },
        methods:{
            onPageTurning(pager) {
                this.sysDept.pager = pager
                this.getTableList()
            },
            getTableList(){

                const data={...this.sysRole.pager,...this.searchParams}
                queryRoles(data).then(res=>{
                    this.data=res.data.list;
                    this.sysRole.total=res.data.total;
                }).catch(error=>{

                })
            },
            handleSearch(){
                this.sysRole.pager.page=1
                this.getTableList()

            },
            handleReset(){
                this.searchParams.roleName=null;
                this.getTableList();
            },
            handleAdd(){
                this.title='角色添加'
                this.$refs['roleDialog'].open('')
            },
            detail(row){

            },
            edit(row){
                this.title='编辑'
                this.$refs['roleDialog'].open(row.roleId)
            }
        },created() {
            this.getTableList()
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
