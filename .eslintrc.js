module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
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
        "no-alert": 2
    }
};