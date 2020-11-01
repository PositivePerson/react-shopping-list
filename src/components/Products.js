import React, { Component, Fragment } from 'react';
import List, { ListItem, ListItemText, ListItemMeta } from '@material/react-list';

const items = [];
const products = [
    {
        name: "Carrots",
        category: "vegetables",
        pieces: "",
        weight: "12"
    },
    {
        name: "Mirinda",
        category: "Drink",
        pieces: "1",
        weight: ""
    }
]
const displayedProducts = [];

export function incList(product) {
    // console.log(product.category)
    items.push(
        <List
            singleSelection
        // selectedIndex={this.state.selectedIndex}
        // handleSelect={(selectedIndex) => this.setState({ selectedIndex })} key={i}
        >
            <ListItem>
                <ListItemText primaryText={product.name} />
                <ListItemMeta meta={product.weight ? product.weight + " deg" : product.pieces + " pcs"} />
            </ListItem>
        </List>
    )
}

class Products extends Component {
    state = {
        selectedIndex: 1,
    };


    render() {
        console.log("displayedProducts: ", displayedProducts);

        // Reduces recaps
        products.filter(product => {
            displayedProducts.map(displayed => displayed !== product);
        })

        console.log("products: ", products);
        console.log("displayedProducts: ", displayedProducts);

        // Add new items to main array of items
        // products.map(product => {
        //     displayedProducts.push(product);
        // })

        console.log("displayedProducts: ", displayedProducts);

        displayedProducts.forEach((product, i) => {
            // for (let i = 0; i < 5; i++) {
            items.push(
                // <ul className="mdc-list " id="drinks" key={i}>
                //     <h5>Napoje</h5>
                //     <li className="mdc-list-item">
                //         <span className="mdc-list-item__ripple"></span>
                //         <span className="mdc-list-item__text">Smoothie</span>
                //         <span aria-hidden="true" className="mdc-list-item__meta">2 szt</span>
                //     </li>
                // </ul>

                <List
                    singleSelection
                    selectedIndex={this.state.selectedIndex}
                    handleSelect={(selectedIndex) => this.setState({ selectedIndex })}
                    key={i}
                >
                    <ListItem>
                        <ListItemText primaryText={product.name} />
                        <ListItemMeta meta={product.weight ? product.weight + " deg" : product.pieces + " pcs"} />
                    </ListItem>
                </List>
            )

        })

        return (
            <Fragment>
                {items}
            </Fragment>
        )
    }
}

export default Products;
