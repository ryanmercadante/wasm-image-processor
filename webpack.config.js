const path = require('path')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './public/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '.'),
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
}
