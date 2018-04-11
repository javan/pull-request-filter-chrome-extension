const path = require("path")

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },

  mode: "production",

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  }
}
