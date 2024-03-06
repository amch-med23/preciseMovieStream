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
                <div>
                    <h>This app is a Movie Recomendation System.</h>
                </div>
                <div>
                    <h>We are using OMDB database to get the data. </h>
                </div>
                <div> Made by: <h style={{color: "red"}}>Mohamed Amouch</h> ,a software engneering student @ Holbertoon school and ALX africa.
                    <h> My github: <a target="blank" href="https://github.com/amch-med23">GITHUB</a></h>
                    <h> Connect with me on linked in: <Link to="https://linkedin.com/in/mohamed-amouch" target="blank">LINKEDIN</Link></h>
                </div>

                <div>
                    <h>This app repository: <Link to="https://github.com/amch-med23/preciseMovieStream" target="blank">APP REPO ON GITHUB</Link></h>
                </div>
            </section>
        </div>
        <Footer />
        
        </>
    )
}

export default About