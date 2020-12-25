<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" v-show="info.isShow" ref="add"></v-add>
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "../page/manager/add.vue";
import vList from "../page/manager/list.vue";
export default {
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  components: {
    vAdd,
    vList,
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.info.title = "添加用户";
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = true;
      this.info.title = "修改用户";
      this.$refs.add.getDetail(id);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>