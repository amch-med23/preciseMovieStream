import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Home()
{
    return(
        <>
            <h>This is the Home page. It represants the control panel of the user (where he can interact with the services this system provides)</h> 
            <br />
            <Link to="/"> <button>Go Back</button></Link>
        </>
    )
}

export default Home