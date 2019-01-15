import React from 'react';
import {render} from 'react-dom';
import RouterMap from './app/routers/routerMap';
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import createStore from './app/store/createStore';
const history = createHistory();

const store = createStore();
const test = () => {
    console.log(100)
    alert(100)
    console.log(1);
    
}
test();
render(
    <Provider store={store}>
        <RouterMap history={history}></RouterMap>
    </Provider>,
    document.getElementById('root')
)