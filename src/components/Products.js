
import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../context/productContext'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import $ from "jquery";

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

const Products = ({
    globalPiecesCounter,
    globalWeightCounter,
    globalPieces,
    globalWeight,
    globalNumOfItems,
    globalNumOfItemsCounter
}) => {
    const productContext = useContext(ProductContext);

    const [firstRender, setFirstRenderVar] = useState(true);

    useEffect(() => {
        if (firstRender) {
            globalNumOfItemsCounter(productContext.items.length);

            console.log(productContext.items);

            let pieces = 0;
            let weight = 0;
            productContext.items.forEach((item) => {
                globalPiecesCounter(pieces += (item.pieces ? parseInt(item.pieces) : 0));
                globalWeightCounter(weight += (item.weight ? parseInt(item.weight) : 0));
            })

            globalPiecesCounter(pieces);
            globalWeightCounter(weight);

            setFirstRenderVar(false);
        }

        $(".MuiListItem-root").on("dblclick", (target) => {
            globalNumOfItemsCounter(productContext.items.length - 1);
            productContext.removeProduct(target.currentTarget.id);

            const targetInContext = productContext.items.filter(item => item.id === parseInt(target.currentTarget.id))[0];
            globalPiecesCounter(globalPieces - targetInContext.pieces);
            globalWeightCounter(globalWeight - targetInContext.weight);
        })
    }, [firstRender, globalNumOfItemsCounter, productContext])

    return (
        <List component="nav" style={root} aria-label="products">
            {/* {localIitems.map((item) => ( */}
            {productContext.items.map((item) => (
                <ListItem style={itemStyle} button key={item.id} id={item.id}>
                    <ListItemText primary={item.name} />
                    <ListItemText className="text-right" edge="end" secondary={item.weight ? item.weight + " dag" : item.pieces + " pcs"} />
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
