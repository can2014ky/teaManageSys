<template>
  <div>
    <el-dialog
      custom-class="dialog"
      :title="defaultConfig.title"
      :visible.sync="dialogConfig.dialogVisible"
      :close-on-click-modal="defaultConfig.closeOnClickModal"
      :lock-scroll="defaultConfig.lockScroll"
      :width="defaultConfig.width"
      @closed="onCloseDialog">
      <div class="dialog-content">
        <slot name="dialogContent">内容区</slot>
      </div>
      <span v-if="defaultConfig.isShowFooter" slot="footer" class="dialog-footer">
        <el-button @click="onCancelDialog">取 消</el-button>
        <el-button type="primary" @click="onSureDialog('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultConfig: {
        title: '标题',
        width: '500px',
        closeOnClickModal: false,
        lockScroll: true,
        isShowFooter: true,
      },
    };
  },
  props: {
    dialogConfig: {
      type: Object,
      value: () => ({}),
    },
  },
  watch: {
    dialogConfig: {
      handler(val) {
        this.defaultConfig = Object.assign(this.defaultConfig, val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onCancelDialog() {
      this.$emit('cancelDialog');
    },
    onSureDialog() {
      this.$emit('sureDialog');
    },
    onCloseDialog() {
      // this.$nextTick(() => {
      //   this.$emit('cancelDialog');
      // });
      this.onCancelDialog();
    },
  },
};
</script>
