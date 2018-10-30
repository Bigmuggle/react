const path = require('path')
const webpackConfig = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = webpackConfig(baseConfig, {
  mode: 'production',
  target: 'node', // 执行在node端
  entry: { // app.js就是作为打包的入口
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', // 打包出的统一前缀
    libraryTarget: 'commonjs2' // 打包的模块方案
  }

})
