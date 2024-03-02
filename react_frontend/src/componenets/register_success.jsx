import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../styling/index_styling.css';

import NavBar from "./navbar";
import Footer from "./footer";

function RegisterSuccess()
{
    return(
        <>
        <NavBar />
        <div className="container">
            <section>
                <img src="src/assets/green_check.png" className="check_img"></img>
                <br />
                <h>You have successfully been registered as a new user of our system.</h> 
                <br /> <br />
                <Link to="/login"> <button>log in</button></Link>
                &nbsp; &nbsp;
                <Link to='/'><button>Landing</button></Link>
            </section>
        </div>
        <Footer />
        </>
    )
}

export default RegisterSuccess