import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import '../styling/index_styling.css';

import NavBar from './navbar.jsx';
import Footer from './footer.jsx';

function Register()
{
    const navigate = useNavigate();
    const apiEndPoint = "http://wsl.localhost:5000/api/v1/";
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

   async function handleSubmit(event){
        event.preventDefault() // this is to prevent the default form behaiviour
        let user_name =  document.getElementById('user_name').value;
        let email = document.getElementById('email').value;
        let passwd =  document.getElementById('password').value;
        let passwd_conf =  document.getElementById('password_conf').value;
        let user_data = {}; // empty user dictionary
        let available_attr = ['user_name', 'email', 'password', 'password_conf'];
        let form_data = [user_name, email, passwd, passwd_conf];
        
        // populating the user_data dictionary
        let i = 0;
        while(i < 4){
            user_data[available_attr[i]] = form_data[i];
            i = i + 1;
        };
       
        console.log(user_data); // testing the user data.
        // sending the user data to the back end.

        try {

            setIsButtonDisabled(true) // disable the button after pressing the button
            let res = await axios.post(apiEndPoint.concat('register'), user_data);
            setIsButtonDisabled(false) // re-enabling the button after the post request success

            console.log("the back_end status of email is: " + res.data['email_check']);
            console.log("the back_end status of password is : " + res.data['password_check']);
            // the returned result check.
            if (res.data['password_check'] === 'failed'){
                console.log("password doesn't match, try again.");
                let password_error_value = "password combination doesn't match, try again.";
                const pass_error_paragraph = document.getElementById('form_pass_error_msg');
                pass_error_paragraph.innerText = password_error_value;
            } 
            // this is to clear the password error message area
            else if(res.data['password_check'] === 'passed')
            {
                const pass_error_paragraph = document.getElementById('form_pass_error_msg');
                pass_error_paragraph.innerText = '';
            }
            if (res.data['email_check'] === 'failed'){
                console.log("email was already used");
                let email_error_value = "the email provided is already used, try a differant email, or reset you password, and use it to login.";
                const email_error_paragraph = document.getElementById('form_email_error_msg');
                email_error_paragraph.innerText = email_error_value;
            }
            // this is to clear the email error message area
            else if(res.data['email_check'] === 'passed'){
                const email_error_paragraph = document.getElementById('form_email_error_msg');
                email_error_paragraph.innerText = "";
            }
            if (res.data['email_check'] === 'passed' && res.data['password_check'] === "passed"){
                let user_email = res.data['user_email'];
                let session_id = res.data['session_id'];
                navigate('/email_confirmation', {'state':{'email': user_email, 'session_id': session_id, 'user_name': user_name, 'password':passwd}});
            }

        } 
        catch(error) {
                console.log('Error has occured while trying to register: ' + error);

        }
        
        
        
    }

    return(
        <>
            <NavBar />
            <div className="container">
                <section>
                    <div className="register_form">
                            <h >This is the Register page.</h> 
                            <br /> <br />
                            <div id="form_pass_error_msg" className="form_error_class"></div> 
                            <div id="form_email_error_msg" className="form_error_class"></div>
                            <br />
                            <form onSubmit={handleSubmit}>

                                <div className="input_box">
                                    <h className="input_header">User name:</h> <br />
                                    <input type="text" id="user_name" required placeholder="enter your user name"></input>
                                </div>

                                <div className="input_box">
                                    <h className="input_header">Email address:</h> <br />
                                    <input type="email" id="email" required placeholder="enter your email"></input>
                                </div>
                                
                                <div className="input_box">
                                    <h className="input_header">Password:</h> <br />
                                    <input type="password" id="password" required minLength={8} placeholder="enter your password"></input>
                                </div>
                            
                                <div className="input_box">
                                    <h className="input_header">Confirm your password:</h> <br />
                                    <input type="password" id="password_conf" required minLength={8} placeholder="reenter your password"></input>
                                </div>
                            
                                <button type="submit" disabled = {isButtonDisabled}>{ isButtonDisabled ? 'Registering...' : 'Submit'}</button>
                            </form>
                    </div>
                </section>
            </div>
           <Footer />
        </>
    )
}

export default Register