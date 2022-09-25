const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',//要代理的本地api地址，也可以换成线上测试地址
        changeOrigin: true,//允许跨域
        pathRewrite: { "^/api": "/" }//将/api开头替换为/api
      }
    }
  },
})
