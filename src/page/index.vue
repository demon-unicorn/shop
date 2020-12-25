<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="black"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <template v-for="item in user.menus">
          <!-- 遍历放在template里面
           -->
          <el-submenu :index="String(item.id)" :key="item.id" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            
              <template v-for='i in item.children'>
                <el-menu-item :index="'/'+i.url" :key='i.id'>{{i.title}}</el-menu-item>
              </template>
           
          </el-submenu>
          <el-menu-item :index="'/'+item.url" :key='item.id' v-if='!item.children'>{{item.title}}</el-menu-item>
        </template>


        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">商城管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/category">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header height="100px">
        <span>{{user.username}}</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods:{
    ...mapActions({
      'requestUser':'userActions'
    }),
    exit(){
      this.requestUser(null)
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  background: black;
}
.el-header {
  width: 100%;
  background: pink;
  text-align: right;
  line-height: 100px;
}
</style>