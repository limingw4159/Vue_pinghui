module.exports = {
  //close eslint
  // lintOnsave:false
  devServer: {
    // true 则热更新，false 则手动刷新，默认值为 true
    inline: true,
    // development server port 8000
    port: 8001,
    proxy: {
      "/api": {
        target: "http://39.98.123.211",
      },
    },
  },
};
