import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../styling/index_styling.css';
import success_img from '../assets/green_check.png';

import NavBar from "./navbar";
import Footer from "./footer";

function PasswordResetSuccess()
{
    const navigate = useNavigate();
    setTimeout(function() {
         navigate('/login');         
    }, 5000)
    return(
        <>
        <NavBar />
        <div className="container">
            <section className="password_reset_success">
                <img src={success_img} className="check_img"></img>
                <br />
                <h>You have successfully reseted your password, we will redirect you to login in 5 seconds.</h> 
                
                
            </section>
        </div>
        <Footer />
        </>
    )
}

export default PasswordResetSuccess