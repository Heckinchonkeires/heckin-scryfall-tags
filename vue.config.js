const path = require("path");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(
    __dirname,
    "../heckin-scryfall-tags-server/server/public"
  ),
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
