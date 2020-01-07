import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Button, Input } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import {PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT_DESCRIPTION } from '../../queries/queries';

export const ProductItem = (props) => {
    const [showRename, setShowRename] = useState(false);
    const [showRenameDescription, setShowRenameDescription] = useState(false);
    const [deleteProducts] = useMutation(DELETE_PRODUCT);
    const [updateProducts] = useMutation(UPDATE_PRODUCT);
    const [updateProductDescription] = useMutation(UPDATE_PRODUCT_DESCRIPTION);
    const { addToast } = useToasts();
    const [newName, setNewName ] = useState();
    const [description, setDescription] = useState();
    
    const deleteProduct = (productId) => {
        deleteProducts({
          variables: {id: productId }, 
              refetchQueries: [
                { query: PRODUCTS }
              ]
        }).then(() => {
          addToast("Product Deleted", { appearance: 'success' })
        }).catch(function(error) {
          addToast(error, { appearance: 'error' })
        });
      }
    
      const updateProduct = (product) => {
        updateProducts({
            variables: {id: product, newName},
            refetchQueries: [
              { query: PRODUCTS }
          ]
          }).then(() => {
            addToast("Product Name Updated", { appearance: 'success' })
            setShowRename(false);
          }).catch(function(error) {
             console.log(error);
          });
      }
      const updateProductDesc = (product) => {
        updateProductDescription({
            variables: {id: product, description},
            refetchQueries: [
              { query: PRODUCTS }
          ]
          }).then(() => {
            addToast("Product Description Updated", { appearance: 'success' })
            setShowRenameDescription(false);
          }).catch(function(error) {
            console.log(error);
          });
      }
    return (
        <tr key={props.index}>
            <td>{props.product.id}</td>
            <td>{props.product.product_name}&nbsp;
            <Button color="blue" onClick={() => showRename ? setShowRename(false): setShowRename(true)} circular icon='edit' />
                { showRename && 
                    <Input action={<Button color="blue" onClick={() => updateProduct(props.product.id)} icon='save' />} 
                    placeholder="Rename product" 
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value) } 
                    } />
                } </td>
            <td>{props.product.sku}</td>
            <td>{props.product.product_description}</td>
            <td>
                
                <Button color="blue" onClick={() => showRenameDescription ? setShowRenameDescription(false): setShowRenameDescription(true)} circular icon='edit' />
                { showRenameDescription && 
                    <Input action={<Button color="blue" onClick={() => updateProductDesc(props.product.id)} icon='save' />} 
                    placeholder="Rename product" 
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) } 
                    } />
                } 
                <Button onClick={() => deleteProduct(props.product.id)} color="red" circular icon='delete' /></td>
        </tr>
    )
}