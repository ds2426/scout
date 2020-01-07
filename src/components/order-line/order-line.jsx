import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Container, Input, Form, Label } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import Loading from '../loading';
import OrderLineItem from '../order-line-item';
import {ORDERS, PRODUCTS, ORDERLINES, SUBMIT_ORDERLINE } from '../../queries/queries';

import './order-line.scss';

export const OrderLine = (props) => {
    const [productId, setProductId ] = useState();
    const [order, setOrder] = useState();
    const [quantity, setQuantity] = useState();
    const [submitNewOrderLine] = useMutation(SUBMIT_ORDERLINE);
    const { addToast } = useToasts();
    const { loading, error, data: orderlines } = useQuery(ORDERLINES);
    const { data: products, loading: l2, error: e2 } = useQuery(PRODUCTS);
    const { data: orders, loading: l1, error: e1 } = useQuery(ORDERS);
   

    const createOrderLine = () => {
        submitNewOrderLine({
            variables: {productId, order, quantity},
            refetchQueries: [
                { query: ORDERLINES }
            ]
        }).then(result => {
            addToast("Order Line Added", { appearance: 'success' })
        }).catch(function(error) {
            addToast(error, { appearance: 'error' })
        });
       
        
    }
    
    const setProduct = (e) => {
        setProductId(e.target.value);
    }

    const setOrderNumber = (e) => {
        setOrder(e.target.value);
    }

    const setQty = (e) => {
        setQuantity(e.target.value);
    }

    if (loading) return <Loading />;
    if (error) return addToast(error, { appearance: 'error' });
    if (l2) return <Loading />;
    if (e2) return addToast(error, { appearance: 'error' });
    if (l1) return <Loading />;
    if (e1) return addToast(error, { appearance: 'error' });

    return (
        <Container className="bin-container">
        <h4>Please enter product name, select product, bin,<br />and enter quantity to create inventory record.</h4>
        <Form className="grid">
                <Form.Field>
                    <Label><p>Order</p>  
                    <select onChange={setOrderNumber} className="ui dropdown">
                        <option>Choose Order</option>
                        {                            
                            orders.Order.map((order, i) => {
                               return <option value={order.id}>{order.order_number}</option>
                            })
                        }
                    </select>
                    </Label>
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
                    <Label className="metadata">Quantity<Input type="text" onChange={setQty}/></Label>
                </Form.Field>
                <Form.Field>
                    { order && productId && quantity && <Button icon="add" content="Add Order Line" onClick={createOrderLine} />}
                </Form.Field>
            </Form>
            
            <h3>OrderLines</h3>
            <div className="ui">
            <table cellPadding="10">
                <tbody>
                <tr><td><strong>Order ID</strong></td><td><strong>Product ID</strong></td><td><strong>Quantity</strong></td><td></td></tr>
                    {
                    orderlines.OrderLine && 
                    orderlines.OrderLine.map((orderline) => {
                        return <OrderLineItem key={orderline.id} orderline={orderline} />
                    })
                    
                    }
            </tbody>
            </table>
        </div>
        </Container>
    )
}