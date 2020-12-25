<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" width="200">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="200">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="200">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="200">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :total="count"
      @current-change="p"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warnAlert } from "../../utill/alert/alert";
import { requestDelManager } from "../../utill/request";
export default {
  computed: {
    ...mapGetters({
      list: "manager/list",
      count: "manager/count",
      size: "manager/size",
    }),
  },
  methods: {
    ...mapActions({
      requestManagerList: "manager/getManagerActions",
      requestManagerCount: "manager/countActions",
      requestPage: "manager/pageActions",
    }),
    p(page) {
      this.requestPage(page);
      this.requestManagerList();
    },

    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          requestDelManager({ uid: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestManagerList();
               this.requestManagerCount();
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
  },
  mounted() {
    this.requestManagerCount();
    this.requestManagerList();
  },
};
</script>

<style>
</style>