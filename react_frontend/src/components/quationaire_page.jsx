import React from "react";
import axios  from "axios";
import {useNavigate, useLocation} from 'react-router-dom';
import { useState } from 'react';

import '../styling/index_styling.css';
import HomeNavBar from "./home_navbar";

function QuationairePageHolder(){

    const navigate = useNavigate();
    const location = useLocation();
    let user_name = location.state.user_name;
    let user_email = location.state.user_email;
    
    let apiEndPoint = "http://localhost:5000/api/v1/";
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    async function handleSubmit(event){
        event.preventDefault();

        // getting the data from the form.
        let release_year = String(document.getElementById('release_year').value);
        let media_type = String(document.getElementById('movies_type').value);
        let media_keywords = String(document.getElementById('keywords_text').value);
        let liked_media = String(document.getElementById('liked_movies_names').value);

        //console.log('release year=' + release_year + ', type=' + media_type);

        let comma_warning_paragraph = document.getElementById('comma_warnings');

        if (media_keywords.includes(', ') || liked_media.includes(', ')){
            //console.log('space after comma detected, please use only commas.');
            comma_warning_paragraph.innerHTML = `<h class="comma_warning_text">space after comma detected, please only use commas with no space aroud them.</h>`;

        }
        else if (media_keywords.includes(' ,') || liked_media.includes(' ,')){
            //console.log('space before comma detected, please use only commas.');
            comma_warning_paragraph.innerHTML = `<h class="comma_warning_text">space before comma detected, please only use commas with no space aroud them.</h>`;

        }

        else {
            comma_warning_paragraph.innerHTML = ``;

            // processing the data retreived from  a multiple entries fields:(keywords, liked movies)
            let keywords_list = media_keywords.split(',');
            let liked_movies_list = liked_media.split(',');

            //console.log('keywords=' + keywords_list + '. liked_media=' + liked_movies_list)
            
            
            let final_keywords_list = [];
            let final_liked_movies_list = [];

            let i = 0;
            while (i < keywords_list.length){
                final_keywords_list.push(keywords_list[i].replace(/ /g, '+'));
                i = i + 1;
            }
            let j = 0;
            while (j < liked_movies_list.length){
                final_liked_movies_list.push(liked_movies_list[j].replace(/ /g, '+'));
                j = j + 1;
            }
            //console.log(final_keywords_list + ' - ' + final_liked_movies_list);
            // data object creation must be done in here. and sending as well.
            let data_obj = {};

            // passing user_name and user-emails, since this request holds vaiable data for us to create a profile
            // for this user, and we can train our systems more on the results of the surveys the user takes.
            let available_attrbs = ['year', 'type', 'keywords', 'liked_movies', 'user_name', 'user_email'];
            let attrbs_values = [release_year, media_type, final_keywords_list, final_liked_movies_list, user_name, user_email];

            let k = 0;
            console.log(available_attrbs.length);
            while (k < available_attrbs.length){
                data_obj[available_attrbs[k]] = attrbs_values[k];
                k = k + 1;
            }
            
            /*Object.entries(data_obj).forEach(([key, value]) => {
                console.log('key: ' + key + '. value: ' + value);
            })*/

            try {
                setIsButtonDisabled(true); // disabling the button befour fetching the data
                let Res = await axios.post(apiEndPoint.concat('interests_quationair'), data_obj);
                setIsButtonDisabled(false); // re-actvaiting the data after the async process is done.
                let Data = Res.data['interests_result'];

                let keywords_result = Data['keywords_result'];
                let liked_movies_result = Data['liked_movies_result'];

                const result_holder_div = document.getElementById('recomended_movies_holder_div');

                if (Data['liked_movies_status'] === 'False' && Data['keywords_status'] === 'False'){
                    // Show that no Hit was found for the user search
                    console.log('Show that no Hit was found for the user search');
                    let div = document.createElement('div');
                    div.innerHTML = `<div class="quationaire_result_elem_div">No results were found for your search.</div>`;
                    result_holder_div.innerHTML = ``;
                    result_holder_div.appendChild(div);
                     
                }
                else{
                    result_holder_div.innerHTML = ``; // clear the error message befoure displaying the result, this cleans the holder each time the request was made
                    if (Data['keywords_status'] === 'True'){
                        //append the keywords status to the content to the holder
                        console.log('append the content of keywords data to the holder');
                        
                        let i = 0;
                        
                        while (i < keywords_result.length){
                            let j = 0;
                            while( j < keywords_result[i].length){
                                let div = document.createElement('div');
                                div.innerHTML = `<div class="quationaire_result_elem_div"><img src=${keywords_result[i][j]['Poster']}></img><div><h><b>Title:</b> ${keywords_result[i][j]['Title']}</h><h> <b>Year:</b> ${keywords_result[i][j]['Year']}</h><h> <b>Type:</b> ${keywords_result[i][j]['Type']}</h></div></div>`;
                                result_holder_div.appendChild(div);
                                j = j + 1;

                            }
                            i = i + 1;
                        }
                    }
                    else { // keywords are False
                        console.log('no keywords result will be appended');
                        //don't iretate through the content of key_words since it will be null
                    }
                    if(Data['liked_movies_status'] === 'True') {
                        // append the content of liked_movies_status to the holder result.
                        console.log('append the content of liked_movies data to the holder');

                        let i = 0;
                        
                        while (i < liked_movies_result.length){
                            let j = 0;
                            while( j < liked_movies_result[i].length){
                                let div = document.createElement('div');
                                div.innerHTML = `<div class="quationaire_result_elem_div"><img src=${liked_movies_result[i][j]['Poster']}></img><div><h><b>Title:</b> ${liked_movies_result[i][j]['Title']}</h> <h> <b>Year:</b> ${liked_movies_result[i][j]['Year']}</h> <h> <b>Type:</b> ${liked_movies_result[i][j]['Type']}</h></div></div>`;
                                result_holder_div.appendChild(div);
                                j = j + 1;

                            }
                            i = i + 1;
                        }
                    }
                    else { //liked movies False
                        // don't append the result to the holder div.
                        console.log('no movies resutls will be appended');
                        
                    }
            }

            } catch (error) {
                console.log('Errors occured while processing the retreived data.');
            }
        }
        

        
        
    }


    return(
        <>
        <HomeNavBar />
        <div className="container">
            <section className="rec_section_holder">
            <section className="rec_form_section">
                 <div className="quationaire_holder">
                    <div className="quationaire_div_form">
                        <form onSubmit={handleSubmit}>
                            <div id="comma_warnings" className="comma_warnings_div"></div>
                            <div className="quation_holder">
                                <h className="quation_text">What year you want a movie to be released in : </h>
                                <input id="release_year"  className="quationaire_input_fields"></input>
                                <h className="random_movie_title"> (optional)</h>
                            </div>
                            <div className="quation_holder">
                                <h className="quation_text">What type of movies do you like : </h>
                                    {/* better to use options [movie,series,episode] */}                            
                                <select className="quationaire_input_fields" id="movies_type">
                                    <option value="any">Any</option>
                                    <option value="movie">Movie</option>
                                    <option value="series">Series</option>
                                    <option value="episode">Episode</option>
                                </select>
                                <h className="random_movie_title"> (optional)</h>
                            </div>
                            <div className="quation_holder">
                                {/* in here we will separate by comma and we append to a list we gonna send to the back-end, 
                                the back end will make each request with &s=key. then append the results to a list. then the list will be fitre out
                                based on the year the user specified. or we can use the year as another request factor. then randomelly chose from the
                                two joined lists. and make an API call for the resulted data, after that return to the front-end a list with all the data 
                                filtered by poster, title, year, and a probability Rate. gurss*/}
                                <h className="quation_text">Provide some keywords (separated by comma and no space around the comma) for the movies you would like to watch: <h className="random_movie_title">(this is important for us to detirmin accuratelly. and we recommand 4 keywords or less, more than that will make the response slower) </h></h>
                                <input id="keywords_text" required  className="quationaire_input_fields"></input>
                                <h className="random_movie_title_green"> (required)</h>
                            </div>
                            <div className="quation_holder">
                                <h className="quation_text">Provide the names of some movies you watched and liked before (separated by comma and no space around the comma) : </h>
                                <input id="liked_movies_names"  className="quationaire_input_fields"></input> <h className="random_movie_title"> (optional)</h>
                            </div>
                            
                            <button type="submit" disabled={isButtonDisabled} className="quationaire_btn">{ isButtonDisabled ? 'Loading Data...' : 'Get recommanded movies'}</button>
                            
                            

                        </form>
                    </div>

                 </div>
            </section>
            <section id="recomended_movies_holder_section" className="rec_result_section">
                <div id="recomended_movies_holder_div" className="rec_movies_holder_div">

                </div>

            </section>
            </section>
        </div>
        
        </>
    )
}

export default QuationairePageHolder