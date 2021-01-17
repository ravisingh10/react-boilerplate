import actions from './actions';

const initialState = {
    user: undefined
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.USER:
            
            return {
                ...state,
                user: action.user
            }

        default: return { ...state };
    }
}
export default reducer;