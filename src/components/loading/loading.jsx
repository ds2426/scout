import React, { useState } from 'react';

export const Loading = (props) => {
    const [message] = useState(props.message ? props.message : "Loading...")
    return (
        <div className="loading-container">
            <div className="ui active dimmer">
                <div className="ui text loader">{message}</div>
            </div>
        </div>
    
    )
}