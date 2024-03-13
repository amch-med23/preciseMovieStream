import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import  axios  from "axios";
import { useState } from "react";

import '../styling/index_styling.css';
import NavBar from "./navbar";
import Footer from "./footer";

function PasswordResetProceed() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const apiEndPont = 'http://wsl.localhost:5000/api/v1/';
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    let email_address = searchParams.get('user_email');
    let reset_token = searchParams.get('reset_token');
    //console.log('reset isuuer email address: ' + email_address);
    //console.log('reset token: ' + reset_token);
    
    

    async function HandlePasswordReset(event){
        event.preventDefault();

        let notice_paragraph = document.getElementById('notice_error');
        let new_password = document.getElementById('new_pass').value;
        let new_password_conf = document.getElementById('new_pass_conf').value;

        let request_obj = {};
        request_obj['new_password'] = new_password;
        request_obj['new_password_conf'] = new_password_conf;
        request_obj['user_email'] = email_address;
        request_obj['reset_token'] = reset_token;


        try {
            setIsButtonDisabled(true);
            let res = await axios.post(apiEndPont.concat('reset_password'), request_obj);
            setIsButtonDisabled(false);
            let res_data = res.data;
            // in here we need to check for these keys 'password_check', 'changed_status', 'token_status'
            
            if (res_data['password_check'] === 'Passed' && res_data['password_changed'] === 'True' && res_data['token_status'] === 'Valid'){
                notice_paragraph.innerHTML = `<h style="color: green;">Successfully updated the password.</h>`;
                navigate('/password_reset_success');
            }
            if (res_data['password_check'] === 'Failed') { 
                //here we show the password_check error
                notice_paragraph.innerHTML = ``;
                notice_paragraph.innerHTML = `<h style="color: red">The passwords you entered are not identical</h>`;

            }
            if (res_data['token_status'] === "Expired" && res_data['password_check'] == "Passed" && res_data['password_changed'] === 'False'){
                notice_paragraph.innerHTML = `<h style="color: red">This reset token has expired (request a new password reset and use that email to reset your password).</h>`;
            }
            
            if (res_data['token_status'] === 'Valid' && res_data['password_check'] === "Passed" && res_data['password_changed'] === 'False') {
                notice_paragraph.innerHTML = `<h style="color: red">Sorry, but the password reset operation has failed. (noting you can do it's from our end)</h>`;
            }
        } catch (error) {
            console.log('Error incountred: ' + error);
        }

    }


    return (
        <>
        <NavBar />
        <div className="container">
       
        <section className="password_reset_proceed">
            <p>Hey <h style={{color: "red"}}>{email_address}</h> This is where you will update your password.</p>
            <div id="notice_error"></div>
                <br />
                <form onSubmit={HandlePasswordReset}>
                    <div>
                    <h >Enter your new password:</h><br />
                    <input id="new_pass"  type="password" required minLength={8}></input>
                    <br />
                    <br />
                    <h>Re enter your new password:</h> <br />
                    <input type="password" minLength={8} required  id="new_pass_conf"></input>
                    </div>
                    <br />
                    <div>
                    <button type="submit" disabled={isButtonDisabled}>{ isButtonDisabled ? 'Checking...' : 'Reset'}</button>
                    </div>
                </form>
            
        </section>
        </div>
        <Footer />
        </>
    )
}

export default PasswordResetProceed