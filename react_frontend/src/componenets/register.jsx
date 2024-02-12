import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Register()
{
    return(
        <>
            <h>This is the Register page.</h> 
            <br />
            <Link to="/"> <button>Go Back</button></Link>
        </>
    )
}

export default Register