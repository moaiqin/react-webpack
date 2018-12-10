process.env.NODE_DEV = 'production';
const webpack = require('webpack');
const appPaths = require('../config/paths');
const webapckConfig = require('../config/webpack.config.pro');
const pathModule = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra'); //文件读取库
const copyPublicFiles = (publicPath,buildPath) => {
    fs.exists(publicPath,function(exists){
        if(!exists){
            console.log(`not ${publicPath}`);
            return;
        }
        fs.exists(buildPath,function(buildExits){
            if(!buildExits){
                fs.mkdirSync(buildPath,00777);
            }
            fs.readdir(publicPath, function(err, paths){
                if(err){
                    throw err;
                }
                paths.length && paths.forEach(function(path){
                    let src = pathModule.resolve(publicPath,path);
                    let dist = pathModule.resolve(buildPath, path);
                    fs.stat(src, function(err, stat){
                        if(err){
                            throw err;
                        }
                        if(stat.isFile()){
                            let readable, writeable;
                            readable = fs.createReadStream(src);
                            writeable = fs.createWriteStream(dist);
                            readable.pipe(writeable);
                        }else{
                            copyPublicFiles(src,dist);
                        }
                    })
                })
            })
        })
    })
}

const runWebpack = (webapckConfig) => {
    return new Promise((resolve,reject) => {
        webpack(webapckConfig).run((err, stat) => {
            if(err){
                reject(err);
            }
            resolve(stat)
        });
    })
}
const build = async() =>{
    fsExtra.emptyDirSync(appPaths.outputPath);
    copyPublicFiles(appPaths.publicPath,appPaths.outputPath);
    await runWebpack(webapckConfig);
}
build();