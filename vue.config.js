module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://9423-197-1-90-20.ngrok-free.app/",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/addConfig": "/addConfig" },
      },
    },
  },
};
