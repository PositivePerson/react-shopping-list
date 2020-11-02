
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const items = [
    {
        name: "Carrots",
        category: "vegetables",
        pieces: "",
        weight: "12",
        id: 1
    },
    {
        name: "Mirinda",
        category: "Drink",
        pieces: "1",
        weight: "",
        id: 2
    }
];

export function incList(product) {
    items.push(product);
}

const Products = () => {
    return (
        <List component="nav" style={root} aria-label="products">
            {items.map((item) => (
                <ListItem button key={item.id}>
                    <ListItemText primary={item.name} />
                    <ListItemText className="text-right" edge="end" secondary={item.weight ? item.weight + " deg" : item.pieces + " pcs"} />
                </ListItem>

            ))}
        </List>
    );
}

const root = {
    width: '70%',
    maxWidth: "360",
    backgroundColor: "whitesmoke",
}

export default Products;
