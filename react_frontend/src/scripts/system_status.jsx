import React from "react";
import axios from 'axios';
import '../styling/footer_styling.css';

function SystemStatus() {
    
    //console.log("system status invoked");
    
        const apiEndPoint = "http://localhost:5000/api/v1/";
        axios.get(apiEndPoint.concat("status")).then( res => {
            {/* this is where am reating a use state*/}
            let status = res.data['status_code'];
            if (status === 200) {
                //console.log('All systems are operational.');
                //const system_ok = "all systems are operational.";
                //this.setState({ system_status : system_ok});

                let status_paragraph = document.getElementById('status_holder');
                status_paragraph.innerHTML = '<div className="system_status_ok" style="color: #00FF00;">&nbsp;All systems are operational.</div>' ;
                let dot_holder = document.getElementById('status-dot');
                dot_holder.innerHTML = '<div class="green-dot"></div>';
            
            }
        }).catch(error => {
            console.log("api errors were found");
            let status_paragraph = document.getElementById('status_holder');
            status_paragraph.innerHTML = '<div className="system_status_failed" style="color: red">&nbsp;API endpoints are not responding.</div>' ;
            let dot_holder = document.getElementById('status-dot');
            dot_holder.innerHTML = '<div class="red-dot"></div>';
                        
            
                //const system_failed = "Errors detected in the API.";
                //this.setState({ system_status : system_failed});
              });
            return(
                <>
                    <h className="status_text">System status: &nbsp;</h><h id="status-dot"></h><h id='status_holder'></h>
                </>
            )
}
export default SystemStatus