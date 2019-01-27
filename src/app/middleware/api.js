import 'whatwg-fetch';
const fetchRequest = ({
    api,
    params,
    method,
    timeout = 4000,
    err
}) => {
    let fetchApi = [window._global.prefixAPI,api].join('');
    const defaultFetch = {
        method,
        headers:{
            "Accept":"application/json",
            "Content-type":"application/json; charset=utf-8"
        },
        cache:"no-store",
        credentials: 'include'
    }
    let _param = {user: window._global.user,userId: window._global.userId}
    Object.assign(_param,defaultFetch);
    if(typeof method === 'string' && method.toLowerCase() === 'get'){
        fetchApi+= '?' + urlStingify(params); 
    }
    let body = undefined;
    if(typeof method === 'string' && method.toLowerCase() === 'post'){
        body = JSON.stringify(params);
    }
    const requestQuery = Object.assign({},defaultFetch,{body});
    return fetchTime(fetchApi,requestQuery,timeout,err)
}

//设置超时请求处理
function timeoutPromise (promise, timeout, errmsg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(errmsg);
        },timeout);
        promise.then(resolve, reject);
    })
}

//对超时的处理
function fetchTime(url,requestQuery,timeout, err) {
    let errInfo = err || {
        errcode:-1,
        errmsg: '网络超时'
    }
    requestQuery = requestQuery || {};
    timeout = timeout || 10000;
    return timeoutPromise(fetch(url,requestQuery),timeout,errInfo);
}


//处理url的数据
function urlStingify(param){
    let url = '';
    if(typeof param === 'object' && param !== null){
       let paramArr = [];
       Object.keys(param).forEach((key) => {
           paramArr.push(key + '=' + param[key]);
       })
       return paramArr.join('&');
    }
    return url;

}

export const CALL = 'ACTION_CONFIG';
export const setActionTypes = (key) => {
    return [`${key}_REQUEST`,`${key}_SUCCESS`,`${key}_FAIL`];
}
export const REQUEST = 0;
export const SUCCESS = 1;
export const FAIL = 2;

//对一些数据进行过滤
const handelStatus = (res) => {
    if(!res){
        return Promise.reject({
            errcode:-1,
            errmsg:'网络异常'
        });
    }
    if(res.ok){
        return {
            ...res
        }
    }
    return Promise.reject({
        errcode: res.status,
        errmsg: res.statusText,
        errinfo: res
    });
}

//对请求数据进行返回
const handelReponse = (res) => {
    const errcode = res.errcode || res.code;
    if(errcode == 0){
        return {...res}
    }
    return Promise.reject({
        errcode: errcode,
        errmsg: res.errmsg,
        errinfo: res
    });
}

const storeApplyMiddleware = (store) => next => action =>{
    const callAction = action[CALL];
    if(callAction === undefined) {
        next(action);
        return;
    }
    const { showLoading,api,method='post',params,timeout, types,err} = callAction;
    if(!Array.isArray(types) || (Array.isArray(types) && types.length !== 3)) {
        throw Error('action types errcode');
    }
    const [requestType, successType, failType] = types;
    const actionObj = {
        type: requestType
    };
    if( showLoading ){
        actionObj.showLoading = showLoading;
        next(actionObj);
    }

    fetchRequest({
        api,
        params,
        method,
        timeout,
        err
    }).then(handelStatus).then(handelReponse).then((response) => {
        let newStatus = {
            type:successType,
            showLoading:0,
            response
        }
        const concatAction = Object.assign({},action,newStatus);
        delete action[CALL];
        next(concatAction);
        return {
            errcode: 0,
            errmsg: '',
            data: response.data
        }
    }, ({errcode, errmsg, errinfo}) => {
        const actionObj = {
            type: failType,
            errinfo:errinfo||"",
            errmsg: errmsg  || '网络异常，请稍后重试',
            errcode: errcode || -1,
            showLoading: 0,
          }
        next(actionObj);
        const errObj = {
            errcode,
            errmsg
        }
        return errObj;
    });
}

export default storeApplyMiddleware;