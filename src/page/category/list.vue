<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="200">
      </el-table-column>
      <el-table-column prop="catename" label="分类编号" width="200">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="200">
        <template slot-scope="scope">
          <img class="img" :src="PP + scope.row.img" alt="" />
        </template>
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { requestListGood, requestGoodDel } from "../../utill/request";
import { mapGetters, mapActions } from "vuex";
import { warnAlert, successAlert } from "../../utill/alert/alert";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      requestListGood: "cate/goodListActions",
    }),
    edit(id) {
      this.$emit("ed", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          requestGoodDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestListGood();
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
    this.requestListGood();
  },
};
</script>

<style scoped>
.img {
  width: 120px;
  height: 100px;
}
</style>