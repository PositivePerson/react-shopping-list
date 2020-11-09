import { ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT } from './types';

export default (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        default:
            return state;
    }
}