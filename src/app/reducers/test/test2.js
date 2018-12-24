const test2 = (state = {
    school:'whkjdaxue',
    name:'huangyuanyuan'
},action) => {
    switch(action.type){
        case 'TEST2':
            return {
                ...state,
                ...action.data
            }
        break;
        default: 
            return {
                ...state
            }
    }
}

export default test2;