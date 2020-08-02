import _ from 'lodash';

const tableMixin = {
  data() {
    return {
      loading: false,
      selectionList: [],
      tableData: [],
      paginationConfig: {
        type: {
          type: 'hide',
          value: 'full',
        },
        page: {
          type: 'number',
          defaultValue: 1,
          value: 1,
        },
        size: {
          type: 'number',
          defaultValue: 20,
          value: 20,
        },
        pageSizes: {
          type: 'hide',
          defaultValue: [10, 20, 30, 40, 50, 100],
          value: [10, 20, 30, 40, 50, 100],
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
          const keys = Object.keys(this.searchList);
          if (keys.length && key in this.searchList) {
            if (this.searchList[key] instanceof Array && typeof q[key] === 'string') {
              this.searchList[key].push(q[key]);
            } else if (q[key] === 'false' || q[key] === 'true') {
              this.searchList[key] = q[key] !== 'false';
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
        if (typeof this.searchList[item] === 'boolean') {
          filterParams[item] = this.searchList[item];
        } else if (typeof this.searchList[item] === 'number') {
          filterParams[item] = this.searchList[item];
        } else if (this.searchList[item]) {
          filterParams[item] = this.searchList[item];
        }
      });
      Object.keys(this.paginationConfig).forEach((item) => {
        const { type, defaultValue, value } = this.paginationConfig[item];
        if (type !== 'hide' && defaultValue !== value) {
          filterParams[item] = this.paginationConfig[item].value;
        }
      });
      return filterParams;
    },
  },
  methods: {
    checkQueryEqual() {
      const inputQuery = {};
      const routeInputQuery = {};
      Object.keys(this.searchList).forEach((key) => {
        if (this.searchList[key]) {
          inputQuery[key] = this.searchList[key];
        }
      });
      Object.keys(this.$route.query).forEach((key) => {
        if (key in this.searchList) {
          routeInputQuery[key] = this.$route.query[key];
        }
      });
      const isEqual = _.isEqual(inputQuery, routeInputQuery);
      if (isEqual) {
        this.$router.push({ name: this.$route.name, query: this.filterParams });
      } else {
        const mergeFilterParams = _.merge(this.filterParams, routeInputQuery);
        Object.keys(mergeFilterParams).forEach((key) => {
          if (!(key in routeInputQuery || key in this.paginationConfig)) {
            if (this.isHasDefaultParams) {
              if (this.$route.name === 'teaManager') {
                if (
                  !(
                    key === 'updateTime'
                    && this.searchList.updateTime
                    && this.searchList.updateTime.length
                  )
                ) {
                  delete mergeFilterParams[key];
                  this.searchList[key] = '';
                }
              }
            } else {
              delete mergeFilterParams[key];
              this.searchList[key] = '';
            }
          }
        });
        this.$router.push({ name: this.$route.name, query: mergeFilterParams });
      }
    },
    processResponseData(res) {
      const { code, list } = res;
      if (code === 0) {
        this.tableData = list;
        if (res.meta) {
          const {
            total, page, size, count,
          } = res.meta;
          this.paginationConfig.page.value = page;
          this.paginationConfig.size.value = size;
          this.paginationConfig.count.value = count;
          this.paginationConfig.total.value = total;
        }
      }
      this.loading = false;
    },
    handleSizeChange(val) {
      this.paginationConfig.size.value = val;
      this.$router.push({ name: this.$route.name, query: this.filterParams });
    },
    handleCurrentChange(val) {
      this.paginationConfig.page.value = val;
      this.checkQueryEqual();

      // this.$router.push({ name: this.$route.name, query: this.filterParams });
    },
    onSearch() {
      this.paginationConfig.page.value = 1;
      this.$router.push({ name: this.$route.name, query: this.filterParams });
    },
    judgePageThenRequest() {
      const { length } = this.selectionList;
      const { count } = this.paginationConfig;
      if (length) {
        if (length < count.value) {
          this.getTableData();
        } else {
          this.paginationConfig.page.value = this.paginationConfig.page.value - 1;
          this.getTableData();
        }
      } else if (count.value === 1) {
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
      this.$confirm('是否继续此执行该操作?', '提示', {
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
          //   message: '操作成功!',
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
        });
    },
    handleExpandChange(row) {
      this.getRowDetail({ pk: row.pk });
    },
    handleSelectionChange(selectionList) {
      this.selectionList = selectionList;
    },
    async onDelete(type, row) {
      if (type === 'single') {
        this.onConfirm({ pk: row.pk });
      } else if (this.selectionList.length) {
        this.onConfirm({ pks: this.selectionList });
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
      await this.getTableDetail({ pk: row.pk });
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
