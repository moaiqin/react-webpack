// const webpack = require('webpack');
// const path = require('path');
// const htmlWebpackPlugin = require('html-webpack-plugin');
// const openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
// module.exports = {
//     entry:{
//         main:path.resolve(__dirname,'./app/index.js')
//     },
//     output:{
//         // path:path.join(__dirname + './dist/js'),
//         filename:'js/[name]-[hash:7].js',
//         // publicPath:'/'
//     },
//     resolve:{
//         extensions:['','.js','.jxp']
//     },
//     module:{
//         loaders:[
//             {
//                 test:/\.(js|jxp)$/,
//                 exclude:path.resolve(__dirname, 'node_modules/'),
//                 // include:path.resolve(__dirname, 'app'),
//                 loader:'babel'
//             },
//             {
//                 test:/\.less$/,
//                 exclude:path.resolve(__dirname,'node_modules/'),
//                 loader:'style-loader!css-loader!postcss!less-loader',//实行顺序右向左
//             }
//             // ,{
//             //     test:/\.css$/,
//             //     exclude:path.resolve(__dirname,'node_modules/'),
//             //     loader:'stype-loader!css-loader!postcss',
//             // },
//             // ,
//             // {
//             //     test:/\.(png|gif|jpg|jpeg|bnp)$/i,
//             //     // loader:'url-loader?limit=400?name=[path][name].[ext]&outputPath=image/'也可以下面这么写
//             //     loader:'url-loader',
//             //     query:{
//             //         limit:400,
//             //         name:'[path][name].[ext]',//outputPath不写的话这里这里还可以这么用'assets/[path][name].[ext]'
//             //         outputPath:'assets/'
//             //     }
//             // }
//         ],
//         // postcss:[
//         //     require('autoprefixer')
//         // ],
//         plugins:[
//             new htmlWebpackPlugin({
//                 chunk:'main',//引入entry的哪个模块
//                 template:'/app/index.tpl.html',//引入模板
//                 // filename:'index.html',//把上面哪个模块命名为index.h
//             }),
//             //热加载插件
//             new webpack.HotModuleReplacementPlugin(),

//             //自动打开浏览器
//             new openBrowserWebpackPlugin({
//                 url:'http://localhost:8080'
//             }),
//             new webpack.DefinePlugin({
//                 __DIV__:JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
//             })
//         ],
//         devServer:{
//             // colors:true,
//             // historyApiFallback:true,
//             port:8080,
//             // inline:true,
//             // hot:true
//         }
//     }
// }

//记住只有webpack打包的时候才有output指定的文件dist
const webpack = require('webpack');
const pack = require('./package.json');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry:{
        main:path.join(__dirname,'/src/app/index.js'),
        // vendor:Object.keys(pack.dependencies)
    },
    output:{
        path:path.join(__dirname,'/dist'),
        filename:'js/[name].js',
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
                exclude:path.join(__dirname,'node_modules/'),
                loader:'babel-loader',
                options:{
                    "presets": ["react","env",'stage-0'],//env 可以代替es2015，不能转化全局api，Promise等
                    "plugins": ["transform-runtime",'transform-decorators-legacy'] //，需要安装（babel-runtime，里面装有prolyfill包）辅助，转换es2015全局api Promise等，不污染全局，只会引入一次，按需加载对应引用的全局实力，但不能转化非实例api如"ajaj".include('a')。babel-prolyfill，改变全局对象原型链，导入代码过大
                }//transform-decorators-legacy是在对象，或者对象属性中适用修饰器解析
            },
            {
                test:/\.less$/,
                exclude:path.join(__dirname, 'node_modules/'),
                loader:[//use
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'postcss-loader',options:{
                        plugins:[require('autoprefixer')("last 10 versions")],
                        // browser:['last 10 versions'] //这样写不生效，传入上面写法生效，必须传versions生效
                    }},
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.css$/,
                exclude:path.join(__dirname,'node_modules/'),
                // loader:'style-loader!css-loader!postcss-loader'//是可以，但是要创建postcss.config.js,postcss才能在这里永
                loader:[//use
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'postcss-loader',options:{
                        plugins:(loader) => [
                            require('autoprefixer')("last 10 versions")
                        ]
                    }}
                ]
            },
            {
                test:/\.(png|jpg|jepg|gif)$/i,
                loader:[
                    {loader:'url-loader',options:{
                        limit:1000,//图片大小小于这个的话就转换成base64
                        //name 字段来指定图片打包的目录与文件名
                        // outputPath:'[path]/',
                        // name:'[path]/[name].[chunkhash:8].[ext]', //在打包的时候按路径生成一个文件夹，打包目录中引入的文件也引用这个地址,如果又pulicePath,用于cdn多
                        //那么就是publicPath/assets/+开发目录中元素引用图片的地址，比如 src="./image/a.png",publicePath="hah/",最后变为src="hah/assets/image/a.png"
                        name:'images/[name].[ext]',//如是是图片具体的位置https://img.0543dy.com/upload/vod/2018-04-26/15247071307.jpg，则打包后还是这个
                        // outputPath:'assets/',//注意，只要文件时放在js，html里面都无法打包过来，也不会通过name创建文件，比如html <img stc/>不行,less,css文件可以
                        // publicPath:'output/'src 下background:url(./assets/images/a.pjg) ->打包后background:url(./images/a.pjg),根据name变化
                        //还有重要的一点，js下面使用图片，打包时不会引入
                        //比如react下 <img src="./asset.image/tets.pjg"/>打包过来，文件没有过来，解决方法<img src={require('./asset.image/tets.pjg')}/>
                        }
                    }
                ]
            },
            {//对于import a.html里面的图片不好处理,打包时不会进到相应的文件，所以使用下面的方式 如果使用html过滤器过滤的化，在html文件里面不能使用ejs语法，也不能使用htmlwebpackplugin文件
                test:/\.html$/,
                loader:[
                    {loader:'html-withimg-loader'}
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/app/index.tpl.html',
            filename:'index.html'
        }),
        // new webpack.optimize.UglifyJsPlugin({// webpack4的话自动会压缩，不用使用这个插件，不然报错
        //     compress: {
        //       //supresses warnings, usually from module minification
        //       warnings: false
        //     }
        // }),

    ],
    devServer:{
        port:8000
    }
}