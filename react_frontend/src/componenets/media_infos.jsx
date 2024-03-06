import React from "react";
import axios  from "axios";
import { Fragment } from "react";

import '../styling/index_styling.css';
import HomeNavBar from "./home_navbar";
import { render } from "react-dom";

function MediaInfos(){

    let apiEndPoint = "http://wsl.localhost:5000/api/v1/";

    async function handleSubmit(event){
        
        event.preventDefault();
        
        let title = document.getElementById('media_title').value;
        let year = document.getElementById('release_year').value;
        let plot = document.getElementById('plot_type').value;

        let obj = {}
        let available_attr = ['year', 'plot', 'title'];
        let values = [year, plot, title];
        let i = 0
        
        while (i < available_attr.length ){
            obj[available_attr[i]] = values[i];
            i = i +1;
        }
 
        try {
            const response = await axios.post(apiEndPoint.concat('movie_infos'), obj);
            const responseData = response.data;
            //console.log(responseData['data']);
            let data_obj = responseData['data'];
            if (data_obj['Response'] === 'False'){
                
                let error_txt = data_obj['Error'];
                let contentDiv = document.getElementById('movie_text_value');
                contentDiv.innerHTML = ``;
                let data_paragraph = document.getElementById('data_holder');
                data_paragraph.innerHTML = `<h class="omdb_res_txt">The result from the OMDB is:</h><div class="movie_not_found"> ${error_txt} </div>`;
                
            }
            else{
                let data_paragraph = document.getElementById('data_holder');
                data_paragraph.innerHTML = `<h class="omdb_res_txt">The result from the OMDB is:</h><div><img src='${data_obj['Poster']}'></img></div><div class='plot_text'>${data_obj['Plot']}</div><div class="rest_text_data"></div>`;
                // we need to go throgh all the keys and values of this dictionary and output them via a loop.
                let keys = Object.keys(data_obj);
                
                //console.log(keys)
                //in this iterarion we can set the values and 
                let contentDiv = document.getElementById('movie_text_value');
                contentDiv.innerHTML = ``;

                Object.entries(data_obj).forEach(([key, value]) => {
                    if(key !== 'Plot' && key !=='Poster' && key !== 'imdbID' && key !== 'Response'){
                        
                        if (key === 'Ratings' && data_obj['Rating'] !== null){
                            // this works.
                            let div = document.createElement('div');
                                div.innerHTML = `<div class="res_data_text">Ratings :</div>`;
                                contentDiv.appendChild(div);
                                if (Object.keys(value).length == 0){
                                    console.log('value is null');
                                    let div = document.createElement('div');
                                        div.innerHTML = `<div class="res_data_text"><h class="rating_key_h">N/A</h></div>`;
                                        contentDiv.appendChild(div);
                                }
                                else{
                                    value.forEach((item) => {
                                
                                        let div = document.createElement('div');
                                        div.innerHTML = `<div class="res_data_text"><h class="rating_key_h">${item.Source}</h> : <h class="value_h">${item.Value}</h></div>`;
                                        contentDiv.appendChild(div);
                                    })
                                }
                        }
                            
                        else if(key !== 'Ratings'){
                            let div = document.createElement('div');
                            div.innerHTML = `<div class="res_data_text"><h class="key_h">${key}</h> : <h class="value_h">${value}</h></div>`;
                            contentDiv.appendChild(div);
                        }
                        
                    }
                });
                
            }
        }
        catch (error){
            console.error('error occured: ' + error)
        }

    }
    
    return(
        <>
        <HomeNavBar />
        <div className="container_movie_info">
            <section className="media_info_section">
                <p>Fill the form bellow:</p>
                
                    <div className="requested_media_div">
                        <form onSubmit={handleSubmit}>
                            <div className="data_enty_div">
                            <h>Movie title: * &nbsp;</h>
                            <input id="media_title" placeholder="movie/serie title" required></input>
                            </div>
                            
                            <div className="data_enty_div">
                            <h>Release Year: &nbsp;</h>
                            <input id="release_year" placeholder="release year"></input>
                            </div>
                            
                            <div className="data_enty_div">
                            <h>plot: &nbsp;</h>
                            <select id="plot_type">
                                <option value="full">Full</option>
                                <option value="short">Short</option>
                            </select>
                            </div>
                            
                            <button type="submit" className="movie_info_btn">search</button>
                            </form>
                    </div>
                
            </section>
            <section className="movie_infos_result" id="data_holder" >
                    
            </section>
            <div id="movie_text_value" className="movie_text_holder">

            </div>

        </div>
        
        </>
    )
}

export default MediaInfos