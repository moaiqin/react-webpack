const appPaths = require('./paths'); //打包时所有依赖的文件
const webpack = require('webpack');
const pack = require(appPaths.packagePath);
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackEatractTextPligin = require('extract-text-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');//打包可视化工具，可以看到每一模块的大小
module.exports = {
    entry:{
        main: [appPaths.inputPath],
        vendor:Object.keys(pack.dependencies)
    },
    output:{
        path:appPaths.outputPath,
        chunkFilename: 'js/[name].[chunkhash:8].js', //这是根据路由打包不同的模块,按需加载
        filename:'js/[name].[chunkhash:8].js',
        // publicPath:'moshaobu.com/'
    },
    resolve:{
        extensions:['.js','.jxs']
    },
    // mode: "production",//对于webpack4新增一个属性,表示生产环境
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
                loader: webpackEatractTextPligin.extract({
                    fallback:'style-loader',
                    use:[//use
                        {
                            loader:'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        },
                        {
                            loader:'px2rem-loader',options:{
                                remUnit:75
                            }
                        },
                        {loader:'postcss-loader',options:{
                            plugins:[require('autoprefixer')("last 10 versions")],
                        }},
                        {loader:'less-loader'}
                    ]
                })
            },
            {
                test:/\.css$/,
                exclude: appPaths.appNodeModules,
                include:appPaths.srcPath,
                loader: webpackEatractTextPligin.extract({
                    fallback:'style-loader',
                    use:[//use
                        {
                            loader:'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        },
                        {
                            loader:'px2rem-loader',options:{
                                remUnit:75
                            }
                        },
                        {loader:'postcss-loader',options:{
                            plugins:[require('autoprefixer')("last 10 versions")],
                        }}
                    ]
                })
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
            // {//对于import a.html里面的图片不好处理,打包时不会进到相应的文件，所以使用下面的方式   如果使用html过滤器过滤的化，在html文件里面不能使用ejs语法，也不能使用htmlwebpackplugin文件
            //     test:/\.html$/,
            //     exclude: appPaths.appNodeModules,
            //     loader:[
            //         {loader:'html-withimg-loader'}
            //     ]
            // }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', //默认把所有模块公共代码和到vendor，然后插入index.html
            minChunks:2,
            filename: 'js/[name].[chunkhash].js'
        }), //代码抽取公共
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','main'], //再把把vendor和main公共的代码提取出来赋值给main,这样vendor就只剩node-module包下面的东西了
            minChunks:2,
            filename: 'js/[name].[chunkhash].js'
        }), //代码抽取公共
        new webpack.optimize.UglifyJsPlugin({// webpack4的话自动会压缩，废除这个插件，不然报错，js会压缩
            compress: {
              warnings: true
            }
        }),
        new htmlWebpackPlugin({
            template: appPaths.inputViewPath,
            chunks:['vendor','main'],
            filename:'index.ejs',
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        //对css文件分离
        new webpackEatractTextPligin({
            filename:'css/[chunkhash:8].css',
            inject : true,
            ejsVarInject: {
                _global: '<%-data>'
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),//打包时必须设为production，不然文件报错
            },
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'DEV') || 'false')),//给全局定义一个变量，是否是开发环境，我们可以通过这个环境不同的操作
        }),

        new BundleAnalyzerPlugin({analyzerPort:8919}), //代码压缩可视化工具

    ]
}