const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  // root of bundle, beginning of dependency graph
  // relative path
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  // output to folder specified
  output: {
    // name of each attribute in entry obj is used in place of [name]
    filename: "[name].bundle.js",
    // or path: __dirname + "/dist",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // type of files to pre-process
      {
        //   process any jpg image file, can search for png, svg, gif
        test: /\.jpg$/i,
        // implement loader
        use: [
          // emit, convert, process images
          {
            loader: "file-loader",
            options: {
              // file is treated as ES5, paths might be formatted wrong
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                //   replaces "../" from require() with "/assets/"
                return url.replace("../", "/assets/");
              },
            },
          },
          //   optimize (reduce) emitted files from above
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  // make exceptions for variables using webpack.ProvidePlugin
  // instruct to use jQuery, otherwise error in console for $
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      // can also set value to disable to temporarily stop reporting and auto opening of report in browser
      analyzerMode: "static", //outputs to HTML file in dist folder, called report.html
    }),
    // invoke constructor fx
    new WebpackPwaManifest({
        name: "Food Event",
        short_name: "Foodies",
        description: "An app that allows you to view upcoming food events.",
        // homepage for PWA relative to manifest file
        start_url: "../index.html",
        background_color: "#01579b",
        theme_color: "#ffffff",
        // fingerprints tell webpack whether to generate unique fingerprint each time new manifest generated, manifest.lhge325d.json
        fingerprints: false,
        // determines if link to manifest.json is added to HTML
        inject: false,
        icons: [{
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            // where icons sent after web manifest is completed by plugin
            destination: path.join("assets", "icons")
        }]
    })
  ],
  // default is production mode (code minified automatically)
  mode: "development",
};
