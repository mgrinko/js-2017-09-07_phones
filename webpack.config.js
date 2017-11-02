const path = require('path');

module.exports = {
  entry: './frontend/js/app.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  watch: true,
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }
    ]
  }
};