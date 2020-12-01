<template>
  <el-button type="primary" @click="log">登录</el-button>

</template>

<script>
    import Home from '@/views/Home.vue'
    export default {
        name: "Log",
        components:{
            Home
        },
        methods:{
            log(){
                this.$router.push('/home')
            }
        }

    }
</script>

<style scoped>

</style>
