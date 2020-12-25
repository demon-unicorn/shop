<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="200">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="200">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="200">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="200">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="200">
       <template slot-scope="scope">
        <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../utill/alert/alert";
import { requestDelList ,requestListData} from "../../utill/request";
export default {
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestListData: "menu/getListAction",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(222);
          requestDelList({ id: id }).then((res) => {
            console.log(111);
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestListData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
      // console.log(id);
    }
  },
  mounted() {
    this.requestListData();
  },
};
</script>

<style>
</style>