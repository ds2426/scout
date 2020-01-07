import React from 'react';

export const OrderLineItem = (props) => {
    return (
        <tr>
            <td>{props.orderline.order_id}</td>
            <td>{props.orderline.product_id}</td>
            <td>{props.orderline.qty}</td>
        </tr>
    )
}