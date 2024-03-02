import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';
function GuestHome()
{
    return(
        <>
            <NavBar />
            <div className="container">
                <section>
                    <h>This is the Guest page. Access the system functionalities for users without a regestred account.</h>
                    <br />
                    <br />
                    <Link to="/"> <button>Go to Landing</button></Link>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default GuestHome