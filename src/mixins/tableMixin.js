import _ from 'lodash';

const tableMixin = {
  data() {
    return {
      isRequestOtherData: true, // 是否发送表格之外其他请求，聚合数据、favicon
      oldSize: 10,
      isShowPermissionTip: false,
      loading: false,
      selectionList: [],
      tableData: [],
      orderBy: {
        prop: '',
        order: '',
      },
      paginationConfig: {
        page: {
          type: 'number',
          defaultValue: 1,
          value: 1,
        },
        size: {
          type: 'number',
          defaultValue: 10,
          value: 10,
        },
        count: {
          type: 'hide',
          defaultValue: 0,
          value: 0,
        },
        total: {
          type: 'hide',
          defaultValue: 0,
          value: 0,
        },
        sizeChange: {
          type: 'hide',
          value: this.handleSizeChange,
        },
        currentChange: {
          type: 'hide',
          value: this.handleCurrentChange,
        },
      },
      dialogConfig: {
        title: '新建',
        width: '50%',
        dialogVisible: false,
      },
    };
  },
  watch: {
    '$route.query': {
      handler(q) {
        Object.keys(q).forEach((key) => {
          if (key in this.searchList) {
            if (q[key] === 'false' || q[key] === 'true') {
              this.searchList[key] = JSON.parse(q[key]);
            } else {
              this.searchList[key] = q[key];
            }
          } else if (key in this.paginationConfig && this.paginationConfig[key].type === 'number') {
            this.paginationConfig[key].value = Number(q[key]);
          }
        });
        this.getTableData();
      },
      immediate: true,
    },
  },
  computed: {
    filterParams() {
      const filterParams = {};
      Object.keys(this.searchList).forEach((item) => {
        if (this.searchList[item] === 'false' || this.searchList[item] === 'true') {
          filterParams[item] = JSON.parse(this.searchList[item]);
        } else if (this.searchList[item]) {
          filterParams[item] = this.searchList[item];
        }
      });
      if (!this.isWaterfallFlow) {
        Object.keys(this.paginationConfig).forEach((item) => {
          const { type, defaultValue, value } = this.paginationConfig[item];
          if (type !== 'hide' && defaultValue !== value) {
            filterParams[item] = this.paginationConfig[item].value;
          }
        });
      }
      return filterParams;
    },
  },
  methods: {
    checkQueryEqual() {
      const inputQuery = {};
      const routeInputQuery = {};
      Object.keys(this.searchList).forEach((key) => {
        inputQuery[key] = this.searchList[key];
      });
      Object.keys(this.$route.query).forEach((key) => {
        if (key in this.searchList) {
          if (this.$route.query[key] === 'false' || this.$route.query[key] === 'true') {
            routeInputQuery[key] = JSON.parse(this.$route.query[key]);
          } else {
            routeInputQuery[key] = this.$route.query[key];
          }
        }
      });
      const isEqual = _.isEqual(inputQuery, routeInputQuery);
      if (isEqual) {
        this.$router.push({ name: this.$route.name, query: this.filterParams });
      } else {
        const mergeFilterParams = _.merge(this.filterParams, routeInputQuery);
        Object.keys(mergeFilterParams).forEach((key) => {
          if (!(key in routeInputQuery || key in this.paginationConfig) && !this.isWaterfallFlow) {
            delete mergeFilterParams[key];
            // this.searchList[key] = typeof this.searchList[key] === 'string' ? '' : this.searchList[key];
          }
        });
        this.$router.push({ name: this.$route.name, query: mergeFilterParams });
      }
    },
    processResponseData(res) {
      const { code, data } = res;
      if (code === 0) {
        this.tableData = data;
        if (res.meta && res.meta.pagination) {
          const {
            total, page_index, page_size, count,
          } = res.meta.pagination;
          this.paginationConfig.page.value = page_index;
          this.paginationConfig.size.value = page_size;
          this.paginationConfig.count.value = count;
          this.paginationConfig.total.value = total;
        }
      }
      this.loading = false;
    },
    handleSizeChange(val) {
      this.isRequestOtherData = false;
      this.oldSize = this.paginationConfig.size.value;
      this.paginationConfig.size.value = val;
      this.checkQueryEqual();
      // this.$router.push({ name: this.$route.name, query: this.filterParams });
    },
    handleCurrentChange(val) {
      this.isRequestOtherData = false;
      this.paginationConfig.page.value = val;
      this.checkQueryEqual();
      // this.$router.push({ name: this.$route.name, query: this.filterParams });
    },
    handleSortChange(sort) {
      this.isRequestOtherData = false;
      if (sort.column && sort.column.sortable === 'custom') {
        this.orderBy.prop = sort.prop;
        this.orderBy.order = sort.order;
        this.getTableData();
      }
    },
    formatOrder(order) {
      return order === 'descending' ? '-' : '';
    },
    onSearch() {
      if (!this.$store.state.site.role) {
        this.isShowPermissionTip = true;
      } else {
        this.isShowPermissionTip = false;
        this.paginationConfig.page.value = 1;
        this.filterParams.t = new Date().getTime();
        this.$router.push({ name: this.$route.name, query: this.filterParams });
      }
    },
    onLogin() {
      window.location.href = '/quake/login';
    },
    onClosePermissionTip() {
      this.isShowPermissionTip = false;
    },
    judgePageThenRequest() {
      const { length } = this.selectionList;
      const { count } = this.paginationConfig;
      if (length) {
        if (length < count) {
          this.getTableData();
        } else {
          this.paginationConfig.page.value = this.paginationConfig.page.value - 1;
          this.getTableData();
        }
      } else if (count === 1) {
        this.paginationConfig.page.value = this.paginationConfig.page.value - 1;
        this.getTableData();
      } else {
        this.getTableData();
      }
    },
    onCancelDialog() {
      this.dialogConfig.dialogVisible = false;
      this.form = _.cloneDeep(this.formOrigin);
      if (this.$refs.form) {
        this.resetForm();
      }
    },
    async onSureDialog() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm();
        } else {
          return false;
        }
        return false;
      });
    },
    onConfirm(val) {
      this.$confirm('此操作将删除当前所选条目或内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        lockScroll: false,
        type: 'warning',
      })
        .then(() => {
          this.onDeleteList(val);
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleExpandChange(row) {
      if (row.id) {
        this.getRowDetail({ id: row.id });
      }
    },
    handleSelectionChange(selectionList) {
      this.selectionList = selectionList;
    },
    async onDelete(type, row) {
      if (type === 'single') {
        this.onConfirm({ id: row.id });
      } else if (this.selectionList.length) {
        this.onConfirm({ ids: this.selectionList });
      } else {
        this.$message({
          message: '您尚未选中任何一项',
          type: 'warning',
        });
      }
    },
    onAdd() {
      this.dialogConfig.title = '新建';
      this.dialogConfig.dialogVisible = true;
    },
    async onEdite(type, row) {
      this.dialogConfig.title = '编辑';
      await this.getTableDetail({ id: row.id });
      this.dialogConfig.dialogVisible = true;
    },
    onDetail(type, row) {
      this.onSkipDetail(row);
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    async submitForm() {
      const { title } = this.dialogConfig;
      if (title === '新建') {
        await this.addTableItem();
      }
      if (title === '编辑') {
        await this.editeTableItem();
      }
      await this.getTableData();
      this.onCancelDialog();
    },
    tip(res) {
      const { code, message } = res;
      if (code === 0) {
        this.$message({
          message,
          type: 'success',
        });
      } else {
        this.$message({
          message,
          type: 'warning',
        });
      }
    },
  },
};

export default tableMixin;
