<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #333333;
  min-width: 1200px;
}
a {
  color: #1191e4;
  background: 0 0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color .2s ease;
  &:hover {
    color: #14a3ff
  }
  &:active {
    color: #14a3ff
  }
  &:active,
  &:hover {
    outline: 0;
    text-decoration: none
  }
  &[disabled] {
    color: #ccc;
    cursor: not-allowed;
    pointer-events: none
  }
  }
.mr-5 {
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
}
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.el-tag--small {
  margin-right: 5px;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #606266;
  border-radius: 3px;
}
.el-table__body-wrapper::-webkit-scrollbar-track {
  background: #ebeef5;
  border-radius: 3px;
}
.el-table th {
  background-color: #f6f6f6 !important;
}
::-webkit-scrollbar {
  // width: 0;
}
.scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    background: #606266;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #c3c9d6;
    border-radius: 3px;
  }
}
.appmain-wrapper {
  background-color: #fff;
  padding: 40px 60px 30px;
  min-height: calc(100vh - 185px);
}
.table-tool-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  .left {}
  .right {
    display: flex;
    height: 32px;
    .search {
      margin-left: 10px;
    }
    .filter-title {
      line-height: 32px;
      margin-right: 6px;
      margin-left: 12px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
::v-deep .el-table__fixed-right-patch {
  width: 0px !important;
  background-color: #f6f6f6 !important;
}
</style>
