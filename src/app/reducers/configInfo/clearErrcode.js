import clearErrType from '../../actions/clearErr';

export default (state = {
    errcode: 0,
    errmsg: ''
}, action) => {
    if(action.type === clearErrType){
        return {
            errcode: 0,
            errmsg: ''
        }
    }
    const {errcode, errmsg} = action;
    const errState = {
        ...state,
    }
    errcode && (errState.errcode = errcode);
    errmsg && (errState.errmsg = errmsg);
    return errState;
}