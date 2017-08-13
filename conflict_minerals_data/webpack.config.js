var webpack = require('webpack');

const path = require('path');

var _root = path.resolve(__dirname);
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  entry: {
    app: './frontend/index.ts',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [
      {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },
      {
        test: /\.css$/,
        use: [ 'to-string-loader', 'style-loader', 'css-loader' ],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [root('static/index.html')]
      },
      {
        test: /\.ts?$/,
        use: ['ts-loader', 'angular2-template-loader'],
      },
      {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./frontend'),
      {} // a map of your routes
    ),
  ],
  watchOptions: {
    ignored: [/node_modules/, /static/]
  }
};
