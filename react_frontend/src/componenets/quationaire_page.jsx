import React from "react";
import axios  from "axios";

import '../styling/index_styling.css';
import HomeNavBar from "./home_navbar";

function QuationairePageHolder(){
    return(
        <>
        <HomeNavBar />
        <div className="container">
            <section>
                 <p>This is the quationaire page:</p>
            </section>
        </div>
        
        </>
    )
}

export default QuationairePageHolder