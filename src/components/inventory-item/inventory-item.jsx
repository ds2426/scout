import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Button, Input } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import {INVENTORYS, UPDATE_INVENTORY, DELETE_INVENTORY, UPDATE_INVENTORY_QUANTITY } from '../../queries/queries';

export const InventoryItem = (props) => {
    const [showRename, setShowRename] = useState(false);
    const [showQuantity, setShowQuantity] = useState(false);
    const [quantity, setQuantity] = useState();
    const [deleteInventory] = useMutation(DELETE_INVENTORY);
    const [updateInventory] = useMutation(UPDATE_INVENTORY);
    const [updateInventoryQuantity] = useMutation(UPDATE_INVENTORY_QUANTITY);
    const { addToast } = useToasts();
    const [newName, setNewName ] = useState();
    
    const deleteInventories = (productId) => {
      deleteInventory({
          variables: {id: productId }, 
              refetchQueries: [
                { query: INVENTORYS }
              ]
        }).then(() => {
          addToast("Inventory Deleted", { appearance: 'success' })
        }).catch(function(error) {
          addToast(error, { appearance: 'error' })
        });
      }
    
      const updateInventories = (product) => {
        updateInventory({
            variables: {id: product, newName},
            refetchQueries: [
              { query: INVENTORYS }
          ]
          }).then(() => {
            addToast("Inventory Name Updated", { appearance: 'success' })
            setShowRename(false);
          }).catch(function(error) {
            console.log(error)
          });
      }

      const updateQuantity = (product) => {
        updateInventoryQuantity({
            variables: {id: product, quantity},
            refetchQueries: [
              { query: INVENTORYS }
          ]
          }).then(() => {
            addToast("Inventory Name Updated", { appearance: 'success' })
            setShowRename(false);
          }).catch(function(error) {
            console.log(error)
          });
      }
    return (
        <tr>
            <td>{props.inventory.name}&nbsp;
            <Button color="blue" onClick={() => showRename ? setShowRename(false): setShowRename(true)} circular icon='edit' />
                { showRename && 
                    <Input action={<Button color="blue" onClick={() => updateInventories(props.inventory.id)} icon='save' />} 
                    placeholder="Rename product" 
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value) } 
                    } />
                }
                </td>
                <td>{props.inventory.product_id}</td>
                <td>{props.inventory.bin_id}</td>
                <td>{props.inventory.qty}&nbsp;
                  <Button color="blue" onClick={() => showRename ? setShowQuantity(false): setShowQuantity(true)} circular icon='edit' />
                  { showQuantity && 
                      <Input action={<Button color="blue" onClick={() => updateQuantity(props.inventory.id)} icon='save' />} 
                      placeholder="Rename product" 
                      value={quantity}
                      number
                      onChange={(e) => { setQuantity(e.target.value) } 
                      } />
                  }
                </td>
                <td><Button onClick={() => deleteInventories(props.inventory.id)} color="red" circular icon='delete' /></td>
        </tr>
    )
}