const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const stylelint = require('stylelint');
const webpack = require('webpack');

const appConfig = require('./config/app.json');
const ENV_NAME = process.env.NODE_ENV || 'development';

const config = {
  context: path.resolve(__dirname, './src'),
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
    library: 'app',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.hbs)$/,
        loader: 'handlebars'
      },
      {
        test: /(\.json)$/,
        loader: 'json',
        exclude: /node_modules/
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          mimetype: 'image/svg+xml',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          mimetype: 'application/octet-stream',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          mimetype: 'application/octet-stream',
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file',
        query: {
          name: 'images/[name].[ext]'
        },
        include: path.resolve(__dirname, './src/assets/images')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: path.resolve(__dirname, './src')
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/assets/audios'),
        to: path.resolve(__dirname, './dist/audios')
      },
      {
        from: path.resolve(__dirname, './src/assets/fonts'),
        to: path.resolve(__dirname, './dist/fonts')
      },
      {
        from: path.resolve(__dirname, './src/assets/icons'),
        to: path.resolve(__dirname, './dist/icons')
      },
      {
        from: path.resolve(__dirname, './src/assets/images'),
        to: path.resolve(__dirname, './dist/images')
      },
      {
        from: path.resolve(__dirname, './src/assets/videos'),
        to: path.resolve(__dirname, './dist/videos')
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, './src/index.hbs'),
      title: appConfig.app.title
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './src/*')
    ]
  }
};

if (ENV_NAME === 'development') {
  config.entry = [
    'webpack-hot-middleware/client?reload=true',
    config.entry
  ];

  config.output.publicPath = '/';

  // Configure SCSS transpiling
  config.module.loaders.push({
    test: /\.scss$/,
    loaders: [
      'style',
      'css',
      'postcss',
      'resolve-url',
      'sass?sourceMap'
    ]
  });

  // Configure SCSS linting.
  // NOTE: added disabling stylelint option temporarily.
  if (!appConfig.nolint) {
    config.postcss.push(stylelint());
  }

  // Configure JS transpiling and hot module replacement
  config.module.loaders.unshift({
    test: /(\.jsx?)$/,
    loaders: ['babel'],
    exclude: /(node_modules|bower_components)/
  });

  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  // Configure JS linting
  config.module.loaders.push({
    test: /(.jsx?)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  });
}
else if (ENV_NAME === 'production') {
  // Configure output filenames
  config.output.filename = 'js/app.min.js';
  config.output.publicPath = '../';

  // Configure SCSS transpiling
  config.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', [
      'css',
      'postcss',
      'resolve-url',
      'sass?sourceMap',
    ].join('!'))
  });

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );

  // Configure JS transpiling
  config.module.loaders.unshift({
    test: /(\.jsx?)$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('css/app.min.css')
  );
}

module.exports = config;
