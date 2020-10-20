const path = require('path');
const chanelMsg = require('./src/mock/chanel/index.json');
const goodsInfo = require('./src/mock/goodsInfo/index.json');

const themeSelf = {
    'primary-color': '#409EFF',
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
    runtimeCompiler: true, // runtime 模式下是否启用模板编译器 (Compiler)

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
        },
        before(app){
            // 商城-香奈儿店铺数据
            app
                .get('/mall/chanel',(req, res, next) => { res.json(chanelMsg); })
                .get('/mall/goodsInfo',(req, res, next) => { res.json(goodsInfo); })
        }
    },
};