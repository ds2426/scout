import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Container, Input, Form, Label } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';
import Loading from '../loading';
import BinItem from '../bin-item';
import {BINS, SUBMIT_BIN } from '../../queries/queries';

import './bin.scss';

export const Bin = () => {
    const [name, setName ] = useState();
    const [submitNewBin] = useMutation(SUBMIT_BIN);
    const { addToast } = useToasts();
    const { loading, error, data } = useQuery(BINS);

    const createBin = () => {
        submitNewBin({
            variables: {name},
            refetchQueries: [
                { query: BINS }
            ]
        }).then(result => {
            addToast("Bin Added", { appearance: 'success' })
        }).catch(function(error) {
            addToast(error, { appearance: 'error' })
        });
    }
    
    const setBinName = (e) => {
        setName(e.target.value);
    }

    if (loading) return <Loading />;
    if (error) return addToast(error, { appearance: 'error' });
    console.log(data.Bin)
    return (
        <Container className="bin-container">
        <h4>Please enter a Bin name to create new Bin</h4>
        <Form className="grid">
                <Form.Field>
                    <Label className="metadata">Bin Name <Input type="text" onChange={setBinName}/></Label>
                </Form.Field>
            
                <Form.Field>
                    { name && <Button icon="add" content="Add Bin" onClick={createBin} />}
                </Form.Field>
            </Form>
            
            <h3>Bins</h3>
            <div className="ui">
            <table cellPadding="10">
                <tbody>
                <tr>
                    <td><strong>ID</strong></td>
                    <td><strong>Name</strong></td></tr>
                    {
                    data.Bin && 
                    data.Bin.map((bin) => {
                        return <BinItem key={bin.id} bin={bin} />
                    })
                    
                    }
            </tbody>
            </table>
        </div>
        </Container>
    )
}