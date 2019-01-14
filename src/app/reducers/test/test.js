
const TestReducer = (state = {
    name:'莫绍补',
    age:23
}, action) => {
    switch(action.type){
        case 'TEST':
            return {
                ...state,
                ...action.data
            }
        default:
            return {
                ...state
            }
    }
}
export default TestReducer;