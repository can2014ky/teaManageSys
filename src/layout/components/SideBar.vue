<template>
  <div class="sidebar-wrapper">
    <el-menu
      class="menu"
      :collapse="isSideMenuCollapse"
      :default-active="activeIndex"
      unique-opened
      router
      text-color="#fff"
      active-text-color="#fff">
      <template v-for="item in menu">
        <el-menu-item v-if="!item.children" :key="item.path" :index="item.path">
          <svg-icon :iconClass="item.iconClass" style="margin-right: 5px;"></svg-icon>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.path" :index="item.path">
          <template slot="title">
            <svg-icon :iconClass="item.iconClass" style="margin-right: 5px;"></svg-icon>
            <span slot="title">{{item.title}}</span>
          </template>
            <el-menu-item
              v-for="submenu in item.children"
              :key="submenu.path"
              :index="submenu.path"
            >{{submenu.title}}
            </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Menus from './menu.json';

export default {
  data() {
    return {
      menu: Menus,
      activeIndex: '',
    };
  },
  computed: {
    ...mapState('site', ['isSideMenuCollapse']),
  },
  watch: {
    $route: {
      handler(val) {
        console.log(666, val);
        if (val.matched[1]) {
          // this.menu = Menus.find(item => item.name === val.matched[1].meta.name);
          this.activeIndex = val.path;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
  .sidebar-wrapper {
    .menu:not(.el-menu--collapse) {
      width: 215px;
    }
    ::v-deep .el-menu {
      height: 100%;
      border-right: none;
      background: linear-gradient(180deg,#124598,#1956af);
      .el-menu-item {
        &:hover {
          background-color: #1956af;
        }
        &.is-active {
          background: linear-gradient(90deg,#4a73ec,#24aeef);
          border-right: 3px solid #57e8fd;
        }
      }
    }
    ::v-deep .el-submenu__title {
      &:hover {
        background-color: #1956af;
      }
      i {
        color: #fff;
        top: 32px;
      }
    }
    ::v-deep .el-submenu .el-menu-item {
      padding-left: 50px !important;
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
<style>
  .theme-main .el-menu--popup {
    background-color:rgb(0,0,0);
    opacity: .9;
  }
  .el-menu--popup .el-menu-item:hover {
    background-color: #005b9a !important;
  }
  .theme-main .el-menu-item.is-active {
    background-color: #005b9a !important;
  }
</style>
