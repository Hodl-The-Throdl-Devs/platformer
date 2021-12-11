var webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
    },
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
