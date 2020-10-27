<template>
  <div class="user-center-wrapper">
    <div class="table-tool-container">
      <div class="left">
        <el-button type="primary" @click="onAdd" icon="el-icon-plus">新建</el-button>
        <el-button type="primary" @click="onDelete" icon="el-icon-close">删除</el-button>
      </div>
      <div class="right">
        <el-input
          v-model.trim="searchList.query"
          @keyup.enter.native="onSearch"
          @clear="onSearch"
          placeholder="请输入用户名、单位或联系电话"
          clearable
          style="width:230px">
        </el-input>
        <el-button type="primary" @click="onSearch" icon="el-icon-search" class="search">搜索</el-button>
      </div>
    </div>
    <div class="table-container">
      <TeaTable
        :loading="loading"
        :tableData="tableData"
        :tableHeaderConfig="tableHeaderConfig"
        :paginationConfig="paginationConfig"
        @handleSelectionChange="handleSelectionChange"
        @handleExpandChange="handleExpandChange">
      </TeaTable>
    </div>
    <TeaDialog
      :dialogConfig="dialogConfig"
      @cancelDialog="onCancelDialog"
      @sureDialog="onSureDialog">
      <template v-slot:dialogContent>
        <div style="max-height: 360px; overflow-y: auto;">
          <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="form.name" placeholder="请输入用户名" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="dialogConfig.title === '新建'">
              <el-input v-model="form.password" placeholder="请输入8位以上密码(必须包括数字、大小写字母)" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
              <el-input v-model="form.unit" placeholder="请输入单位名称" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="display">
              <el-input v-model="form.display" placeholder="请输入真实姓名" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱地址" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话(固话需加区号和符号‘-’连接)" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="form.permissions" @change="handleCheckedPermissionsChange">
                <el-checkbox v-for="item in userPermissions" :key="item.name" :label="item.name">{{item.desc}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" max="3" v-model="form.remark" placeholder="请输入备注信息" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </TeaDialog>
  </div>
</template>
<script>
import {
  getTest, getUserList, postAddUser, postDeleteUser, getUserDetail, putEditeUser, getUserPermissions,
} from '@src/api/request/userCenter';

// import tableMixin from '@src/mixins/tableMixin';
import _ from 'lodash';

export default {
  // mixins: [tableMixin],
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!reg.test(value)) {
          callback(new Error('密码不符合规则'));
        } else {
          callback();
        }
      }
    };
    const validatePhone = (rule, value, callback) => {
      const reg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
      if (!value) {
        callback();
        return false;
      }
      if (!reg.test(value)) {
        callback(new Error('电话位数或格式有误'));
      } else {
        callback();
      }
      return true;
    };
    return {
      searchList: {
        query: '',
      },
      tableHeaderConfig: {
        maxHeight: 'auto',
        type: ['selection'],
        headerConfig: [
          {
            label: '用户名',
            prop: 'name',
          },
          {
            label: '真实姓名',
            prop: 'display',
            sortable: true,
          },
          {
            label: '单位',
            prop: 'unit',
            sortable: true,
          },
          {
            label: '联系电话',
            prop: 'phone',
          },
          {
            label: '邮箱',
            prop: 'email',
          },
          {
            label: '操作',
            prop: 'operation',
            width: '120',
            fixed: 'right',
            operation: [
              { name: '编辑', iconClass: 'el-icon-edit-outline', clickFun: this.onEdite },
              { name: '删除', iconClass: 'el-icon-delete', clickFun: this.onDelete },
            ],
          },
        ],
      },
      formOrigin: {
        name: '',
        password: '',
        unit: '',
        display: '',
        email: '',
        phone: '',
        enable: false,
        remark: '',
        permissions: [],
      },
      form: {},
      rules: {
        name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        phone: [{ required: false, validator: validatePhone, trigger: 'blur' }],
      },
      userPermissions: [],
      checkAll: false,
      isIndeterminate: false,
    };
  },
  watch: {
    'form.permissions': {
      handler(val) {
        if (!val.length) {
          this.isIndeterminate = false;
          this.checkAll = false;
        } else if (val.length === this.userPermissions.length) {
          this.isIndeterminate = false;
          this.checkAll = true;
        } else {
          this.isIndeterminate = true;
          this.checkAll = false;
        }
      },
    },
  },
  mounted() {
    this.form = _.cloneDeep(this.formOrigin);
    // this.getUserPermissions();
    this.getTest();
  },
  methods: {
    async getTest() {
      const res = await getTest();
      console.log(789, res);
    },
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
          name: 'zhoucan', display: '周灿', unit: '清华', phone: '18610195535', email: 'can2014ky@163.com', enable: true,
        },
        {
          name: 'zhoucan', display: '周灿', unit: '北大', phone: '18610195535', email: 'can2014ky@163.com', enable: false,
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
    handleCheckAllChange(val) {
      this.form.permissions = [];
      if (val) {
        this.userPermissions.forEach((item) => {
          this.form.permissions.push(item.name);
        });
      }
    },
    handleCheckedPermissionsChange(value) {
      this.form.permissions = value;
    },
  },
};
</script>
