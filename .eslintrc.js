module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser":"babel-eslint", //转化一些常规eslint不能解析的代码转化成被常规转化的代码比如es6的import
    "extends":"react-app",   //不然import，修饰器，等等慧报错，所以引入继承的规则（react-app里面的规则）
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"  //如果使用到 必须下载eslint-plugin-react插件
    ],
    "rules": {
        // "no-alert": 2,
        // "no-console":2
        "eqeqeq":0,
        " no-script-url":0
    }
};