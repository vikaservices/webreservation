const port = (process.env.PORT || 8080);

console.log("process.env.ENV = " + process.env.ENV);

if( process.env.ENV == 'development' ) {
  // DEVELOPMENT
  console.log("Running development mode");

  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('../webpack.dev.config.js');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(port, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://localhost:' + port);
  });


} else {
  // PRODUCTION
  console.log("Running production mode");

  const Server = require('./server.js');
  const app = Server.app();

  app.listen(port);
  console.log('Listening at http://localhost:' + port);

}
