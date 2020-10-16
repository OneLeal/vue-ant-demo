const path = require('path');

const themeSelf = {
    'primary-color': '#4cff2c',
    'link-color': '#2623ff',
    'success-color': '#909399',
    'warning-color': '#fff838',
    'error-color': '#ff2c39',
};

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false, // 关闭eslint

    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@views', resolve('src/views'))
            .set('@common', resolve('src/common'))
            .set('@components', resolve('src/components'))
    },

    // vue.config.js for less-loader@6.0.0
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: themeSelf,
                    javascriptEnabled: true,
                },
            },
        },
    },

    pluginOptions: {
        // 配置全局less
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [resolve('./src/common/style/index.less')]
        }
    },

    devServer: {
        open: false, // 自动启动浏览器
        host: '127.0.0.1', // localhost
        port: 3000, // 端口号
        https: false,
        hotOnly: true, // 热更新
        proxy: {
            '^/api': {
                target: '127.0.0.1:3000', // 重写路径
                ws: true,   //开启WebSocket
                secure: false,      // 如果是https接口，需要配置这个参数
                changeOrigin: true
            }
        }
    },
};