import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Button, Input } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import {BINS, UPDATE_BIN, DELETE_BIN } from '../../queries/queries';

export const BinItem = (props) => {
    const [showRename, setShowRename] = useState(false);
    const [deleteBins] = useMutation(DELETE_BIN);
    const [updateBins] = useMutation(UPDATE_BIN);
    const { addToast } = useToasts();
    const [newName, setNewName ] = useState();
    
    const deleteBin = (productId) => {
        deleteBins({
          variables: {id: productId }, 
              refetchQueries: [
                { query: BINS }
              ]
        }).then(() => {
          addToast("Product Deleted", { appearance: 'success' })
        }).catch(function(error) {
          addToast(error, { appearance: 'error' })
        });
      }
    
      const updateBin = (product) => {
        updateBins({
            variables: {id: product, newName},
            refetchQueries: [
              { query: BINS }
          ]
          }).then(() => {
            addToast("Product Name Updated", { appearance: 'success' })
            setShowRename(false);
          }).catch(function(error) {
            console.log(error)
          });
      }
    return (
        <tr>
            <td>{props.bin.id}</td>
            <td>{props.bin.bin_name}&nbsp;
            <Button color="blue" onClick={() => showRename ? setShowRename(false): setShowRename(true)} circular icon='edit' />
                { showRename && 
                    <Input action={<Button color="blue" onClick={() => updateBin(props.bin.id)} icon='save' />} 
                    placeholder="Rename product" 
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value) } 
                    } />
                }
                <Button onClick={() => deleteBin(props.bin.id)} color="red" circular icon='delete' /></td>
        </tr>
    )
}