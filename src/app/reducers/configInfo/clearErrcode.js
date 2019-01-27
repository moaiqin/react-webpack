import clearErrType from '../../actions/clearErr';

export default (state = {
    errcode: 0,
    errmsg: '',
    errinfo: {}
}, action) => {
    if(action.type === clearErrType){
        return {
            errcode: 0,
            errmsg: ''
        }
    }
    const {errcode, errmsg, errinfo} = action;
    const err = Object.assign({},state,{
        errcode,
        errmsg,
        errinfo
    });
    return err;
}