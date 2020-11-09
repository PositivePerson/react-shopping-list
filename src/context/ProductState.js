import React, { useReducer } from 'react'
import ProductContext from './productContext';
import ProductReducer from './productReducer';
import { ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT } from './types';

const ProductState = (props) => {
    const initialState = {
        items: [
            {
                name: "Apples",
                category: "fruits",
                pieces: "",
                weight: "30",
                id: 1
            },
            {
                name: "Cola",
                category: "Drink",
                pieces: "3",
                weight: "",
                id: 2
            }
        ],
        currentItem: {}
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const addProduct = (item) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: item
        })
    }

    const editProduct = (item) => {
        dispatch({
            type: EDIT_PRODUCT,
            payload: item
        })
    }

    const removeProduct = (id) => {
        dispatch({
            type: REMOVE_PRODUCT,
            payload: id
        })
    }

    return (
        <ProductContext.Provider
            value={{
                items: state.items,
                currentItem: state.currentItem,
                addProduct,
                editProduct,
                removeProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductState
