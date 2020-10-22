import React, { useState } from 'react';
import {
  MDBModal,
  MDBModalBody,
  MDBContainer,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact"; import '../App.css';
import $ from "jquery";

import Products from './Products';
import Modal from './Modal';


function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <div className="d-flex flex-column justify-content-between align-items-center py-2 py-md-5" style={{ minHeight: "100vh" }}>
          <div id="titleBox">
            <p id="title">LISTA ZAKUPÓW</p>
          </div>


          <Products />

          <div className="summed">
            <span>Produkty: <span id="produkty">4</span></span>
            <span className="float-right"><span id="waga">500</span> dag</span>
            <span className="float-right ml-2 mr-3">|</span>
            <span className="float-right"><span id="sztuki">5</span> szt</span>
          </div>

          <button
            type="button"
            className="btn btn-primary mt-1 mt-md-3"
            data-toggle="modal"
            data-target="#basicExampleModal"
            onClick={() => setModal(!modal)}
          >
            Dodaj produkt
        </button>

          <Modal modal={modal} setModal={setModal} />

          {/* Modal */}
          <MDBContainer
            className="modal fade"
            id="basicExampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="tab-pane fade in show active" id="panel17" role="tabpanel">
                  {/* Body */}
                  <div className="modal-body mb-1">
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

                    <div className="md-form form-sm d-flex justify-content-between align-items-center">
                      <span className="">
                        <input
                          type="number"
                          id="form3"
                          className="form-control form-control"
                          autoComplete="off"
                          defaultValue=""
                          name="numberOfItems"
                          required
                        />
                        <label htmlFor="form3">Sztuki</label>
                      </span>

                      <span className="mx-4 pt-2">lub</span>

                      <span className="">
                        <input
                          type="number"
                          id="form31"
                          className="form-control form-control"
                          autoComplete="off"
                          defaultValue=""
                          name="weight"
                          required
                        />
                        <label htmlFor="form31">Waga (dekagramy)</label>
                      </span>
                    </div>

                    <div className="mdc-select mdc-select--filled demo-width-class">
                      <div className="mdc-select__anchor">
                        <span className="mdc-select__ripple"></span>
                        <span className="mdc-select__selected-text"></span>
                        <span className="mdc-select__dropdown-icon">
                          <svg className="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
                            <polygon
                              className="mdc-select__dropdown-icon-inactive"
                              stroke="none"
                              fillRule="evenodd"
                              points="7 10 12 15 17 10"
                            ></polygon>
                            <polygon
                              className="mdc-select__dropdown-icon-active"
                              stroke="none"
                              fillRule="evenodd"
                              points="7 15 12 10 17 15"
                            ></polygon>
                          </svg>
                        </span>
                        <span className="mdc-floating-label">Kategoria</span>
                        <span className="mdc-line-ripple"></span>
                      </div>

                      <div
                        className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth"
                      >
                        <ul className="mdc-list" id="choosedCategory">
                          {/* <li
                            className="mdc-list-item mdc-list-item--selected"
                            data-value=""
                            aria-selected="true"
                          >
                            <span className="mdc-list-item__ripple"></span>
                            // <span className="mdc-list-item__text">Default</span>
                          </li> */}
                          <li className="mdc-list-item" data-value="vegetables">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Warzywa</span>
                          </li>
                          <li className="mdc-list-item" data-value="fruits">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Owoce</span>
                          </li>
                          <li className="mdc-list-item" data-value="dairy">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Nabiał</span>
                          </li>
                          <li className="mdc-list-item" data-value="baked">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Pieczywo</span>
                          </li>
                          <li className="mdc-list-item" data-value="drinks">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Napoje</span>
                          </li>
                          <li className="mdc-list-item" data-value="hygiene">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Artykuły higieniczne</span>
                          </li>
                          <li className="mdc-list-item" data-value="others">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text">Inne</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <button className="btn btn-info" id="dodaj">
                        DODAJ
                    </button>
                      <button className="btn btn-info" style={{ display: "none" }} id="aktualizuj">
                        EDYTUJ
                    </button>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </MDBContainer>
          {/* End of Modal */}

          <span className="material-icons d-md-none">
            touch_app
            </span>

        </div>
      </div>
    </div >
  );
}

export default App;
