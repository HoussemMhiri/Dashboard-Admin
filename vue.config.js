module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://fd81-197-240-49-154.ngrok-free.app/",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/addConfig": "/addConfig" },
      },
    },
  },
};
