import { ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT, SET_CURRENT, CLEAR_CURRENT } from './types';

export default (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            // console.log("id: ", action.payload.id)
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case REMOVE_PRODUCT:
            // console.log(action.payload)
            return {
                ...state,
                items: state.items.filter(
                    item => item.id !== parseInt(action.payload)
                    // item => item.id !== action.payload
                )
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
                loading: false
            };
        case SET_CURRENT:
            console.log("SET CURRENT GOT: ", action.payload);
            return {
                ...state,
                currentItem: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                currentItem: null
            };
        default:
            return state;
    }
}