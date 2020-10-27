<template>
  <div class="user-center-wrapper">
    <div class="table-tool-container">
      <div class="left">
        <el-button type="primary" @click="onAdd" icon="el-icon-plus"
          >新建</el-button
        >
        <el-button type="primary" @click="onDelete" icon="el-icon-close"
          >删除</el-button
        >
      </div>
      <div class="right">
        <el-input
          v-model.trim="searchList.query"
          @keyup.enter.native="onSearch"
          @clear="onSearch"
          placeholder="请输入用户名、单位或联系电话"
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
    <TeaDialog
      :dialogConfig="dialogConfig"
      @cancelDialog="onCancelDialog"
      @sureDialog="onSureDialog"
    >
      <template v-slot:dialogContent>
        <div style="max-height: 360px; overflow-y: auto;">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="种类" prop="category">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option label="1" value="绿茶"></el-option>
                <el-option label="2" value="红茶"></el-option>
                <el-option label="3" value="黑茶"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌名称" prop="brandName">
              <el-input
                v-model="form.brandName"
                placeholder="请输入品牌名称"
                clearable
                style="width: 100%;"
              ></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入标题"
                clearable
                style="width: 100%;"
              ></el-input>
            </el-form-item>

            <el-form-item label="价格" prop="price">
              <el-input-number
                v-model="form.price"
                :min="1"
                :max="10"
                label="请输入价格"
              />
            </el-form-item>
            <el-form-item label="折扣价" prop="discountPrice">
              <el-input-number
                v-model="form.discountPrice"
                :min="1"
                :max="10"
                label="请输入折扣价"
              />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                max="3"
                v-model="form.remark"
                placeholder="请输入备注信息"
                clearable
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </TeaDialog>
  </div>
</template>
<script>
import {
  getUserList,
  postAddUser,
  postDeleteUser,
  getUserDetail,
  putEditeUser,
  getUserPermissions,
} from '@src/api/request/userCenter';

import tableMixin from '@src/mixins/tableMixin';
import _ from 'lodash';

export default {
  mixins: [tableMixin],
  data() {
    return {
      searchList: {
        query: '',
      },
      tableHeaderConfig: {
        maxHeight: 'auto',
        type: ['selection'],
        headerConfig: [
          {
            label: '种类',
            prop: 'category',
          },
          {
            label: '品牌名称',
            prop: 'brandName',
            sortable: true,
          },
          {
            label: '标题',
            prop: 'title',
            sortable: true,
          },
          {
            label: '价格',
            prop: 'price',
          },
          {
            label: '折扣价',
            prop: 'discountPrice',
          },
          {
            label: '创建时间',
            prop: 'createTime',
          },
          {
            label: '操作',
            prop: 'operation',
            width: '120',
            fixed: 'right',
            operation: [
              {
                name: '编辑',
                iconClass: 'el-icon-edit-outline',
                clickFun: this.onEdite,
              },
              {
                name: '删除',
                iconClass: 'el-icon-delete',
                clickFun: this.onDelete,
              },
            ],
          },
        ],
      },
      formOrigin: {
        brandName: '',
        title: '',
        category: '',
        price: '',
        discountPrice: '',
        remark: '',
      },
      form: {},
      rules: {
        title: [{ required: true, message: '请填写标题名', trigger: 'blur' }],
        brandName: [
          { required: true, message: '请填写品牌名称', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    this.form = _.cloneDeep(this.formOrigin);
  },
  methods: {
    async getTableData() {
      this.loading = true;
      const params = {};
      if (this.searchList.query) {
        params.query = this.searchList.query;
      }
      params.page = this.paginationConfig.page.value;
      params.size = this.paginationConfig.size.value;
      // 接口暂时屏蔽
      // eslint-disable-next-line no-constant-condition
      if (false) {
        const res = await getUserList(params);
        this.processResponseData(res);
      }
      // 临时数据
      this.tableData = [
        {
          createTime: '2020-08-22 14:33:56',
          brandName: '品牌名称',
          title: '新采摘',
          category: '绿茶',
          price: '100',
          discountPrice: '80',
        },
        {
          createTime: '2020-08-22 14:33:56',
          brandName: '品牌名称',
          title: '新采摘',
          category: '绿茶',
          price: '100',
          discountPrice: '80',
        },
      ];
      const Timer = setTimeout(() => {
        clearTimeout(Timer);
        this.loading = false;
      }, 1000);
    },
    async getTableDetail(params) {
      const res = await getUserDetail(params);
      const { code, data } = res;
      if (code === 0) {
        Object.keys(this.form).forEach((key) => {
          if (key === 'permissions') {
            const permissions = [];
            data[key].forEach((item) => {
              permissions.push(item);
            });
            this.form[key] = permissions;
          } else {
            this.form[key] = data[key];
          }
        });
        this.form = Object.assign(this.form, data.article, { pk: data.pk });
      }
    },
    async getUserPermissions() {
      const res = await getUserPermissions();
      const { code, data } = res;
      if (code === 0) {
        this.userPermissions = data;
      }
    },
    async addTableItem() {
      const res = await postAddUser(this.form);
      this.tip(res);
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
    async editeTableItem() {
      const res = await putEditeUser(this.form);
      this.tip(res);
    },
  },
};
</script>
