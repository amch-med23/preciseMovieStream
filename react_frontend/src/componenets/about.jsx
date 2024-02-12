import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function About()
{
    return(
        <>
            <h>This is the About page.</h> 
            <br />
            <Link to="/"> <button>Go Back</button></Link>
        </>
    )
}

export default About