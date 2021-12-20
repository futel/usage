const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './static',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "static"}
      ],
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
