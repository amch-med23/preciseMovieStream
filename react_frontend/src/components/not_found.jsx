import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';

function GenericNotFound()
{
    return(
        <>
        <NavBar />
            <div className="container">
                <section>
                    <h>Generic not found.</h>
                </section>
            
            </div>
        <Footer />
        </>
    )
}

export default GenericNotFound