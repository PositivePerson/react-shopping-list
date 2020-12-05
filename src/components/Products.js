
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

let doneIds = [];
doneIds[0] = "0";

const Products = ({
    globalPiecesCounter,
    globalWeightCounter,
    globalPieces,
    globalWeight,
    globalNumOfItems,
    globalNumOfItemsCounter,
    setModal,
    setEditing
}) => {
    const productContext = useContext(ProductContext);

    const [firstRender, setFirstRenderVar] = useState(true);

    let times = 0;

    useEffect(() => {
        console.log("useEffect: ", times++);
        if (firstRender) {
            globalNumOfItemsCounter(productContext.items.length);

            console.log(productContext.items);

            let pieces = 0;
            let weight = 0;
            productContext.items.forEach((item) => {
                globalPiecesCounter(pieces += (item.pieces ? parseInt(item.pieces) : 0));
                globalWeightCounter(weight += (item.weight ? parseInt(item.weight) : 0));
            });
            globalPiecesCounter(pieces);
            globalWeightCounter(weight);

            setFirstRenderVar(false);
        }

        let timeoutId;
        $(".MuiListItem-root").on("dblclick", (target) => {
            globalNumOfItemsCounter(productContext.items.length - 1);
            productContext.removeProduct(target.currentTarget.id);

            const targetInContext = productContext.items.filter(item => item.id === parseInt(target.currentTarget.id))[0];
            globalPiecesCounter(globalPieces - targetInContext.pieces);
            globalWeightCounter(globalWeight - targetInContext.weight);
        });
        // $(".MuiListItem-root").on('mousedown', (target) => {
        //     timeoutId = setTimeout(() => {
        //         console.log("click and hold work")
        //     }, 500);
        // }).on('mouseup mouseleave', () => {
        //     clearTimeout(timeoutId);
        // });


        [...document.querySelectorAll(".MuiListItem-root")].map((elem) => {
            let done = false;
            // elem.addEventListener("mousedown", () => {
            //     timeoutId = setTimeout(() => {
            //         done = true;
            //         console.log("click and hold work")
            //     }, 500);
            // });
            // if (done) elem.addEventListener('mouseup', () => { // -DOESNT WORK
            //     console.log("mouse up");
            //     clearTimeout(timeoutId);
            // });

            function onMouseDown(target) {
                timeoutId = setTimeout(() => {
                    done = true;
                    console.log("click and hold work", target.id);
                    productContext.setCurrent(productContext.items.find(item => item.id === parseInt(target.id)));
                    setEditing(true);
                    setModal(true);
                }, 1000);
            }

            function onMouseUp() { // -DOESNT WORK
                console.log("mouse up");
                clearTimeout(timeoutId);
            }

            if (!doneIds[elem.id]) {
                elem.addEvent("mousedown", () => onMouseDown(elem));
                // if (done) 
                elem.addEvent('mouseup', onMouseUp);
                doneIds.push(elem.id);
            }
            console.log("array is: ", doneIds);

            //         product
            // .on('mousedown', function () {
            //   timeoutId = setTimeout(() => {
            //     $('.modal').modal('show');
            //     edit($(this));
            //   }, 1000);
            // })
            // .on('mouseup mouseleave', () => {
            //   clearTimeout(timeoutId);
            // });

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
