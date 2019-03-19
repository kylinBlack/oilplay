module.exports = {
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  devServer: {
    host: "localhost",
    port: "8080", //代理端口
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      "/api": {
        //代理api
        target: "http://192.168.4.128:8766", //服务器api地址
        // target: "http://m.dev.jieqian.iebt.net", //服务器api地址
        changeOrigin: true, //是否跨域
        ws: true // proxy websockets
      }
    }
  }
};
