import React from 'react';

import '../styling/footer_styling.css';
import SystemStatus from "../scripts/system_status.jsx";

export default class Footer extends React.Component {

    componentDidMount(){
        
    }

    render()
    {
        return (
            <div className='footer'>
                <SystemStatus />
            </div>
        )
    }
    

}