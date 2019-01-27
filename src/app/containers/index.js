import React, {Component} from 'react';
import {connect} from 'react-redux';
import clearErrAction from '../actions/clearErr';
//如果app里面使用了redux的情况下，下app里面点击任何路由都不会跳转，使用withRouter包redux以下解决方案
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';

class App extends Component {
  
  constructor(props, context) {
    super(props);
  }
  //声明context对象
  static childContextTypes  = {
    name: PropTypes.string,
    age: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }
  //返回Context对象
  getChildContext() {
    return {
      name:'莫绍补',
      age: () => {
        return  25
      }
    }
  }

  componentWillMount(){
    //界面加载之前先清除err信息
    this.props.clearErrAction();
  }
  componentDidMount() {
    let reg = /(Y+)\s(\w+)/ig;
    let str = 'YYYsahd';
    let a = str.replace(reg,($1,$2,$3) =>{
      //$1 表示匹配到的字符串
      //$2 表示第一个括号匹配到的字符串
      //$3 表示下一个括号的=匹配到的字符串

      return '499'
    });
  //  let a = str.replace(reg,'$1$2')
    console.log(a,'str')
  }
  
  render() {
    console.log(this.context,'this.context')
    const {showLoading, errInfo} = this.props;
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/search">搜索</Link></li>
          <li><Link to="/inbox">提问</Link></li>
        </ul>
        <div>{showLoading? '加载中...':''}</div>
        {!!errInfo.errcode && <div>
          <h1>页面出错啦</h1>
          <p>errcode:{errInfo.errcode}</p>
        </div>}
        {this.props.children}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {errInfo, showLoading} = state;
  return {
    errInfo,
    showLoading
  }
}
export default withRouter(connect(mapStateToProps,{clearErrAction})(App));