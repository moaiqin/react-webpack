import {createStore, combineReducers,applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import storeApplyMiddleware from '../middleware/api';
import thunk from 'redux-thunk';
const createStoreFn = (initialState) => {
    return createStore(combineReducers({
            ...reducers
        }),
        window.devToolsExtension ? window.devToolsExtension():undefined,
        applyMiddleware(thunk,storeApplyMiddleware)
    )
}
export default createStoreFn;