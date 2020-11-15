import React, { useState, useEffect, useRef, useContext } from 'react';
import ProductContext from '../context/productContext'
import List, { ListItem, ListItemText } from '@material/react-list';
import Select, { Option } from '@material/react-select';
import {
    MDBInput,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBContainer,
    MDBModalHeader,
    MDBModalFooter
} from "mdbreact";

import { incList } from "./Products";

import $ from "jquery";

const Modal = ({
    modal,
    setModal,
    globalPiecesCounter,
    globalWeightCounter,
    globalPieces,
    globalWeight,
    countItems,
    globalNumOfItems,
    globalNumOfItemsCounter,
    editing,
    setEditing
}) => {
    const productContext = useContext(ProductContext);

    const [choosenOption, setChoosenOption] = useState("vegetables");

    const productNameRef = useRef();

    const [productName, setProductName] = useState('');
    const [pieces, setPieces] = useState('');
    const [weight, setWeight] = useState('');

    const [piecesDisabled, setPiecesDisabled] = useState(false);
    const [weightDisabled, setWeightDisabled] = useState(false);

    const productsList = ['vegetables', 'fruits', 'dairy', 'baked', 'drinks', 'hygiene', 'other'];

    useEffect(() => {
        if (editing) {
            console.log(productContext.currentItem);
        }
    }, [editing]);

    const addItem = e => {
        setProductName(productNameRef.current.state.innerValue);
        // incList({
        //     name: productNameRef.current.state.innerValue,
        //     category: choosenOption,
        //     pieces,
        //     weight,
        //     id: globalNumOfItems + 1,
        // });
        productContext.addProduct({
            name: productNameRef.current.state.innerValue,
            category: choosenOption,
            pieces,
            weight,
            id: globalNumOfItems + 1,
        });
        pieces ? globalPiecesCounter(globalPieces + parseInt(pieces)) : globalWeightCounter(globalWeight + parseInt(weight));
        globalNumOfItemsCounter(globalNumOfItems + 1);
        setModal(!modal);
    }

    const manageInputsEnable = (e) => {
        let value = e.target.value;
        if (value === "0") value = "";
        if (e.target.id === "piecesForm") {
            setPieces(value);
            value.length ? setWeightDisabled(true) : setWeightDisabled(false);
        }
        if (e.target.id === "weightForm") {
            setWeight(value);
            value.length ? setPiecesDisabled(true) : setPiecesDisabled(false);
        }
    }

    return (
        <React.Fragment>

            <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
                <MDBModalBody className=" mb-1">
                    <div className="md-form form-sm w-50">

                        <MDBInput label="Produkt"
                            name="productName"
                            autoComplete="off"
                            type="text"
                            id="form2"
                            ref={productNameRef}
                            required />
                    </div>

                    <div className=" d-flex justify-content-between align-items-center">

                        <MDBInput label="Pieces"
                            name="pieces"
                            autoComplete="off"
                            type="number"
                            id="piecesForm"
                            value={pieces}
                            onChange={manageInputsEnable}
                            disabled={piecesDisabled}
                            onKeyPress={(event) => event.charCode >= 48} min="0"
                            required />

                        <span className="mx-4 pt-2">lub</span>
                        <MDBInput label="Weight (decagrams)"
                            name="pieces"
                            autoComplete="off"
                            type="number"
                            id="weightForm"
                            value={weight}
                            onChange={manageInputsEnable}
                            disabled={weightDisabled}
                            onKeyPress={(event) => event.charCode >= 48} min="0"
                            required />
                    </div>

                    <Select
                        label="Category"
                        value={choosenOption}
                        onChange={(evt) => setChoosenOption(evt.target.value)}
                    >
                        {
                            productsList.map((product, index) => {
                                return (
                                    <Option value={product}
                                        className="text-center"
                                        key={index}
                                        checked={choosenOption === product}

                                        onEnhancedChange={() => setChoosenOption(product)}
                                    >
                                        {product.charAt(0).toUpperCase() + product.slice(1)}
                                    </Option>
                                )
                            })
                        }
                    </Select>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-info mt-1 mt-md-3"
                            data-toggle="modal"
                            data-target="#basicExampleModal"
                            onClick={() => {
                                addItem();
                            }}
                            id="dodaj">
                            Approve
                        </button>

                        <button
                            type="button"
                            className="btn btn-info mt-1 mt-md-3"
                            data-toggle="modal"
                            data-target="#basicExampleModal"
                            onClick={() => setModal(!modal)}
                            style={{ display: "none" }} id="aktualizuj">
                            Approve Edition
                        </button>
                    </div>
                </MDBModalBody>
            </MDBModal>
        </React.Fragment>
    )
}

export default Modal
