import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Re from '../../actions/test';
import './index.less';
class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="shouye">
                这里是首页
                <a href="javascript:;" onClick = {this.goSearch.bind(this)}>跳到搜索页</a>
                <br/>
                <a href="javascript:;" onClick = {this.test.bind(this)}>点击调用</a>
            </div>
        );
    }
    componentDidMount(){
        console.log(this.props,'props')
    }
    goSearch(){
        this.props.history.push('/search');
    }
    test() {
        this.props.test({
            api:'/api/',
            goodsId:1008
        });
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return state.TestReducer || {};
}
const mapDipatchToProps = (dispatch) => {
    return bindActionCreators({...Re},dispatch);
}
export default connect(
    mapStateToProps,
    mapDipatchToProps
)(Home);