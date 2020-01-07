import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Container, Input, Form, Label } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import Loading from '../loading';
import InventoryItem from '../inventory-item';
import {BINS, PRODUCTS, INVENTORYS, SUBMIT_INVENTORY } from '../../queries/queries';

import './inventory.scss';

export const Inventory = () => {
    const [productId, setProductId ] = useState();
    const [binId, setBinId] = useState();
    const [quantity, setQuantity] = useState();
    const [name, setName] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [submitNewInventory] = useMutation(SUBMIT_INVENTORY);
    const { addToast } = useToasts();
    const { loading, error, data: inventories } = useQuery(INVENTORYS);
    const { data: bins, loading: l1, error: e1 } = useQuery(BINS);
    const { data: products, loading: l2, error: e2, } = useQuery(PRODUCTS);
   

    const createInventory = () => {
        let rows = []
        inventories.Inventory.forEach((inventory, index) => {
           rows.push(`${inventory.product_id}${inventory.bin_id}`)
        })
        const newInventory = `${productId}${binId}`;
        if(rows.indexOf(newInventory) === -1) {
            setErrorMessage(null);
            submitNewInventory({
                variables: {productId, binId, quantity, name},
                refetchQueries: [
                    { query: INVENTORYS }
                ]
            }).then(result => {
                addToast("Inventory Added", { appearance: 'success' })
            }).catch(function(error) {
                addToast(error, { appearance: 'error' })
            });
        }
        else {
            setErrorMessage("Product Inventory already exists!")
        }

       
        
    }
    
    const setProduct = (e) => {
        setProductId(e.target.value);
    }

    const setBin = (e) => {
        setBinId(e.target.value);
    }

    const setQty = (e) => {
        setQuantity(e.target.value);
    }
    const setInventoryName = (e) => {
        setName(e.target.value);
    }


    if (loading) return <Loading />;
    if (error) return addToast(error, { appearance: 'error' });
    if (l1) return <Loading />;
    if (e1) return addToast(error, { appearance: 'error' });
    if (l2) return <Loading />;
    if (e2) return addToast(error, { appearance: 'error' });

    return (
        <Container className="bin-container">
        <h4>Please enter product name, select product, bin,<br />and enter quantity to create inventory record.</h4>
        
        <Form className="grid">
                <Form.Field>
                    <Label className="metadata">Name<Input type="text" onChange={setInventoryName}/></Label>
                </Form.Field>
                <Form.Field>
                    <Label><p>Products</p>  
                    <select onChange={setProduct} className="ui dropdown">
                        <option>Choose product</option>
                        {                            
                            products.Product.map((product, i) => {
                               return <option value={product.id}>{product.product_name}</option>
                            })
                        }
                    </select>
                    </Label>
                </Form.Field>
                <Form.Field>
                    <Label><p>Bin</p>  
                    <select onChange={setBin} className="ui dropdown">
                        <option>Choose bin</option>
                        {
                            bins.Bin.map((bin, i) => {
                               return <option value={bin.id}>{bin.bin_name}</option>
                            })
                        }
                    </select>
                    </Label>
                </Form.Field>
                <Form.Field>
                    <Label className="metadata">Quantity<Input type="text" onChange={setQty}/></Label>
                </Form.Field>
                <Form.Field>
                    { name && productId && binId && quantity && <Button icon="add" content="Add Inventory" onClick={createInventory} />}
                </Form.Field>
                { errorMessage && <p className="red">{errorMessage}</p>}
            </Form>
            
            <h3>Inventory</h3>
            <div className="ui">
            <table cellPadding="10">
                <tbody>
                <tr><td><strong>Name</strong></td><td><strong>Product Id</strong></td><td><strong>Bin Id</strong></td><td><strong>Quantity</strong></td><td></td></tr>
                    {
                    inventories.Inventory && 
                    inventories.Inventory.map((inventory) => {
                        return <InventoryItem key={inventory.id} inventory={inventory} />
                    })
                    
                    }
            </tbody>
            </table>
        </div>
        </Container>
    )
}