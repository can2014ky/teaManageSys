<template>
  <div class="headernav-wrapper">
    <div class="left" :class="isSideMenuCollapse ? 'collapseClass' : ''">
      <img v-show="isSideMenuCollapse" :src="logoSmall" alt="">
      <img v-show="!isSideMenuCollapse" :src="logo" alt="">
    </div>
    <div class="right">
      <span>
        <i :class="[isSideMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="onCollapse" style="font-size: 20px; margin: 0 10px; cursor:pointer"></i>
      </span>
      <el-menu
        v-show="false"
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        router
        background-color="#0a202e"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item
          v-for="item in menu"
          :key="item.path"
          :index="item.path"
        >{{item.title}}
        </el-menu-item>
      </el-menu>
      <div>
        <el-dropdown trigger="click" @command="handleCommand" v-if="false">
          <span class="dropdown">
            主题
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="theme-main">官方</el-dropdown-item>
            <el-dropdown-item command="theme-default">默认</el-dropdown-item>
            <el-dropdown-item command="theme-red">红色</el-dropdown-item>
            <el-dropdown-item command="theme-green">绿色</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-select
          v-if="false"
          class="select-lang"
          placeholder="请选择语言"
          v-model="$i18n.locale"
          @change="onChangeLocalLanguage">
          <el-option
            v-for="item in langs"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-dropdown @command="handleCommandUser">
          <span class="dropdown">
            <i class="el-icon-user-solid el-icon--left"></i>{{userName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <IocDialog
      :dialogConfig="dialogConfig"
      @cancelDialog="onCancelDialog"
      @sureDialog="onSureDialog">
      <template v-slot:dialogContent>
        <div style="max-height: 360px; overflow-y: auto;">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            label-position="left">
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="form.password" placeholder="请输入8位以上密码(必须包括数字、大小写字母)" clearable style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" placeholder="请再次输入新密码" clearable style="width: 100%"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </IocDialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { getLogout, postChangePassword } from '@src/api/request/test';
import { removeToken } from '@src/utils/auth';
import Menus from './menu.json';

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!reg.test(value)) {
          callback(new Error('密码不符合规则'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      logo: require('@src/assets/images/logo.png'),
      logoSmall: require('@src/assets/images/logoSmall.png'),
      menu: Menus,
      langs: ['zh', 'en'],
      // userName: '',
      dialogConfig: {
        title: '修改密码',
        width: '600',
        dialogVisible: false,
      },
      form: {
        pk: '',
        password: '',
        checkPass: '',
      },
      rules: {
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePassword2, trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState('site', ['isSideMenuCollapse', 'themeClassName', 'localLanguage', 'userInfo']),
    activeIndex() {
      return `/${this.$route.fullPath.split('/')[1]}`;
    },
    pk() {
      return this.userInfo.pk || '';
    },
    userName() {
      return this.userInfo.name || '';
    },
  },
  watch: {
    themeClassName: {
      handler(val) {
        document.body.className = val;
      },
      immediate: true,
    },
  },
  created() {
    this.$i18n.locale = this.localLanguage;
    // const userInfo = storage.get('userInfo');
    // this.userName = userInfo.name;
    // this.pk = userInfo.pk;
  },
  methods: {
    ...mapActions('site', ['toggleSideMenuCollapse', 'toggleTheme', 'toggleLocalLanguage', 'setUserInfo']),
    handleSelect() {},
    onCollapse() {
      this.toggleSideMenuCollapse();
    },
    handleCommand(command) {
      this.toggleTheme(command);
    },
    onChangeLocalLanguage(val) {
      this.toggleLocalLanguage(val);
    },
    async handleCommandUser(command) {
      if (command === 'logout') {
        // localStorage.removeItem('userName');
        // removeToken();
        const res = await getLogout();
        if (res.code === 0) {
          this.$router.push({ name: 'login' });
          this.setUserInfo(null);
        }
      }
      if (command === 'changePassword') {
        this.dialogConfig.dialogVisible = true;
      }
    },
    onCancelDialog() {
      this.$refs.form.resetFields();
      this.dialogConfig.dialogVisible = false;
    },
    onSureDialog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const params = { pk: this.pk, password: this.form.password };
          const res = await postChangePassword(params);
          this.tip(res);
          this.$refs.form.resetFields();
          this.dialogConfig.dialogVisible = false;
          removeToken();
        } else {
          return false;
        }
        return false;
      });
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
</script>
<style lang="scss" scoped>
  .headernav-wrapper {
    height: 60px;
    color: white;
    display: flex;
    justify-content: space-between;
    .left {
      width: 215px;
      font-size: 0;
      box-sizing: border-box;
      padding: 6px 6px;
      transition: all .3s ease-in;
      background-color: #124598;
      img {
        height: 48px;
        position: relative;
      }
    }
    .collapseClass {
      width: 64px;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .right {
      z-index: 99;
      font-size: 14px;
      color: #fff;
      line-height: 60px;
      padding-right: 18px;
      flex: 1;
      display: flex;
      justify-content: space-between;
      background-color: #1956af;
      .dropdown {
        color: #fff;
        cursor: pointer;
      }
      .select-lang {
        width: 60px;
        ::v-deep .el-input__inner {
          color: #fff;
          background-color: inherit;
          border: none;
        }
      }
    }
  }
</style>
