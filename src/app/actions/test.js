export const test = (params,showLoading) => (dispatch, getState) => {
    return dispatch({
        type:'TEST',
        ...params,
        showLoading,
        ai:'lianyanqin'
    })
}