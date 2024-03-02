import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';

function About()
{
    return(
        <>
        <NavBar />
        <div className="container">
            <section>
                <h>This is the About page.</h> 
                <br />
                <Link to="/"> <button>Go Back</button></Link>
            </section>
        </div>
        <Footer />
        
        </>
    )
}

export default About