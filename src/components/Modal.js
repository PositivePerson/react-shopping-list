import React, { useState } from 'react';
import List, { ListItem, ListItemText } from '@material/react-list';
import Select, { Option } from '@material/react-select';
import {
    MDBModal,
    MDBModalBody,
    MDBContainer,
    MDBModalHeader,
    MDBModalFooter
} from "mdbreact";

// import { pushItem } from "../handlerFunctions";

const Modal = ({ modal, setModal }) => {
    const [choosenOption, setChoosenOption] = useState("vegetables");
    const [selectedProduct, setSelectedProduct] = useState("vegetables");

    const productsList = ['vegetables', 'fruits', 'dairy', 'baked', 'drinks', 'hygiene', 'other'];

    return (
        <React.Fragment>
            <MDBContainer>
                Hi the its container
        </MDBContainer>

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
                        <input
                            type="text"
                            id="form2"
                            className="form-control form-control"
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="form2">Produkt</label>
                    </div>

                    <div className=" d-flex justify-content-between align-items-center">
                        <span className="md-form">
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
                        </span>

                        <span className="mx-4 pt-2">lub</span>

                        <span className="md-form">
                            <input
                                type="number"
                                id="form31"
                                className="form-control"
                                autoComplete="off"
                                defaultValue=""
                                name="weight"
                                required
                            />
                            <label htmlFor="form31">Waga (dekagramy)</label>
                        </span>
                    </div>

                    {/* <Select className="mdc-select mdc-select--filled demo-width-class"> */}
                    <Select
                        label='Choose Dog'
                        value={choosenOption}
                        onChange={(evt) => setChoosenOption({ value: evt.target.value })}
                    >
                        <Option value='pomsky'></Option>
                        <Option value='pomsky'>Pomsky</Option>
                        <Option value='goldenDoodle'>Golden Doodle</Option>
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
                        <List id="choosedCategory">

                            {
                                productsList.map((product, index) => {
                                    return (
                                        <Option value={product}>
                                            <ListItem
                                                className="text-center"
                                                key={index}
                                                checked={selectedProduct === product}
                                                value={product}
                                                id={''}
                                                onChange={''}
                                                data-value={product}
                                            >
                                                <ListItemText primaryText={product.charAt(0).toUpperCase() + product.slice(1)} />
                                            </ListItem>
                                        </Option>
                                    )
                                })
                            }

                        </List>
                        {/* </div> */}
                    </Select>

                    <div className="text-center mt-4">
                        <button className="btn btn-info" id="dodaj">
                            DODAJ
                                        </button>
                        <button className="btn btn-info" style={{ display: "none" }} id="aktualizuj">
                            EDYTUJ
                                        </button>
                    </div>


                </MDBModalBody>
            </MDBModal>
        </React.Fragment>
    )
}

export default Modal
