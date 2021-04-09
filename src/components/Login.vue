<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo2.png" alt="">
            </div>
            <!-- 登陆表单区 -->
            <!-- 表单的数据绑定，使用loginForm -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-goods"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name:'',
  data(){
   return {
      loginForm:{
          username:'admin',
          password:'123456'
      },
    //   表单的验证
      rules:{
          username:[
              { required: true, message: '请输入登陆名称', trigger: 'blur' }
          ],
          password:[
              { required: true, message: '请输入登陆密码', trigger: 'blur' },
              { min: 6, max: 15, message: '6-15位之间', trigger:'blur'}
          ]
      }
   }
  },
  methods:{
    //   点击重置按钮，重置登陆表达那
      resetLoginForm() {
        //   console.log(this);
        // 获得ref引用，使用element ui的表单重置方法
        this.$refs.loginFormRef.resetFields();
      },

      login() {
          this.$refs.loginFormRef.validate(valid=>{
              if(!valid) return;
              const result = this.$http.post('login',this.loginForm);
              result.then(res=>{
                  
                //   对data数据进行解构赋值
                  const {data} = res;
                  console.log(data)
                  if(data.meta.status !==200) return this.$message.error('登录失败');
                  this.$message.success('登录成功');
                  window.sessionStorage.setItem('token',data.data.token);
                  this.$router.push('/home')

              })
          })
      }
  }
}
</script>

<style scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left:50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }

    .avatar_box img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }

    .btns{
        display: flex;
        justify-content: flex-end;
    }

    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
