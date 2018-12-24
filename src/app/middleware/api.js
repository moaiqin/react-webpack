const storeApplyMiddleware = (store) => next => action =>{
    console.log(action,'action')
    return new Promise((resolve, reject) => {
        next(action)
        setTimeout(() => {
            action.showLoading = false;
            next(action)
        },2000)
        setTimeout(() => {
            const err = Object.assign(action,{
                errcode:10086,
                errmsg:'页面出错了'
            })
            next(err)
            reject(err)
        },3000)
    })
}

export default storeApplyMiddleware;