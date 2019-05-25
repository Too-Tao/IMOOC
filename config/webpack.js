const path = require('path')

const resolve = p => path.resolve(__dirname, p)

export default {
  alias: {
    images: resolve('../src/assets/images'),
    routes: resolve('./routes')
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://easy-mock.com/mock/5ce8dc24c27171751ad09a3c/imooc',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
}