import React from "react";
import axios  from "axios";

import '../styling/index_styling.css';
import HomeNavBar from "./home_navbar";

function RandomResultHolder(){

    function getRandomresults() {
        const apiEndPoint = "http://wsl.localhost:5000/api/v1/";
        axios.get(apiEndPoint.concat("random_result")).then( res => {
            let data = res.data;
            console.log('returned data is: ' + data);
        });
    }
    return(
        <>
        <HomeNavBar />
        <div className="container">
            <section>
                <p>This is the random result of your requeste:</p>
                { getRandomresults() }      
            </section> 
            </div>
        </>
    )
}

export default RandomResultHolder