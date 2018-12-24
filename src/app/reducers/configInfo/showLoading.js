export default (state = 0, action) =>{
    if(action.showLoading === undefined){
        return state;
    }else{
        return action.showLoading
    }
}