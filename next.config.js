/* eslint-disable */
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const path = require('path');

module.exports = () =>
  withSass(
    withCss({
      webpack: (config, {
        isServer
      }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style\/css.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals)
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader"
          });
        }
        config.module.rules.push({
          test: /\.(gif|png|jpe?g)$/,
          use: [{
            loader: "file-loader",
            options: {
              name: "static/img/[name].[ext]"
            }
          }]
        })
        return config;
      },
      // generateBuildId: async () => {
      //   // For example get the latest git commit hash here
      //   return 'v1'
      // }
    })
  );