import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';
import error_img from '../assets/404_error_img.png';

function GenericNotFound()
{
    return(
        <>
        <NavBar />
            <div className="container">
                <section className="page_not_found">
                    <div > <img className="error_img_holder" src={error_img}></img></div>
                </section>
            
            </div>
        <Footer />
        </>
    )
}

export default GenericNotFound