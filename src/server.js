const express = require('express');
const path = require('path');

module.exports = {
  app: function() {
    const app = express();
    const indexPath  = path.join(__dirname, '/../index.html');
    const publicPath = express.static(path.join(__dirname, '../public'));
    const stylePath = express.static(path.join(__dirname, '../style'));
    const utilsPath = express.static(path.join(__dirname, '../utils'));

    app.use('/public', publicPath);
    app.use('/style', stylePath);
    app.use('/utils', utilsPath);
    app.get('/', function(_, res) { res.sendFile(indexPath) });

    return app;
  }
};
