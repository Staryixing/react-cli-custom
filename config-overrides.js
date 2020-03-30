const {override, fixBabelImports, addLessLoader} = require('customize-cra');
var path = require('path');

// 配置alias
let configAlias = function(config){
    config.resolve.alias = Object.assign(config.resolve.alias, {
        "@component": path.resolve(__dirname, "src", "components"),
        "@constant": path.resolve(__dirname, "src", "constants"),
        "@model": path.resolve(__dirname, "src", "model"),
        "@server": path.resolve(__dirname, "src", "servers"),
        "@util": path.resolve(__dirname, "src", "utils"),
        "@route": path.resolve(__dirname, "src", "routes"),
    })
    return config
}

// 配置css-module
let configLessLoader = function(config){
    let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    loaders.unshift(
        {
            // 编译less 使用了css modules
            test: /\.less$/,
            exclude: [/node_modules/], // 排除antd里面的样式
            use: [
                {loader: 'style-loader'},
                {
                    loader:'css-loader',
                    options:{
                        modules:{
                            mode: "local",
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    }
                },
                {loader: 'less-loader'}
            ]
        },
    )
    return config;
}
module.exports = override(
    // 按需加载组件
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    // 修改主题样式
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1890ff'}
    }),
   configLessLoader,
   configAlias
)