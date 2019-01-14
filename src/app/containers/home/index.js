import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Re from '../../actions/test';
import './index.less';
import {testByClass,decoratorByProp,decoratorByClass,decoratorByClass1,decoratorByClass2} from '../../uitls/index';
import showLoading from '../../reducers/configInfo/showLoading';

    
// @testByClass
// @decoratorByClass('传参')
@decoratorByClass1(false)
@decoratorByClass2(true)
class Home extends Component{
    constructor(props){
        super(props);
        this.chuanzhi = '传值';
    }
    render(){
        console.log('hahhah')
        return (
            <div className="shouye">
                这里是首页
                <a href="javascript:;" onClick = {this.goSearch.bind(this)}>跳到搜索页</a>
                <br/>
                <a href="javascript:;" onClick = {this.test.bind(this)}>点击调用</a>
                {/* <div onClick={this.testLoading.bind(this)}>showLoading,err测试</div> */}
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
    goSearch(){
        console.log(Home.test,'Home.test,');
        console.log(Home.prototype.use,'use');
        this.props.history.push('/search');
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
