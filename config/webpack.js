const path = require('path')

const resolve = p => path.resolve(__dirname, p)

export default {
  alias: {
    images: resolve('../src/assets/images'),
    routes: resolve('./routes'),
    utils: resolve('../src/utils'),
  },
  devServer: {
    proxy: {
      // '/api': {
      //   target: 'http://47.100.206.216',
      //   pathRewrite: { '^/api': '' },
      //   changeOrigin: true
      // }
      '/api': {
        target: 'https://easy-mock.com/mock/5ce8dc24c27171751ad09a3c/imooc',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
}