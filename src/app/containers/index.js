import React, {Component} from 'react';
import {connect} from 'react-redux';
import clearErrAction from '../actions/clearErr';
//如果app里面使用了redux的情况下，下app里面点击任何路由都不会跳转，使用withRouter包redux以下解决方案
import {withRouter} from 'react-router-dom';
import {
    Link
} from 'react-router-dom';

class App extends Component {
  componentWillMount(){
    //界面加载之前先清除err信息
    this.props.clearErrAction().then(()=>{}, ()=>{});
  }
  
  render() {
    const {showLoading, errInfo} = this.props;
    console.log(showLoading,'showLoading');
    console.log(errInfo,'errInfo')
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