module.exports={
  /*别名*/
  configureWebpack:{
    resolve:{
      alias:{
        // '@': resolve('src')
      /*  'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'*/
      }
    }
  },
   /* devServer: {
      port: 8100, // 端口号
    }*/


    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8082',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }

    }
}
