import { ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT } from './types';

export default (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            console.log("id: ", action.payload.id)
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case REMOVE_PRODUCT:
            console.log(action.payload)
            return {
                ...state,
                items: state.items.filter(
                    item => item.id !== parseInt(action.payload)
                )
            }
        default:
            return state;
    }
}