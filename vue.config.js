module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": require("path").resolve(__dirname, "src"),
      },
      extensions: [".ts", ".js", ".vue", ".json"],
    },
  },
};
