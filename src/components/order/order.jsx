import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Container, Input, Form, Label } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import Loading from '../loading';
import OrderItem from '../order-item';
import {ORDERS, SUBMIT_ORDER } from '../../queries/queries';

import './order.scss';

export const Order = () => {
    const [quantity, setQuantity] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [submitNewOrder] = useMutation(SUBMIT_ORDER);
    const { addToast } = useToasts();
    const { loading, error, data: orders } = useQuery(ORDERS);
   

    const createOrder = () => {
        const date = new Date();
            submitNewOrder({
                variables: {name, address, date},
                refetchQueries: [
                    { query: ORDERS }
                ]
            }).then(result => {
                addToast("Inventory Added", { appearance: 'success' })
            }).catch(function(error) {
                addToast(error, { appearance: 'error' })
            });
    }
    
    const setQty = (e) => {
        setQuantity(e.target.value);
    }
    const setOrderName = (e) => {
        setName(e.target.value);
    }
    const setAddressName = (e) => {
        setAddress(e.target.value);
    }


    if (loading) return <Loading />;
    if (error) return addToast(error, { appearance: 'error' });

    return (
        <Container className="bin-container">
        <h4>Please enter product name, select product, bin,<br />and enter quantity to create inventory record.</h4>
        <Form className="grid">
                <Form.Field>
                    <Label className="metadata">Name<Input type="text" onChange={setOrderName}/></Label>
                </Form.Field>
                <Form.Field>
                    <Label className="metadata">Address<Input type="text" onChange={setAddressName}/></Label>
                </Form.Field>
                <Form.Field>
                    <Label className="metadata">Quantity<Input type="text" onChange={setQty}/></Label>
                </Form.Field>
                <Form.Field>
                    { name && address && quantity && <Button icon="add" content="Add Order" onClick={createOrder} />}
                </Form.Field>
            </Form>
            
            <h3>Inventory</h3>
            <div className="ui">
            <table cellPadding="10">
                <tbody>
                <tr>
                    <td><strong>Name</strong></td>
                    <td><strong>Adress</strong></td>
                    <td><strong>Order Id</strong></td>
                    <td></td>
                </tr>
                    {
                    orders.Order && 
                    orders.Order.map((order) => {
                        return (<>
                            <OrderItem key={order.id} order={order} />
                            </>
                            )
                    })
                    
                    }
            </tbody>
            </table>
        </div>
        </Container>
    )
}
