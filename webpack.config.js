const path = require('path');

module.exports = {
  entry: './frontend/js/app.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'public', 'js')
  }
};