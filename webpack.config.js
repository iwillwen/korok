const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const b = require('./assets/banner')
const path = require('path')
const os = require('os')

module.exports = {
  entry: './src/korok.ts',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'korok.js',
    library: 'korok',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    sourceMapFilename: 'korok.map',
    globalObject: 'this'
  },
  resolve: {
    extensions: [ '.ts' ],
    alias: {
      'lodash': 'lodash-es'
    }
  },
  mode: 'production',
  optimization: {
    usedExports: true,
    minimizer: [
      new UglifyJsPlugin({
        parallel: os.cpus().length,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: b.banner
    })
  ]
}