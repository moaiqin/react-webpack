const storeApplyMiddleware = (store) => next => action =>{
    console.log(action);
    return new Promise((resolve, reject) => {
        next(action);
        resolve({
            errcode:0,
            errmsg:'调用成功'
        })
    })
}

export default storeApplyMiddleware;