import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Container, Input, Form, Label } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import Loading from '../loading';
import ProductItem from '../product-item';
import {PRODUCTS, SUBMIT_PRODUCT } from '../../queries/queries';

import './product.scss';

export const Product = () => {
    const [name, setName ] = useState();
    const [description, setDescription ] = useState("");
    const [submitNewProduct] = useMutation(SUBMIT_PRODUCT);
    const { addToast } = useToasts();
    const { loading, error, data } = useQuery(PRODUCTS);

    const createProduct = () => {
        submitNewProduct({
            variables: {name, description},
            refetchQueries: [
                { query: PRODUCTS }
            ]
        }).then(result => {
            addToast("Product Added", { appearance: 'success' })
        }).catch(function(error) {
            addToast(error, { appearance: 'error' })
        });
    }

    
    const setProductName = (e) => {
        setName(e.target.value);
    }

    const setProductDescription = (e) => {
        setDescription(e.target.value);
    }
    if (loading) return <Loading />;
    if (error) return addToast(error, { appearance: 'error' });
    return (
        <Container className="product-container">
        <h4>Please enter a product name and description to create new product</h4>
        <Form className="grid">
                <Form.Field>
                    <Label className="metadata">Product Name <Input type="text" onChange={setProductName}/></Label>
                </Form.Field>
                <Form.Field>
                    <Label className="metadata">Product Desciption <Input type="text" onChange={setProductDescription}/></Label>
                </Form.Field>
            </Form>
            <div className="padding">
                <Form>
                    <Form.Field>
                        {(name && description) && <Button icon="add" content="Add Product" onClick={createProduct} />}
                    </Form.Field>
                </Form>
            </div>
            <h3>Products</h3>
            <div className="ui">
            <table cellPadding="10">
                <tbody><tr><td><strong>ID</strong></td><td><strong>Name</strong></td><td><strong>SKU</strong></td><td><strong>Description</strong></td><td></td></tr>
            {
            data.Product && 
            data.Product.map((product, index) => 
                (<ProductItem key={product.id} product={product} />)       
            )
            
            }
            </tbody>
            </table>
        </div>
        </Container>
    )
}