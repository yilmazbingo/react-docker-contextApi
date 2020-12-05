const path = require("path");
const HtmlWebPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",

  output: {
    globalObject: "this",
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //     },
      //   ],
      // },

      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    overlay: true,
  },
  plugins: [new CopyWebpackPlugin({ patterns: [{ from: "assets" }] })],
};

// {
//   test: /\.md$/,
//   use: [{ loader: "html-loader" }, { loader: "markdown-loader" }]
// },
