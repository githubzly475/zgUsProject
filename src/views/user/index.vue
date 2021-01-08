<template>
    <div>
<!--      <user-dialog :cutitle="title"></user-dialog>-->

      <div>
        <el-form :model="queryList">
          <el-form-item label="用户名称">
            <el-input v-model="queryList.username"></el-input>
          </el-form-item>
        </el-form>
        <el-button  size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
        <el-button  size="mini" type="primary"  @click="reset">重置</el-button>
      </div>
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">新增</el-button>
        <el-button
          class="filter-item"
          size="mini"
          type="danger"
          icon="el-icon-delete-solid"
          @click="delmore">删除</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column label="登录名称" prop="username" />
        <el-table-column label="性别" prop="gender">
          <template slot-scope="{ row }">{{ row.gender === 1 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button  size="mini" type="primary" icon="el-icon-tickets" @click="detail(scope.row)"/>
              <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
              <el-button  type="danger" size="mini"  icon="el-icon-delete" @click="subDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size=this.queryList.pageSize
        :current-page.sync=this.queryList.pageNum
        :page-sizes="[5,10,20]"
        :total="total">
      </el-pagination>
      <user-dialog :cutitle="title" ref="userAdd"  @submitOver="getUserListData"></user-dialog>



    </div>
</template>

<script>
    import {queryUserList,del} from '@/customeraxios/user'
    import UserDialog from '@/views/user/userdialog'
    export default {
        name: "Index",
        components:{UserDialog},
        data(){
            return{
                title:'',
                total:0,
                queryList:{pageSize:5, pageNum:1,username:''},
                userList:[]
            }

        },
        methods:{
            reset(){
                this.queryList.username=""
            },
            toQuery(){
              this.getUserListData()
            },
            getUserListData(){
                queryUserList(this.queryList).then(res=>{
                  this.userList=res.data.list
                    this.total=res.data.total
                }).catch(error =>{

                })
            },
            handleSizeChange(val) {
               // this.queryList.pageNum = 1;
                this.queryList.pageSize = val;
                this.getUserListData();
                //console.log(`每页 ${val} 条`);
            },

            handleCurrentChange(val) {
                this.queryList.pageNum = val;
                this.getUserListData();
                // console.log(`当前页: ${val}`);
            },
            add(){
                this.title="用户添加"
              this.$refs['userAdd'].open()
            },
            subDelete(row){

                this.$confirm('确定删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    del(row.userId).then(res => {
                            this.$notify({
                                title: '删除成功',
                                type: 'success',
                                duration: 2500
                            })
                            this.getUserListData()

                    }).catch(erro=>{
                        this.$msg.error("删除失败")
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            edit(row){
                console.log(row.userId)
                this.title="编辑"
                this.$refs['userAdd'].open(row.userId)

            },
            detail(row){

            },
            delmore(){

            }

        },
        created() {
            this.getUserListData()
        }
    }
</script>

<style scoped>

</style>
