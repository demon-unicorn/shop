<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" width="200">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="200">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="200">
        <template slot-scope="scope">
          <el-tag v-for="i in scope.row.attrs" :key="i" type="danger">{{
            i
          }}</el-tag>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :total="count"
      @current-change="cPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  requestSpecsList,
  requestSpecsDel,
  requestSpecsCount,
} from "../../utill/request";
import { successAlert, warnAlert } from "../../utill/alert/alert";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      count: "specs/count",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      requestSpecsList: "specs/specsListActions",
      requestSpecsCount: "specs/countActions",
      requestSpecsPage: "specs/pageActions",
    }),
    cPage(page) {
      this.requestSpecsPage(page);
      this.requestSpecsList()
    },
    edit(id){
        this.$emit('ed',id)
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          requestSpecsDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestSpecsList();
            this.requestSpecsCount();

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
    this.requestSpecsList();
    this.requestSpecsCount();
    // this.requestSpecsPage()
  },
};
</script>

<style>
</style>