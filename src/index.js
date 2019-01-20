import React from 'react';
import {render} from 'react-dom';
import RouterMap from './app/routers/routerMap';
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import createStore from './app/store/createStore';
import './index.less';
const history = createHistory();

const store = createStore();

render(
    <Provider store={store}>
        <RouterMap history={history}></RouterMap>
    </Provider>,
    document.getElementById('root')
)