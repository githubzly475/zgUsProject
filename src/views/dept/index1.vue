<template>
    <div>
      <el-tree :data="sysDept"
               ref="tree"
               node-key="id"
               :props="defaultProps"
      ></el-tree>
    </div>
</template>

<script>
    import {getAllDept} from '@/customeraxios/dept'
    export default {
        name: "index1",
        data(){
            return{
                sysDept:[],
                defaultProps:{
                    label: 'name',
                    children: 'children'
                }
            }
        },
        methods:{

        },
        created() {
            getAllDept().then(res=>{
                this.sysDept=res.data;
            }).catch(err=>{

            })
        }
    }
</script>

<style scoped>

</style>
