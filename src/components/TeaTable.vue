<template>
  <div class="ioc-table-wrap">
    <slot>
      <el-table
        v-if="!tableHeaderConfig.showOther"
        :border="tableConfig.border"
        :stripe="tableConfig.stripe"
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @selection-change="handleSelectionChange"
        @expand-change="handleExpandChange"
        @row-click="handleRowClick"
        @sort-change="handleSortChange"
        class="table">
        <el-table-column
          v-if="tableHeaderConfig.type.includes('selection')"
          type="selection"
          width="40"
          align="center">
        </el-table-column>
        <el-table-column
          v-if="tableHeaderConfig.type.includes('index')"
          type="index"
          width="40"
          align="center">
        </el-table-column>
        <el-table-column
          v-if="tableHeaderConfig.type.includes('expand')"
          type="expand"
          width="40"
          align="center">
          <template slot-scope="scope">
            <slot name="expand" :props="scope.row">-</slot>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in tableHeaderConfig.headerConfig"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.type !== 'status'">
          <template slot-scope="scope">
            <span v-if="item.operation">
              <template v-for="(o, k) in item.operation">
                <el-tooltip
                  :key="k"
                  :content="o.name"
                  :disabled="o.name ? false : true"
                  effect="dark"
                  placement="top">
                  <el-button
                    type="text"
                    @click.stop="o.clickFun('single', scope.row)">
                      <svg-icon v-if="o.iconClass" :icon-class="o.iconClass" class="svg"></svg-icon>
                  </el-button>
                </el-tooltip>
              </template>
            </span>
            <span v-else-if="item.type === 'tag'">
              <template v-if="scope.row[item.prop].length">
                <el-tag
                  type="text"
                  v-for="tag in scope.row[item.prop]"
                  :key="tag">
                  {{ tag }}
                </el-tag>
              </template>
              <span v-else>-</span>
            </span>
            <span v-else-if="item.type === 'link'">
              <el-link
                :underline="false"
                type="primary"
                v-if="scope.row[item.prop]"
                :href="scope.row[item.prop]"
                target="_blank"
                class="link">
                {{scope.row[item.prop]}}
              </el-link>
              <span v-else>-</span>
            </span>
            <span v-else-if="item.type === 'status'">
              <slot name="status"
                :props="_.get(scope.row,item.prop)"
                :prop="item.prop"
                :row="scope.row">-</slot>
            </span>
            <span v-else-if="item.type === 'special'">
              <slot name="special"
                :props="_.get(scope.row,item.prop)"
                :prop="item.prop"
                :row="scope.row">-</slot>
            </span>
            <span v-else-if="item.type === 'detail'">
              <slot name="detail" :props="scope.row">-</slot>
            </span>
            <span v-else>
              <span v-if="item.customFormater" v-html="item.customFormater(scope, item)"></span>
              <span v-else>
                {{(_.get(scope.row, item.prop) || typeof _.get(scope.row, item.prop) === 'number') ? _.get(scope.row, item.prop) : '-'}}
              </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </slot>
    <TeaPagination
      type="full"
      :total="paginationConfig.total && paginationConfig.total.value"
      :currentPage="paginationConfig.page && paginationConfig.page.value"
      :pageSize="paginationConfig.size && paginationConfig.size.value"
      @size-change="paginationConfig.sizeChange.value"
      @current-change="paginationConfig.currentChange.value">
    </TeaPagination>
  </div>
</template>

<script>
export default {
  name: 'multipleTable',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableConfig: {
      type: Object,
      default() {
        return {
          border: true,
          stripe: false,
        };
      },
    },
    tableHeaderConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    paginationConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    paginationConfig: {
      handler(val) {
        if (val) {
          this.expands = [];
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      getRowKeys(row) {
        return row.pk;
      },
      expands: [],
    };
  },
  methods: {
    handleSelectionChange(selection) {
      const list = [];
      selection.forEach((item) => {
        list.push(item.pk);
      });
      this.$emit('handleSelectionChange', list);
    },
    handleExpandChange(row) {
      if (this.expands.includes(row.pk)) {
        this.expands = [];
      } else {
        this.expands = [];
        if (this.tableHeaderConfig.type.includes('expand')) {
          this.expands.push(row.pk);
        }
        this.$emit('handleExpandChange', row);
      }
    },
    handleSortChange(sort) {
      this.$emit('handleSortChange', sort);
    },
    handleRowClick(row) {
      this.handleExpandChange(row);
    },
  },
};
</script>
<style lang="scss" scoped>
  .svg {
    font-size: 16px;
    color: #707070;
    &:hover {
      color: #007AFF;
    }
  }
  .ioc-table-wrap {
    .table {
      border-radius: 5px;
    }
    .link {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 100%;
      display: inline-block;
    }
    ::v-deep .el-tabs__header {
      margin: 0 0 10px;
    }
    ::v-deep .el-tabs__content {
      overflow: inherit;
    }
    ::v-deep .el-table th {
      background-color: #F8FAFB !important;
      height: 50px;
      border-top: 1px solid #ebeef5;
    }
    ::v-deep .el-tabs__active-bar {
      height: 3px;
      background-color: #2696f1;
    }
    ::v-deep .el-tabs__nav-wrap::after {
      height: 1px;
      bottom: 1px;
    }
    ::v-deep .el-tabs__nav-wrap {
      padding-left: 28px;
    }
    ::v-deep .el-tabs__item.is-active {
      color: #196dc4;
    }
    ::v-deep .el-table--small {
      font-size: 16px;
    }
    ::v-deep .el-table .cell {
      color: #333333;
    }
    ::v-deep .el-table__row {
      height: 50px;
      &.expanded {
        font-weight: bold;
        background-color: #F3F8FE;
      }
    }
    ::v-deep .el-table__expanded-cell {
      background-color: #F8FAFB;
      &:hover {
        background-color: #F8FAFB !important;
      }
    }
  }
</style>
