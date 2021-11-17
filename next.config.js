const path = require('path')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  webpack: (config, options) => {
    if (isDevelopment) {
      config.plugins = [
        ...config.plugins,
        new WasmPackPlugin({
          crateDirectory: path.resolve(__dirname, '.'),
        }),
      ]
    }

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    return config
  },
}
