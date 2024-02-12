import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Landing()
{
    return(
        <>
            <h>Welcom to the landing page of <b>Precise Movie Stream.</b></h> 
            <br /> <br />
            <h> This service helps you chose the best movie or serie for you to watch based on your answers to a specific quationaire.</h>
            <br /> <br />
            <h> There are many more functionalities planned for this system, but this is an MVP(Minimal Viable Project) for now.</h>
            <br/> <br/>
            <h> The user creates an account then continues to his account where he can use the system functionalities.</h>
            <br/> <br/>
            <Link to="/login"> <button>Login</button></Link>
            &nbsp; &nbsp;
            <Link to="/register"><button>Create account</button></Link>
            &nbsp; &nbsp;
            <Link to="/about"><button>About us</button></Link>
        </>
    )
}

export default Landing