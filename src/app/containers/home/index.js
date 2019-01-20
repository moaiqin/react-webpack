import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Re from '../../actions/test';
import { shouldScroll } from '../../uitls/index';
import './index.less';
import {
    //testByClass,
    decoratorByProp,
    //decoratorByClass,
    decoratorByClass1,decoratorByClass2} from '../../uitls/index';
// import showLoading from '../../reducers/configInfo/showLoading';

    
// @testByClass
// @decoratorByClass('传参')
@decoratorByClass1(false)
@decoratorByClass2(true)
class Home extends Component{
    constructor(props){
        super(props);
        this.chuanzhi = '传值';
        this.state = {};
    }
    render(){
        const {showWrap = false} = this.state; 
        return (
            <div className="shouye">
                这里是首页
                <button href="javascript:;" onClick = {this.goSearch.bind(this)}>跳到搜索页</button>
                <br/>
                <button href="javascript:;" onClick = {this.test.bind(this)}>点击调用</button>
                {/* <div onClick={this.testLoading.bind(this)}>showLoading,err测试</div> */}
                <button onClick={this.showWrapFn.bind(this)}>点击浮层</button>
                
                <div className="scroll">滚动条穿透测试</div>
                {showWrap && <div className="fix-wrap">弹窗浮层内容
                    <button onClick={ this.hideWrap.bind(this) }>关闭浮层</button>
                </div>}
            </div>
        );
    }
    componentDidMount(){
        console.log(this.props.history,'his.props.history')
        this.props.test({
            api:'moshao.com',
            name:'下辖' 
        },true ).then((res) => {
            console.log(res,'res')
        },(err) => {
            console.log(err,'reserr')
        })
    }

    hideWrap() {
        shouldScroll(false);
        this.setState({
            showWrap:false
        });
    }

    goSearch(){
        console.log(Home.test,'Home.test,');
        console.log(Home.prototype.use,'use');
        this.props.history.push('/search');
    }

    // 显示浮层
    showWrapFn() {
        shouldScroll(true);
        this.setState({
            showWrap:true
        })
    }

    @decoratorByProp
    test() {
        // console.log(decoratorByProp,'decoratorByProp')
        this.props.test({
            api:'/api/',
            goodsId:1008
        }).then(function(res){
            console.log(res,111)
        });
    }
}

const mapStateToProps = (state) => {
    return state.TestReducer || {};
}
const mapDipatchToProps = (dispatch) => {
    return bindActionCreators({...Re},dispatch);
}
export default connect(
    mapStateToProps,
    mapDipatchToProps
)(Home);
