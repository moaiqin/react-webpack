#使用eslint
#首先全局安装eslint   npm i -g eslint
#在目录中 eslint --init
#如果在.elintrc.js文件中使用react  那么就要下载npm install eslint-plugin-react --save-dev 不用做任何处理
#要支持import 修饰符@等等语法就需要eslintrc.js  下继承react-app规则（须下载eslint-config-react-app 配置文件 直接npm i eslint-config-react-app --D即可）