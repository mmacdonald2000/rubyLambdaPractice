const path = require('path');
const nodeExternals = require("webpack-node-externals");


module.exports = {
  entry: ["./node/decryption", "./node/encryption", "./node/handler"],
  target: "node",
  devtool: 'source-map',
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "node")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  },

  plugins: [
    // ...
  ],
}
