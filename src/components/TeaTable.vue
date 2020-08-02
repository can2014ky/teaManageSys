<template>
  <div class="tea-table-wrap">
    <el-table
      v-if="tableHeaderConfig.maxHeight && tableHeaderConfig.maxHeight.includes('px')"
      border
      ref="multipleTable"
      :max-height="tableHeaderConfig.maxHeight || ''"
      v-loading="loading"
      :data="tableData"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
      @sort-change="sortChange"
      :infinite-scroll-disabled="false"
      v-el-table-infinite-scroll="tableInfiniteLoad"
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="300"
      :infinite-scroll-distance="100"
      :header-cell-style="{background:'#eef1f7',color:'#707070'}"
      :cell-style="{ height: '20px', overflow: 'hidden'}">
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
        :show-overflow-tooltip="false">
        <template slot-scope="scope">
          <span v-if="item.operation && item.type !== 'specialOperate'">
            <el-button
              type="text"
              v-for="o in item.operation"
              :key="o.name"
              @click="o.clickFun('single', scope.row)">
              <i v-if="o.iconClass" :class="o.iconClass"></i>{{o.name}}
            </el-button>
          </span>
          <span v-else-if="item.type === 'tag'">
            <template v-if="scope.row[item.prop].length">
              <el-tag
                type="text"
                v-for="(tag, index) in scope.row[item.prop]"
                :key="index"
                style="margin: 0 2px 2px 0;">
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
            <slot name="status" :props="scope.row[item.prop]" :prop="item.prop" :row="scope.row">-</slot>
          </span>
          <span v-else-if="item.type === 'time'">
            <slot name="time" :props="scope.row[item.prop]">-</slot>
          </span>
          <span v-else-if="item.type === 'particular'">
            <slot name="particular" :props="scope.row[item.prop]" :row="scope.row">-</slot>
          </span>
          <span v-else-if="item.type === 'other'">
            <slot name="other" :props="scope.row[item.prop]" :prop="item.prop" :row="scope.row">-</slot>
          </span>
          <span v-else-if="item.type === 'specialOperate'">
            <slot name="specialOperate" :props="item.operation" :row="scope.row">-</slot>
          </span>
          <span v-else>
            {{scope.row[item.prop] ? scope.row[item.prop] : '-'}}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-else
      border
      ref="multipleTable"
      :max-height="tableHeaderConfig.maxHeight || ''"
      v-loading="loading"
      :data="tableData"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
      @sort-change="sortChange"
      :infinite-scroll-disabled="false"
      :header-cell-style="{background:'#eef1f7',color:'#707070'}"
      :cell-style="{ height: '20px', overflow: 'hidden'}">
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
        :show-overflow-tooltip="false">
        <template slot-scope="scope">
          <span v-if="item.operation && item.type !== 'specialOperate'">
            <el-button
              type="text"
              v-for="o in item.operation"
              :key="o.name"
              @click="o.clickFun('single', scope.row)">
              <i v-if="o.iconClass" :class="o.iconClass"></i>{{o.name}}
            </el-button>
          </span>
          <span v-else-if="item.type === 'tag'">
            <template v-if="scope.row[item.prop].length">
              <el-tag
                type="text"
                v-for="(tag, index) in scope.row[item.prop]"
                :key="index"
                style="margin: 0 2px 2px 0;">
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
            <slot name="status" :props="scope.row[item.prop]" :prop="item.prop" :row="scope.row">-</slot>
          </span>
          <span v-else-if="item.type === 'time'">
            <slot name="time" :props="scope.row[item.prop]">-</slot>
          </span>
          <span v-else-if="item.type === 'particular'">
            <slot name="particular" :props="scope.row[item.prop]" :row="scope.row">-</slot>
          </span>
          <span v-else-if="item.type === 'other'">
            <slot name="other" :props="scope.row[item.prop]" :prop="item.prop" :row="scope.row">-</slot>
          </span>
          <span v-else-if="item.type === 'specialOperate'">
            <slot name="specialOperate" :props="item.operation" :row="scope.row">-</slot>
          </span>
          <span v-else>
            {{scope.row[item.prop] ? scope.row[item.prop] : '-'}}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <TeaPagination
      v-if="!paginationConfig.isHidden"
      :type="paginationConfig.type && paginationConfig.type.value"
      :total="paginationConfig.total && paginationConfig.total.value"
      :currentPage="paginationConfig.page && paginationConfig.page.value"
      :pageSize="paginationConfig.size && paginationConfig.size.value"
      :pageSizes="paginationConfig.pageSizes && paginationConfig.pageSizes.value"
      @size-change="paginationConfig.sizeChange.value"
      @current-change="paginationConfig.currentChange.value">
    </TeaPagination>
  </div>
</template>

<script>
import elTableInfiniteScroll from 'el-table-infinite-scroll';

export default {
  name: 'multipleTable',
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll,
  },
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
  data() {
    return {
      getRowKeys(row) {
        return row.pk;
      },
      expands: [],
    };
  },
  methods: {
    sortChange(params) {
      this.$emit('sortChange', params);
    },
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
        this.expands.push(row.pk);
        this.$emit('handleExpandChange', row);
      }
    },
    tableInfiniteLoad() {
      this.$emit('tableInfiniteLoad');
    },
  },
};
</script>
<style lang="scss" scoped>
  .tea-table-wrap {
    .link {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 100%;
      display: inline-block;
    }
    ::v-deep .el-table__row .cell {
      max-height: 50px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
</style>
