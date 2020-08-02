<template>
  <div>
    <el-pagination
      class="siem-pagination"
      popper-class="siem-pagination-popper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'siemPagination',
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
    };
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 300,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  created() {
    const paginationType = this.type;
    if (paginationType === 'base') {
      this.layout = 'prev, pager, next';
    } else if (paginationType === 'total') {
      this.layout = 'total, prev, pager, next';
    } else if (paginationType === 'sizes') {
      this.layout = 'sizes, prev, pager, next';
    } else if (paginationType === 'full') {
      this.layout = 'total, sizes, prev, pager, next, jumper';
    } else {
      this.layout = 'prev, pager, next, jumper';
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.$emit('current-change', val);
    },
  },
};
</script>
<style lang="scss" scope>
.siem-pagination.el-pagination {
  margin: 30px 0;
  padding: 0;
  text-align: right;
  button:hover {
    background-color: #69c3f9;
    color: #ffffff;
    border: 1px solid #69c3f9;
  }
  button:active {
    background-color: #dbeafa;
    color: #6f7e8f;
  }
  button:disabled {
    color: #e4e5eb;
    &:hover {
      background-color: #fff;
      border: 1px solid #e4e5eb;
    }
  }
  .el-pagination__total {
    margin-right: 16px;
    font-family: PingFangSC-Regular;
    color: #333b44;
  }
  .el-pagination__sizes {
    margin-right: 16px;
    .el-select {
      .el-input {
        margin: 0;
        width: 90px;
        .el-input__inner {
          font-family: PingFangSC-Regular;
          color: #333b44;
          border: 1px solid #e0e7ed;
          &:hover {
            border-color: #4c8bee;
          }
          &:focus {
            border-color: #4c8bee;
          }
        }
      }
    }
  }
  .btn-prev,
  .btn-next {
    border: 1px solid #e0e7ed;
    padding: 0 1px;
    min-width: 30px;
    color: #6f7e8f;
  }
  .btn-next {
    margin-right: 8px;
    border-left: none;
  }
  .el-pager {
    li {
      min-width: 30px;
    }
    .number {
      height: 28px;
      border: 1px solid #e0e7ed;
      border-left: none;
      padding: 0 1px;
      min-width: 30px;
      font-family: PingFangSC-Regular;
      color: #333b44;
      &:hover {
        background-color: #69c3f9;
        color: #fff;
      }
      &:active {
        background-color: #dbeafa;
      }
    }
    li.btn-quicknext,
    li.btn-quickprev {
      border: 1px solid #e0e7ed;
      border-left: none;
      padding: 0 1px;
      min-width: 30px;
      &:hover {
        background-color: #69c3f9;
        color: #fff;
      }
      &:active {
        background-color: #69c3f9;
      }
    }
    li.active {
      color: #ffffff;
      background: #69c3f9;
    }
  }
  .el-pagination__jump {
    margin-left: 10px;
    color: #333b44;
    .el-input__inner {
      width: 30px;
      box-sizing: border-box;
      border: 1px solid #e0e7ed;
      &:hover {
        border-color: #4c8bee;
      }
      &:focus {
        border-color: #4c8bee;
      }
    }
  }
}
.siem-pagination-popper.el-select-dropdown {
  .el-scrollbar {
    .el-select-dropdown__wrap {
      .el-select-dropdown__list {
        .el-select-dropdown__item {
          color: #333b44;
          &.hover {
            background-color: #fff;
          }
          &:hover {
            background-color: #69c3f9;
          }
          &.selected {
            font-family: PingFangSC-Regular;
            color: #333b44;
            background-color: #69c3f9;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
