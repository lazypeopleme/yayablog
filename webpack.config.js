const path = require("path");
const webpack = require("webpack");
const Hwp = require("html-webpack-plugin");
const Ext = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: Ext.extract("vue-style-loader!css-loader!sass-loader"),
            sass: Ext.extract(
              "vue-style-loader!css-loader!sass-loader?indentedSyntax"
            )
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images",
              name: "[name].[ext]?[hash]"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts",
              name: "[name].[ext]?[hash]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: Ext.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    contentBase: __dirname + "/dist/", //在该目录下的文件会被编译，没有设置则所有的文件都编译
    filename: "build.js", //设置某个文件被请求时才编译
    port: 5000, //服务器端口
    inline: true, //内联模式，用于提示引入的脚本
    open: true, //启动服务器就打开浏览器
    historyApiFallback: true,
    noInfo: true,
    publicPath: "/dist/"
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    new VueLoaderPlugin(),
    new Ext("build.css"),
    new Hwp({
      template: "./index.html",
      filename: "index.html",
      inject: "body" //true
    }), // 参数为目录,清除文件
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    // 构建期间自动检测环境变化，也就是如何根据NODE_ENV引入配置文件
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    // uglifyJsPlugin 用来对js文件进行压缩，从而减小js文件的大小，加速load速度。
    // uglifyJsPlugin会拖慢webpack的编译速度，所以建议在开发阶段将其关闭，部署的时候再将其打开。
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    // 你可以通过这个插件配置全局/共享的 loader 配置，使所有的 loader 都能收到这些配置。
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
