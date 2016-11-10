const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../routes/index');

module.exports = {
  app: function() {
    const app = express();
    const indexPath  = path.join(__dirname, '/../index.html');
    const publicPath = express.static(path.join(__dirname, '../public'));
    const stylePath = express.static(path.join(__dirname, '../style'));
    const utilsPath = express.static(path.join(__dirname, '../utils'));

    app.use(bodyParser.text());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    // Use CORS for all routes
    app.use(cors());
    app.use('/api', routes);

    app.use('/public', publicPath);
    app.use('/style', stylePath);
    app.use('/utils', utilsPath);
    app.get('/', function(_, res) { res.sendFile(indexPath) });

    return app;
  }
};
