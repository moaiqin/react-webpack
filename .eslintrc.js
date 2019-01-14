module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser":"babel-eslint", //
    // "extends":"react-app",   //不然import，修饰器，等等慧报错，所以引入继承的规则
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"  //必须下载eslint-plugin-react插件
    ],
    "rules": {
        "no-alert": 2,
        // "no-console":2
    }
};