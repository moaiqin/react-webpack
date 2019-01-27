const webpack = require('webpack');
const webapckDevServer = require('webpack-dev-server');
const createDevServerConfig = require('../config/webpack.config.dev');
const complie = webpack(createDevServerConfig);
const PORT = process.env.PORT? process.env.PORT:"8090"; 
const HOST = process.env.NODE_HOST || `0.0.0.0`;
//解决不能自动刷新，所以在entry入口的每个数组中添加
for(var entry in createDevServerConfig.entry){
    Array.isArray(createDevServerConfig.entry[entry]) && createDevServerConfig.entry[entry].push(`webpack-dev-server/client?http://localhost:${PORT}/`)
}
// createDevServerConfig.entry.main.push('webpack-dev-server/client?http://localhost:8090/');
const devServer = new webapckDevServer(complie,{
    inline:true,
    // hot:true,
    historyApiFallback: true,
    contentBase: './' //output 目标文件
});
devServer.listen(8090,HOST,err => {
    if(err){
        return console.log(err);
    }
})