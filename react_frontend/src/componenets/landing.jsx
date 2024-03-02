import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SystemStatus from "../scripts/system_status.jsx";
// importing styling in here
import '../styling/index_styling.css';

import NavBar from "./navbar.jsx";
import Footer from "./footer.jsx";

function Landing()
{   
    return(
        <>
        <NavBar />
           
                <div className="container">
                    <section className="landing_section">
                        <div className="inner_div">
                        {/*<img src="src/assets/bat_man.jpg" className="main_img"></img>*/}
                        <br />
                        <h>Welcom to the landing page of <b>Precise Movie Stream.</b></h> 
                        <br /> <br />
                        <h> This service helps you chose the best movie or serie for you to watch based on your answers to a specific quationaire.</h>
                        <br /> <br />
                        <h> There are many more functionalities planned for this system, but this is an MVP(Minimal Viable Project) for now.</h>
                        <br/> <br/>
                        <h> The user can create an account or proceed as a guest so he can use the system functionalities.</h>
                        <br />
                        <br />
                        <Link to="/guest_proceed"><button>Proceed as a guest</button></Link>
                        
                        </div>
                        
                    </section>
                    <br /><br />
                </div>

        <Footer />
        </>
    )
}

export default Landing