import React, { useReducer } from 'react'
import ProductContext from './productContext';
import ProductReducer from './productReducer';
import { ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT, SET_CURRENT, CLEAR_CURRENT } from './types';

const ProductState = (props) => {
    const initialState = {
        items: [
            {
                name: "Apples",
                category: "Fruits",
                pieces: 0,
                weight: 30,
                id: 1
            },
            {
                name: "Cola",
                category: "Drinks",
                pieces: 3,
                weight: 0,
                id: 2
            },
            {
                name: "Lollypops",
                category: "Candies",
                pieces: 5,
                weight: 0,
                id: 3
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

    const updateProduct = (item) => {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: item
        })
    }

    const removeProduct = (id) => {
        dispatch({
            type: REMOVE_PRODUCT,
            payload: id
        })
    }

    const setCurrent = product => {
        dispatch({
            type: SET_CURRENT,
            payload: product
        });
    };

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };

    return (
        <ProductContext.Provider
            value={{
                items: state.items,
                currentItem: state.currentItem,
                addProduct,
                updateProduct,
                removeProduct,
                setCurrent,
                clearCurrent
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductState
