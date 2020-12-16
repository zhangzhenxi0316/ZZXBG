// 项目根目录下，新增文件 config-overrides.js
const {
  override,
  fixBabelImports,
  addWebpackExternals,
  addWebpackPlugin,
} = require("customize-cra");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addWebpackExternals({
    extenrals: "react",
  }),
  addWebpackPlugin(new BundleAnalyzerPlugin({ analyzerPort: 3012 }))
);
