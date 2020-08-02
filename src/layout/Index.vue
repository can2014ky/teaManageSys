<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header>
        <HeaderNav/>
      </el-header>
      <el-container class="container-wrapper">
        <SideBar></SideBar>
        <el-main class="main-wrapper">
          <el-breadcrumb v-if="paths[paths.length - 1].meta.showBreadcrumb !== false" separator-class="el-icon-arrow-right" class="breadcrumb">
            <template v-for="(path, index) in paths">
              <el-breadcrumb-item v-if="path.meta.title" :to="path.path" :key="index">{{path.meta.title}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <div class="content-wrapper">
            <AppMain></AppMain>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import HeaderNav from './components/HeaderNav.vue';
import SideBar from './components/SideBar.vue';
import AppMain from './components/AppMain.vue';

export default {
  components: {
    HeaderNav,
    SideBar,
    AppMain,
  },
  computed: {
    ...mapState('site', ['isSideMenuCollapse']),
    paths() {
      return this.$route.matched;
    },
  },
};
</script>
<style lang="scss" scoped>
  .layout-wrapper {
    ::v-deep .el-header {
      padding: 0;
    }
    .container-wrapper {
      min-height: calc(100vh - 60px);
    }
    ::v-deep .el-main {
      padding: 0;
    }
    .main-wrapper {
      box-sizing: border-box;
      .breadcrumb {
        height: 34px;
        line-height: 34px;
        background-color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
      }
      .content-wrapper {
        background-color: #f2f2f2;
        padding: 10px;
      }
    }
  }
</style>
