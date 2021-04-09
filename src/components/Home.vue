<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
  name:'',
  data(){
   return {

   }
  },
  methods:{
    //   实现退出功能，只需要清空sessionStorage，然后回到登录页
      logout() {
          window.sessionStorage.clear();
          this.$router.push('/login')
      }
  }
}
</script>

<style scoped>

</style>
