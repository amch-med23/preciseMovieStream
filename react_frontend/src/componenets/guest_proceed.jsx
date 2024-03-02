import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';

function GuestProceed()
{
    return(
        <>
        <NavBar />
            <div className="container">
                <section>
                    <h>You are trying to access the Guest page. This permits access to the system functionalities for users without a registred account.</h>
                     <br />
                    <br />
                    <h> We recommend you to create an account so we can know you better, and that way the results can be more accurate.</h> 
                    <br />
                    <br />
                    <Link to="/"> <button>Go Back</button></Link>
                    &nbsp; &nbsp;
                    <Link to="/guest_home"><button>Proceed anyway</button></Link>
                </section>
            
            </div>
        <Footer />
        </>
    )
}

export default GuestProceed