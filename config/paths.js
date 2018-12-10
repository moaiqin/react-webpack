// 包含webapck需要的各个目录
const path = require('path');
const fs = require('fs');
const appPath = process.cwd(); //表示获取工作目录，//E:\mo-test-react\ant 
const appDirectory = fs.realpathSync(appPath);//E:\mo-test-react\ant 
const getFileLocation = relativePath => path.resolve(appDirectory,relativePath);
module.exports = {
    packagePath: getFileLocation('package.json'),
    srcPath: getFileLocation('src'),
    inputPath: getFileLocation('src/index.js'), //webpack js入口文件
    inputViewPath: getFileLocation('public/index.html'), // webpack 引入的html模板文件
    outputPath: getFileLocation('build'), //webpack js输出文件
    appNodeModules: getFileLocation('node_modules'), // npm 下载的模块
    publicPath: getFileLocation('public')
}