const fs = require('fs');
const path = require('path');
const express = require('express');

const appConfig = require('./config/app.json');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    silent: true
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(webpackConfig.output.publicPath));

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
}
else {
  app.use(express.static(path.join(__dirname, 'dist')));

  // Handle resources requested from initial /:language/:region/ page load
  const handler = (req, res) => {
    let file = req.params[0];

    if (file) {
      file = path.join(__dirname, 'dist', file);

      // Ensure file exists before sending it
      fs.stat(file, (err) => {
        if (err) {
          // Redirect probable custom routes to the index page
          res.sendFile(path.join(__dirname, 'dist/index.html'));
        }
        else {
          res.sendFile(file);
        }
      });
    }
    else {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    }
  };

  // Default to sending the index page
  app.get('/:splat*?', handler);
}

app.listen(appConfig.server.port);
