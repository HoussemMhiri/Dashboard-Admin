module.exports = {
  devServer: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: "https://e5b9-197-1-90-20.ngrok-free.app/",
=======
        target: "https://e5b9-197-1-90-20.ngrok-free.app/",
>>>>>>> 8b19518143757000ab7e7bcb15b9203c6217cf04
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/addConfig": "/addConfig" },
      },
    },
  },
};
