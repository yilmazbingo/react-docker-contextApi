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
    //contentBase lets tell the devs server where it can find our public file.
    contentBase: path.join(__dirname, "public"),
    // HistoryApiFallback tells devserver that we are going to be handling routing via our client side code.
    historyApiFallback: true,
    overlay: true,
    port: 80,
  },
  plugins: [
    new HtmlWebPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new CopyWebpackPlugin({ patterns: [{ from: "assets" }] }),
  ],
};

// {
//   test: /\.md$/,
//   use: [{ loader: "html-loader" }, { loader: "markdown-loader" }]
// },
