<template>
  <div class="user-center-wrapper">
    <div class="table-tool-container">
      <div class="right">
        <el-input
          v-model.trim="searchList.query"
          @keyup.enter.native="onSearch"
          @clear="onSearch"
          placeholder="请输入订单号"
          clearable
          style="width: 230px;"
        >
        </el-input>
        <el-button
          type="primary"
          @click="onSearch"
          icon="el-icon-search"
          class="search"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="table-container">
      <TeaTable
        :loading="loading"
        :tableData="tableData"
        :tableHeaderConfig="tableHeaderConfig"
        :paginationConfig="paginationConfig"
        @handleSelectionChange="handleSelectionChange"
        @handleExpandChange="handleExpandChange"
      >
      </TeaTable>
    </div>
  </div>
</template>
<script>
import tableMixin from '@src/mixins/tableMixin';
import { postDeleteUser } from '@src/api/request/userCenter';

export default {
  mixins: [tableMixin],
  data() {
    return {
      searchList: {
        query: '',
      },
      tableHeaderConfig: {
        maxHeight: 'auto',
        type: [''],
        headerConfig: [
          {
            label: '订单号',
            prop: 'orderNo',
          },
          {
            label: '购买人',
            prop: 'buyerName',
          },
          {
            label: '商品描述',
            prop: 'orderDescr',
          },
          {
            label: '订单状态',
            prop: 'orderStatus',
          },
          {
            label: '支付方式',
            prop: 'payType',
          },
          {
            label: '支付金额',
            prop: 'payAmount',
          },
          {
            label: '物流单号',
            prop: 'logisticsNo',
          },
          {
            label: '物流公司',
            prop: 'logisticsCompany',
          },
          {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    async getTableData() {
      this.loading = true;
      const params = {};
      if (this.searchList.query) {
        params.query = this.searchList.query;
      }
      params.page = this.paginationConfig.page.value;
      params.size = this.paginationConfig.size.value;
      // 临时数据
      this.tableData = [
        {
          orderNo: '202008221009-test',
          buyerName: '周灿',
          orderDescr: '西湖龙井',
          orderStatus: '已成交',
          payType: '微信支付',
          payAmount: '2678',
          logisticsNo: 'SF58967698678',
          logisticsCompany: '顺丰速递',
          createTime: '2020-08-22 10:22:56',
        },
        {
          orderNo: '202007231009-test',
          buyerName: '徐兵',
          orderDescr: '毛尖',
          orderStatus: '已成交',
          payType: '微信支付',
          payAmount: '2678',
          logisticsNo: 'SF58967698678',
          logisticsCompany: '顺丰速递',
          createTime: '2020-08-22 10:22:56',
        },
      ];
      const Timer = setTimeout(() => {
        clearTimeout(Timer);
        this.loading = false;
      }, 1000);
    },
    async onDeleteList(params) {
      const res = await postDeleteUser(params);
      const { code, message } = res;
      if (code === 0) {
        this.$message({
          message: '操作成功！',
          type: 'success',
        });
        await this.judgePageThenRequest();
        this.selectionList = [];
      } else {
        this.$message({
          message,
          type: 'warning',
        });
      }
    },
  },
};
</script>
