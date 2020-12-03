module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/": {
        target: "http://127.0.0.1:8085/", // 访问数据的计算机域名
        ws: true, // 是否启用websockets
        changOrigin: true //开启代理
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
};
