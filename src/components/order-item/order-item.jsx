import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Button } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import {ORDERS, DELETE_INVENTORY } from '../../queries/queries';

export const OrderItem = (props) => {
    const [deleteOrders] = useMutation(DELETE_INVENTORY);
    const { addToast } = useToasts();
    const deleteOrder = (productId) => {
      deleteOrders({
          variables: {id: productId }, 
              refetchQueries: [
                { query: ORDERS }
              ]
        }).then(() => {
          addToast("Order Deleted", { appearance: 'success' })
        }).catch(function(error) {
          addToast(error, { appearance: 'error' })
        });
      }
    return (
        <tr>
            <td>{props.order.customer_name}</td>
            <td>{props.order.customer_address}</td>
            <td>{props.order.order_number}</td>
            <td>{props.order.product_id}</td>
            <td><Button onClick={() => deleteOrder(props.order.id)} color="red" circular icon='delete' /></td>
        </tr>
    )
}