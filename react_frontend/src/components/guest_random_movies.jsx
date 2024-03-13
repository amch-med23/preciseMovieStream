import React from "react";
import axios  from "axios";
import { useState } from "react";

import '../styling/index_styling.css';
import NavBar from "./navbar";


function GuestRandomMoviesPage(){
    // get the button object
    const [isButtonDisabled, setIsButtonDisabled] = useState(false) ;
    const apiEndPoint = "http://localhost:5000/api/v1/";

    async function getRandomresults() {

        try {
            setIsButtonDisabled(true); // disabling the button befour fetching the data
            const response = await axios.get(apiEndPoint.concat('movie_random'));
            setIsButtonDisabled(false); // re-enable the button
            let responseData = [];
            responseData = response.data['movies_data'];
            const responseStatus = response.data['Response'];
           
            if (responseStatus === 'True'){
                // code in here to output the data.
                const element_holder = document.getElementById('div_random_movies_holder');
                element_holder.innerHTML = ``; // clearing the content each time.
                //let i = 0;
                //console.log('list lenght is : ' + responseData.lenght);
                //console.log('data status is: ' + responseStatus);
                
                responseData.forEach(element => {
                    let div = document.createElement('div');
                    div.setAttribute('class', 'div_random_movie_element');
                    div.innerHTML = `<img src="${element.Poster}"></img><div class="random_movie_title"><b>Title: </b>${element.Title},<b> Release year:</b> ${element.Year}</div>`;
                    element_holder.appendChild(div);
                });
                
            }
            else{
                console.log('data returned empty, propeply we hit our API calls limit for the day.');
                const element_holder = document.getElementById('div_random_movies_holder');
                element_holder.innerHTML = `<h>Data returned empty, propeply we hit our API calls limit for the day.</h>`; // this cleares the previous data as well.
                
            }
            //console.log('data status is: ' + responseStatus);
            //console.log('data is: ' + responseData);

        } catch(error){
            console.log('Errors occured while retreiving random movies: ' + error);
            
        }
        
    }
    // getting the number of elements from movies pool in the back-end.
        
   
        let warning_paragraph = document.getElementById('movies_pool_warning');
        axios.get(apiEndPoint.concat('number_imdb_id')).then( res => {
            let movie_ids_number = res.data['num_imdb_ids'];
            warning_paragraph.innerHTML = `<div class="random_head_line_notice_2"><h class="notice_2_text">The Movies pool which you are getting the results from is not all imdb content,
             but instead we have gathered the best <h style="color: red;">${movie_ids_number}</h> movie IDs to randomely chose from.<h style="color: red; font-size: small">(This was done to limit the number of calls we make to
                 imdb database for each request)</h></h></div>`;
            
        }).catch(error => {
            //console.log('Error occured while retreiving the number of movie ids: ' + error);
        });
       
 
    
    return(
        <>
        <NavBar />
        <div className="container_movie_info">
            <section className="rendom_movies_first_section">
                <div className="random_headline_notice">We are returning a list of 10 movies per request since our omdb API calls are limited.</div>
                <div id="movies_pool_warning"></div>
                <button style={{margin : "10px"}} onClick={async() => {setIsButtonDisabled(true); await getRandomresults()}} disabled={isButtonDisabled}  id="random_btn">{ isButtonDisabled ? 'Loading data ...' : 'Get random Suggestions'}</button>
                    
            </section>

            <section className="random_movies_result_holder_section">
                <div id="div_random_movies_holder" className="random_movies_result_holer_div" ></div>

            </section> 
        </div>
        </>
    )
}

export default GuestRandomMoviesPage