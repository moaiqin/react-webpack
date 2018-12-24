export const test2 = (params,showLoading) => (dispatch, getState) => {
    return dispatch({
        type:'TEST',
        data:{
            ...params,
            showLoading,
            ai:'lianyanqin'
        }
    })
}