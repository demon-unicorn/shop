<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add v-show="info.isShow" :info='info'></v-add>
    <v-list></v-list>
  </div>
</template>

<script>
import vAdd from "./goods/add";
import vList from "./goods/list";
export default {
  data() {
    return {
        info:{
            isShow:false
        }
    };
  },
  methods:{
      add(){
          this.info.isShow=true
      }
  },
  components: {
    vAdd,
    vList,
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>