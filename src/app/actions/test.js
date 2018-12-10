export const test = (params,showLoading) => {
    console.log(params)
    return {
        type:'TEST',
        data:{
            errmsg:'出错了',
            errcode:110,
            ...params
        }
    }    
}