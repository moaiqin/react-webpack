import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/search">搜索</Link></li>
          <li><Link to="/inbox">提问</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
export default App;