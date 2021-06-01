<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="home-header-box1">
                <img src="../assets/logo2.png" alt="">
                <span>电商管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏 -->  
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区 -->
                 <el-menu
                    :default-active="activePath"
                    :router = "true"
                    :collapse-transition = "false"
                    :collapse = "isCollapse"
                    :unique-opened = "true"
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409eff">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-user"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
                                      :key="subItem.id" @click="saveNavClick('/'+subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                   
                </el-menu>
            </el-aside>
            <!-- 右侧内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name:'',
  data(){
   return {
       menuList:[],
       isCollapse:false,
    //    被激活的地址
       activePath:''
   }
  },
  created() {
      this.getMenuList();
    //   this.activePath = window.sessionStorage.getItem(activePath)
  },
  methods:{
    //   实现退出功能，只需要清空sessionStorage，然后回到登录页
      logout() {
          window.sessionStorage.clear();
          this.$router.push('/login')
      },
      getMenuList() {
        // console.log(this)
        this.$http.get('menus').then(res=>{
            // console.log(res.data)
            if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg);
            this.menuList = res.data.data;
        })
     },
    //  点击切换菜单折叠和展开
     toggleCollapse() {
         this.isCollapse = !this.isCollapse;
     },

    //  保存链接的激活状态
    saveNavClick(activePath) {
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath = activePath;
    }
  },
 
 
}
</script>

<style scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #373D41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color:#fff;
        font-size: 20px;
    }

    .home-header-box1{
        display: flex;
        align-items: center;
    }
    .home-header-box1 img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right:15px;
    }

    .el-aside{
        background-color: #333744;
    }

    .el-aside .el-menu{
        border-right: none;
    }

    .el-main{
        background-color: #eaedf1;
    }

    .toggle-button{
        background-color: #4A5064;
        color: #fff;
        font-size: 10px;
        text-align: center;
        line-height: 24px;
        letter-spacing: .2em;
        cursor: pointer;
    }
</style>
