module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jp(e*)g|svg|bpm|gif)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  }
};
