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
                <section className="guest_proceed_main_alert">
                    <div className="guest_proceed_div">
                        <h>You are trying to access the Guest page. This permits access to one system functionaly (getting random movies) without a registered account.</h>
                        <br />
                        <br />
                        <h> We recommend you to create an account so we can know you better, and that way the results can be more accurate plus you will enjoy all system functionalities.</h> 
                        <br />
                        <br />
                        <Link to="/register"> <button>Create an account</button></Link>
                        &nbsp; &nbsp;
                        <Link to="/guest_random_movies_page"><button>Proceed anyway</button></Link>
                    </div>
                </section>
            
            </div>
        <Footer />
        </>
    )
}

export default GuestProceed