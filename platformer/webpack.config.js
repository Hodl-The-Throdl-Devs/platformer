const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: ["./client/index.js"],
  plugins: [new NodePolyfillPlugin()],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
