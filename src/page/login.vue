<template>
  <div class="wrap">
    <div class="box">
      <h2>登录</h2>
      <el-input
        type="text"
        v-model="user.username"
        placeholder="请输入用户名"
      ></el-input>
      <el-input
        type="password"
        v-model="user.password"
        placeholder="请输入密码"
      ></el-input>

      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestLogin } from "../utill/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warnAlert } from "../utill/alert/alert";
export default {
  
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      'requestUser':'userActions'
    }),
    login() {
      // requestLogin(this.user).then((res) => {
      //   console.log(this.user);
      //   if (res.data.code==200 ) {
      //     successAlert(res.data.msg);
      //     if (localStorage.getItem("user") !== null) {
      //       localStorage.removeItem("user");
      //     }
      //     localStorage.setItem('user',JSON.stringify(res.data.list))
      //     this.$router.push("/");
      //   }else{
      //     warnAlert(res.data.msg)
      //   }
      // });

      requestLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestUser(res.data.list)
          this.$router.push("/");
          
        } else {
          warnAlert(res.data.msg);
         
        }
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#553443, #2f3d60);
  position: fixed;
  left: 0;
  top: 0;
}
.box {
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-button {
  width: 90%;
  margin-top: 20px;
}
.el-input {
  width: 90%;
}
</style>