import React, { useState, useEffect, useRef } from 'react';
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

import $ from "jquery";


// import { pushItem } from "../handlerFunctions";

const Modal = ({ modal, setModal }) => {
    const [choosenOption, setChoosenOption] = useState("vegetables");
    const [selectedProduct, setSelectedProduct] = useState("vegetables");

    const [pieces, setPieces] = useState('');
    const [weight, setWeight] = useState('');

    const [piecesDisabled, setPiecesDisabled] = useState(false);
    const [weightDisabled, setWeightDisabled] = useState(false);

    const productsList = ['vegetables', 'fruits', 'dairy', 'baked', 'drinks', 'hygiene', 'other'];

    // useEffect(() => {
    //     manageInputsEnable();
    // }, Pieces.current)

    const manageInputsEnable = (e) => {
        let value = e.target.value;
        if (value === "0") value = "";
        if (e.target.id === "form3") {
            setPieces(value);
            value.length ? setWeightDisabled(true) : setWeightDisabled(false);
        }
        if (e.target.id === "form31") {
            setWeight(value);
            value.length ? setPiecesDisabled(true) : setPiecesDisabled(false);
        }
    }

    return (
        <React.Fragment>
            {/* <MDBContainer>
                Hi the its container
        </MDBContainer> */}

            {/* Modal code below: */}
            <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
                {/* <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => setModal(!modal)}
                >
                    Add new event
          </MDBModalHeader> */}
                <MDBModalBody className=" mb-1">
                    <div className="md-form form-sm w-50">
                        {/* <input
                            type="text"
                            id="form2"
                            className="form-control form-control"
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="form2">Produkt</label> */}
                        <MDBInput label="Produkt"
                            name="numberOfItems"
                            autoComplete="off"
                            type="text"
                            id="form2"
                            required />
                    </div>

                    <div className=" d-flex justify-content-between align-items-center">
                        {/* <span className="md-form">
                            <input
                                type="number"
                                id="form3"
                                className="form-control"
                                autoComplete="off"
                                defaultValue=""
                                name="numberOfItems"
                                required
                            />
                            <label htmlFor="form3">Sztuki</label>
                        </span> */}
                        <MDBInput label="Sztuki"
                            name="numberOfItems"
                            autoComplete="off"
                            type="number"
                            id="form3"
                            value={pieces}
                            onChange={manageInputsEnable}
                            disabled={piecesDisabled}
                            onkeypress="return event.charCode >= 48" min="0"
                            required />

                        <span className="mx-4 pt-2">lub</span>
                        <MDBInput label="Waga (dekagramy)"
                            name="numberOfItems"
                            autoComplete="off"
                            type="number"
                            id="form31"
                            value={weight}
                            onChange={manageInputsEnable}
                            disabled={weightDisabled}
                            onkeypress="return event.charCode >= 48" min="0"
                            required />
                    </div>

                    {/* <Select className="mdc-select mdc-select--filled demo-width-class"> */}
                    <Select
                        label='Choose Category'
                        value={choosenOption}
                        onChange={(evt) => setChoosenOption(evt.target.value)}
                    >
                        {/* <Option value='pomsky'></Option>
                        <Option value='pomsky'>Pomsky</Option>
                        <Option value='goldenDoodle'>Golden Doodle</Option> */}
                        {/* <div className="mdc-select__anchor">
                            <span className="mdc-select__ripple"></span>
                            <span className="mdc-select__selected-text"></span>
                            <span className="mdc-select__dropdown-icon">

                            </span>
                            <span className="mdc-floating-label">Kategoria</span>
                            <span className="mdc-line-ripple"></span>
                        </div> */}

                        {/* <div
                            className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth"
                        > */}

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
                                setModal(!modal);
                                console.log(pieces);
                            }}
                            id="dodaj">
                            Approve
                        </button>
                        {/* <button className="btn btn-info" >
                            DODAJ
                                        </button> */}
                        <button
                            type="button"
                            className="btn btn-info mt-1 mt-md-3"
                            data-toggle="modal"
                            data-target="#basicExampleModal"
                            onClick={() => setModal(!modal)}
                            style={{ display: "none" }} id="aktualizuj">
                            Approve Edition
                        </button>
                        {/* <button className="btn btn-info">
                            EDYTUJ
                                        </button> */}
                    </div>


                </MDBModalBody>

            </MDBModal>
        </React.Fragment>
    )
}

export default Modal
