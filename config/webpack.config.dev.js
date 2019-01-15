const appPaths = require('./paths'); //打包时所有依赖的文件
const webpack = require('webpack');
const pack = require(appPaths.packagePath);
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry:{
        main: [appPaths.inputPath]
    },
    output:{
        path:appPaths.outputPath,
        chunkFilename: 'js/[name].[chunkhash:8].js', //这是根据路由打包不同的模块,按需加载
        filename:'js/bundle.js'
    },
    resolve:{
        extensions:['.js','.jxs']
    },
    module:{
        rules:[
            {
                test:/\.(js|jxs)$/,
                exclude:appPaths.appNodeModules,
                include:appPaths.srcPath,
                loader:'babel-loader',
                options:{
                    "presets": ["react","es2015",'stage-0'],//env 可以代替es2015，不能转化全局api，Promise等
                    "plugins": ["transform-runtime","transform-decorators-legacy"] //，需要安装（babel-runtime，里面装有prolyfill包）辅助，转换es2015全局api Promise等，不污染全局，只会引入一次，按需加载对应引用的全局实力，但不能转化非实例api如"ajaj".include('a')。babel-prolyfill，改变全局对象原型链，导入代码过大
                }
            },
            {
                test:/\.less$/,
                exclude: appPaths.appNodeModules,
                include:appPaths.srcPath,
                loader:[//use
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'px2rem-loader',options:{
                        remUnit:75
                    }},
                    {loader:'postcss-loader',options:{
                        plugins:[
                            require('autoprefixer')("last 10 versions")
                        ],
                        // browser:['last 10 versions'] //这样写不生效，传入上面写法生效，必须传versions生效

                    }},
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.css$/,
                exclude: appPaths.appNodeModules,
                include:appPaths.srcPath,
                loader:[//use
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'px2rem-loader',options:{
                        remUnit:75
                    }},
                    {loader:'postcss-loader',options:{
                        plugins:(loader) => [
                            require('autoprefixer')("last 10 versions")
                        ]
                    }}
                ]
            },
            {
                test:/\.(png|jpg|jepg|gif)$/i,
                exclude: appPaths.appNodeModules,
                include:appPaths.srcPath,
                loader:[
                    {loader:'url-loader',options:{
                        limit:1000,//图片大小小于这个的话就转换成base64
                        name:'images/[name].[ext]'
                        }
                    }
                ]
            },
            {//对于import a.html里面的图片不好处理,打包时不会进到相应的文件，所以使用下面的方式
                test:/\.html$/,
                exclude: appPaths.appNodeModules,
                loader:[
                    {loader:'html-withimg-loader'}
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: appPaths.inputViewPath,
            filename:'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserWebpackPlugin({
            url: 'http://localhost:8090'
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'DEV') || 'false')),//给全局定义一个变量，是否是开发环境，我们可以通过这个环境不同的操作
        }),
    ]
}