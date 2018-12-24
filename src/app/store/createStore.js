import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import reducers from '../reducers/index';
import storeApplyMiddleware from '../middleware/api';
import thunk from 'redux-thunk';
const createStoreFn = () => {
    return createStore(
        combineReducers(reducers),
        compose(applyMiddleware(thunk,storeApplyMiddleware),window.devToolsExtension? window.devToolsExtension():undefined)
    )
}

export default createStoreFn;
