import {setActionTypes, CALL} from '../../app/middleware/api';
export const testTypes = setActionTypes('TEST');

export const test = (params,showLoading) => (dispatch, getState) => {
    return dispatch({
        [CALL]:{
            types:testTypes,
            ...params,
            showLoading,
            api:'moshaobu/user/login'
        }
    })
}