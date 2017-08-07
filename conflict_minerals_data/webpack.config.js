const path = require('path');

module.exports = {
  entry: './frontend/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

