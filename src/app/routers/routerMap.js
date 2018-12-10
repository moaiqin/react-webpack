import React, { Component } from 'react';
import App from '../containers/index';
import AsyncComponent from '../uitls/asyncComponent';
const Search = AsyncComponent(() => import(/* webpackChunkName: "search" */'../containers/search/index').then((module) => {return module.default}),{name:'search'});
const Home = AsyncComponent(() => import(/* webpackChunkName: "home" */'../containers/home/index').then((module) => {return module.default}),{name:'home'});
import {
  Route,
  BrowserRouter,
  Switch,
  Router
} from 'react-router-dom';
class RouterMap extends Component{
    render(){
        return (
            <Router history={this.props.history}>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route path='/index' component={Home}></Route>
                        <Route path='/search' component={Search}></Route>
                    </Switch>
                </App>
            </Router>
        )
    }
}
export default RouterMap;