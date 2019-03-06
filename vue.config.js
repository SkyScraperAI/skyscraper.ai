module.exports = {
    parallel: true,
    configureWebpack: {
        devtool: "source-map",
    },
    chainWebpack: (config) => {
        config.module
            .rule("raw")
            .test(/\.aes$/)
            .use("raw-loader")
            .loader("raw-loader")
            .end();
    }
};
