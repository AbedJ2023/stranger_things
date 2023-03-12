module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
