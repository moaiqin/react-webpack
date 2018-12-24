import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';
class Search extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    render(){
        console.log(this.props,'this.context')
        return (
            <div className="search">
                <h1>这里是收缩界面</h1>
                <a href="javascript:;" onClick={this.goHome.bind(this)}>到首页</a>
            </div>
        );
    }

    goHome(){
        this.context.router.history.push('/index')
    }
}

export default Search;