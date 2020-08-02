const os = require('os');
const path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: '/', // 部署应用包时的基本URL,默认是服务器根目录'/'
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: process.env.NODE_ENV === 'development',
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  parallel: os.cpus().length > 1,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY_BASE_API,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@src', resolve('src')) // 默认就已经配置了
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'));

    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: ' i18n  ',
      enableInSFC: true,
    },
  },
};
