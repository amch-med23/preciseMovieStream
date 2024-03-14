import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import NavBar from './navbar';
import Footer from './footer';

import '../styling/index_styling.css';

function EmailConfirmation(){

    const navigate = useNavigate();
    const location = useLocation();
    const apiEndPoint = "http://localhost:5000/api/v1/";
    const [ isButtonDisabled, setIsButtonDisabled] = useState(false);

    let user_email = location.state.email;
    let session_id = location.state.session_id;
    let user_name = location.state.user_name;
    let user_password = location.state.password;

    //console.log('email: ' + user_email + ', session_id: ' + session_id);

    async function handleVerification(event){
        event.preventDefault();
        let ver_code = document.getElementById('verification_code').value;
        //console.log('verification in process ... ver code : ' + ver_code);
        let ver_obj_data = {}
        let available_attr = ['email', 'session_id', 'ver_code', 'user_name', 'password']
        let ver_data = [user_email, session_id, ver_code, user_name, user_password]

        let i = 0
        while (i < 5){
            ver_obj_data[available_attr[i]] = ver_data[i];
            i = i + 1;
        }
        // sending the ver_obj_data
        try {
            setIsButtonDisabled(true); // disabling the button
            let res = await axios.post(apiEndPoint.concat('verify_email'), ver_obj_data);
            setIsButtonDisabled(false); // re-enabling the button
            //console.log(res.data['verification_status']) //value = verified or not_verified
            if (res.data['verification_status'] === 'verified'){
                let code_paragraph_error = document.getElementById('ver_code_error');
                code_paragraph_error.innerText = '';
                navigate('/register_success');
            }
            else{
                let code_paragraph_error = document.getElementById('ver_code_error');
                code_paragraph_error.innerText = 'your verification code is wrong, please try again';

            }
        }
        catch (error) {
            console.log('Errors occurred: ' + error);

        }
    }

    return(
        <>
        <NavBar />
            <div className='container'>
                <section>
                    <p>This is the email verification page</p> <br />
                    <div className='form_error_class' id='ver_code_error'></div>
                    <br />
                    <form onSubmit={handleVerification}>
                        <h>Enter the code you received in your email:</h><br /><br />
                        <div className='input_box'>
                        <input id="verification_code" className='email_verificaion' minLength={6} maxLength={6} type='text' required ></input>
                        </div>
                        <br /> <br />
                        <button type='submit' disabled = {isButtonDisabled}>{ isButtonDisabled ? 'verification in progress ...' : 'Verify'}</button>
                    </form>
                </section>
            </div>
        <Footer />
        </>
    )
}

export default EmailConfirmation