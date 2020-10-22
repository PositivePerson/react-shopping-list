import React, { Component } from 'react';
import List, { ListItem, ListItemText, ListItemMeta } from '@material/react-list';

class Products extends Component {
    state = {
        selectedIndex: 1,
    };


    render() {
        const items = [];

        for (let i = 0; i < 5; i++) {
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
                    handleSelect={(selectedIndex) => this.setState({ selectedIndex })} key={i}
                >
                    <ListItem>
                        <ListItemText primaryText="Smoothie " />
                        <ListItemMeta meta="2 szt" />
                    </ListItem>
                </List>
            )
        }

        return (
            <div>
                {items}
            </div>
        )
    }
}

export default Products
