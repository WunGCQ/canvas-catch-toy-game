/* global __dirname */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackSystemRegister = require('webpack-system-register');
const js = (path) => (__dirname + "/src/js/" + path);
process.env.NODE_ENV = 'development';
module.exports = {
  entry : {
    'main' : './src/js/index.js'
  },
  // devtool : 'cheap-module-source-map',
  output : {
    path : __dirname + '/dist/',
    filename : "[name].js",
    chunkFilename : "[id].js",
    //publicPath的设置可能会导致 [HMR] Hot Module Replacement is disabled（publicPath错误的设置会导致content-base找不到）
    publicPath : '/dist/'
  },
  module : {
    loaders : [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        loader : 'babel-loader',
        test : /\.jsx?$/,
      },
      {
        test : /\.css$/,
        loader : ExtractTextPlugin.extract({
          fallbackLoader : 'style-loader', loader : 'css-loader'
        }),
      },
      {
        test : /\.(styl|css)$/,
        loader : ExtractTextPlugin.extract({
          fallbackLoader : 'style-loader', loader : 'css-loader!stylus-loader'
        })
      },
      //https://github.com/DragonsInn/fontgen-loader/issues/20 ( build failed: CssSyntaxError:
      // Missed semicolon) Module build failed: ReferenceError: window is not defined
      // "style-loader!css-loader!stylus-loader" to "style-loader", "css-loader", "stylus-loader"
      {
        test : /\.(jpe?g|png|gif)$/i,
        loaders : [
          'file-loader?hash=sha512&digest=hex&name=/[path][name].[hash].[ext]'
        ]
      },
      {
        test : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loaders : [
          'file-loader?hash=sha512&digest=hex&name=[path][name].[ext]'
        ]
      },
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV' : '"development"'
      }
    }),
    new ExtractTextPlugin("main.css"),
    new webpack.NoErrorsPlugin(),
  ],
  stats : {
    // Nice colored output
    colors : true,
    timings : true,
  },
  resolve : {
    // modulesDirectories: ["node_modules"],
    extensions : ['.js', '.jsx', '.styl', '.css' ],
  },
  externals : {
    // require("jquery") is external and available
    //  on the global var jQuery
    "react-dom": "ReactDOM",
    "react": "React",
    "echarts" : "echarts",
    "lodash" : "_",
    "d3" : "d3",
  }
};