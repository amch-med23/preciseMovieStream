import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { useState } from "react";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';

function ResetPassword()
{
    const navigate = useNavigate();
    let apiEndPoint = 'http://localhost:5000/api/v1/';
    const [isButtonDisabled, setIsButonDisabled] = useState(false);

    async function CheckEmailAvailability(event){
        event.preventDefault();

        let email_address = document.getElementById('email_address').value;
        console.log(email_address);
        
        let email_obj = {};
        email_obj['provided_email'] = email_address;

        let notice_paragragh = document.getElementById('password_reset_notice');
        

        try {
            setIsButonDisabled(true); //disabling the button
            let res = await axios.post(apiEndPoint.concat('check_if_email_exist'), email_obj);
            setIsButonDisabled(false); //re-enabling the button
            let Result = res.data;
            if (Result['availability'] === 'True'){
                console.log('Email found');
                notice_paragragh.innerHTML = `<h style="color: #16b916; margin: 10px;">We have sent a reset link to this email, please click on it and follow the instructions to change your password.</h>`;
                // 10seconsd timeout befour redirecting to login.
                setTimeout(function() {
                    navigate('/login');
                }, 10000);
            }
            else {
                console.log('The email you provided is not in our system (This means you are not registered). please go ahead and register a new account');
                
                notice_paragragh.innerHTML = `<h style="color: red; margin: 10px">The email you provided is not in our systems (this means you are not registered). Please go ahead and register a new account</h>`;
            }

        } catch (error) {
            console.log('Error occured while checking the email: ' + error);
        } 
       

    }
    return(
        <>
        <NavBar />
            <div className="container">
                <section className="password_reset_page_first">
                    This is the password reset page, enter your email address to reset your password.
                    <br />
                    <br />
                    <div className="password_reset_notice" id="password_reset_notice">
                        
                    </div>
                    
                    <form onSubmit={CheckEmailAvailability}>
                        <h4>Email address:</h4>
                        <input id="email_address" placeholder="provide your email" type="email" required></input>
                        <br /><br />
                        <button type="submit" disabled={isButtonDisabled}>{ isButtonDisabled ? 'Checking your email...' : 'submit'}</button>
                    </form>
                </section>
            
            </div>
        <Footer />
        </>
    )
}

export default ResetPassword