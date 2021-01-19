import React, { useState, useEffect } from 'react';
import { MDBModal, MDBModalBody, MDBContainer, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import '../App.css';
import $ from 'jquery';

import Products from './Products';
import Modal from './Modal';

import ProductState from '../context/ProductState';

function App() {
	const [ modal, setModal ] = useState(false);

	const [ globalNumOfItems, globalNumOfItemsCounter ] = useState(0);
	const [ globalPieces, globalPiecesCounter ] = useState(0);
	const [ globalWeight, globalWeightCounter ] = useState(0);

	const [ editing, setEditing ] = useState(false);

	function countItems() {
		const numberOfLis = $('ul li');
		const numberOfMenuLis = $('ul#choosedCategory li');
		// globalNumOfItemsCounter(numberOfLis.length - numberOfMenuLis.length);
	}

	function addItem() {
		if (editing) setEditing(!editing);
	}

	useEffect(
		() => {
			setModal(!modal);
		},
		[ editing ]
	);

	//   let timeoutId = 0;
	// function allowEdit(product) {
	//   product
	//     .on('mousedown', function () {
	//       timeoutId = setTimeout(() => {
	//         $('.modal').modal('show');
	//         edit($(this));
	//       }, 1000);
	//     })
	//     .on('mouseup mouseleave', () => {
	//       clearTimeout(timeoutId);
	//     });
	// }

	return (
		<ProductState>
			<div className='App'>
				<div
					className='container-fluid d-flex flex-column justify-content-between align-items-center py-2 py-md-5'
					style={{ minHeight: '100vh' }}
				>
					<div id='titleBox'>
						<p id='title'>LISTA ZAKUPÓW</p>
					</div>

					<Products
						globalWeightCounter={globalWeightCounter}
						globalWeight={globalWeight}
						globalPiecesCounter={globalPiecesCounter}
						globalPieces={globalPieces}
						globalNumOfItems={globalNumOfItems}
						globalNumOfItemsCounter={globalNumOfItemsCounter}
						setModal={setModal}
						setEditing={setEditing}
					/>

					<div className='summed'>
						<span className='float-left'>
							Products: <span id='produkty'>{globalNumOfItems}</span>
						</span>
						<span className='float-right'>
							<span id='waga'>{globalWeight}</span> dag
						</span>
						<span className='float-right ml-2 mr-3'>|</span>
						<span className='float-right'>
							<span id='sztuki'>{globalPieces}</span> pcs
						</span>
					</div>

					<button
						type='button'
						className='btn btn-primary mt-1 mt-md-3'
						data-toggle='modal'
						data-target='#basicExampleModal'
						onClick={() => addItem()}
					>
						Add Product
					</button>

					<Modal
						modal={modal}
						setModal={setModal}
						globalWeightCounter={globalWeightCounter}
						globalWeight={globalWeight}
						globalPiecesCounter={globalPiecesCounter}
						globalPieces={globalPieces}
						countItems={countItems}
						globalNumOfItems={globalNumOfItems}
						globalNumOfItemsCounter={globalNumOfItemsCounter}
						editing={editing}
						setEditing={setEditing}
					/>

					<span className='material-icons d-md-none'>touch_app</span>
				</div>
			</div>
		</ProductState>
	);
}

export default App;
