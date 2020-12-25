<template>
  <div>
    <el-button type="primary" @click="add" > 添加</el-button>

    <v-add v-show='info.isShow' :info="info" ref='add'></v-add>

    <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from '../page/menu/add'
import vList from '../page/menu/list'
export default {
    data(){
        return {
           info:{
               isShow:false,
               isAdd:false
           }
        }
    },
  components: {
      vAdd,
      vList
  },
  methods: {
      add(){
          this.info.isShow=true
          this.info.isAdd=false
      },
      edit(id){
        this.info.isShow=true
        this.info.title='编辑菜单'
        this.info.isAdd=true
        this.$refs.add.getDetail(id)
      }
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>