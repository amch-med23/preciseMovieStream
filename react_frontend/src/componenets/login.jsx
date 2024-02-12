import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login()
{
    return(
        <>
            <h>This is the Login page.</h> 
            <br />
            <Link to="/"> <button>Go Back</button></Link>
        </>
    )
}

export default Login