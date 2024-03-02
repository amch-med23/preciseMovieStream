import React from "react";
import axios  from "axios";

import '../styling/index_styling.css';
import HomeNavBar from "./home_navbar";

function RandomResultHolder(){

    function getRandomresults() {
        const apiEndPoint = "http://wsl.localhost:5000/api/v1/";
        axios.get(apiEndPoint.concat('random_movies')).then(res => {
            let data = res.data;
            console.log('returned data is: ' + data);
        });
    }
    return(
        <>
        <HomeNavBar />
            <p>This is the random result of your requeste:</p>
            { getRandomresults() }   
        </>
    )
}

export default RandomResultHolder