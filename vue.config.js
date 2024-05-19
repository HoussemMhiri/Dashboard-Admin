module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://b448-102-27-132-64.ngrok-free.app/",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/addConfig": "/addConfig" },
      },
    },
  },
};
