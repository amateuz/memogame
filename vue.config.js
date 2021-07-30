const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
    ],
    resolve: {
      alias: {
        icons: path.resolve(
          __dirname,
          "node_modules/vue-material-design-icons"
        ),
      },
      extensions: [".vue"],
    },
  },
};
