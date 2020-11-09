
import React, { useContext } from 'react';
import ProductContext from '../context/productContext'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const localIitems = [
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
    localIitems.push(product);
}

const Products = () => {
    const productContext = useContext(ProductContext);

    return (
        <List component="nav" style={root} aria-label="products">
            {/* {localIitems.map((item) => ( */}
            {        console.log(productContext.items)
            }            {productContext.items.map((item) => (
                <ListItem style={itemStyle} button key={item.id}>
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
}

const itemStyle = {
    backgroundColor: "whitesmoke",
}

export default Products;
