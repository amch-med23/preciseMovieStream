import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// importing styling in here
import '../styling/index_styling.css';

import NavBar from "./navbar.jsx";
import Footer from "./footer.jsx";

import movies_png from '../assets/movies_collections.png';
import movies_pub_data from '../assets/movies_public_data.png';
import movie_finder from '../assets/movie_finder.png';
import random_movie_pnj from '../assets/random_movie_night.jpg';

function Landing()
{   
    return(
        <>
        <NavBar />
           
                <div className="container">
                    <div className="landing_main_container">
                        <section className="intro_section">
                            <div className="hero_first">   
                                <div>
                                    <h1> Precise Movie Stream</h1>
                                    <h4> The tool that helps you detirmin the next greate movie to watch.</h4>
                                    <h4> This tool works as a recommendation system or (content promotion) based on your answer to a specific quationaire.</h4>

                                </div>
                               <div>
                                    <h5>Try 1 feature of this app without registering an account (as a guest) right now.</h5>
                                    <Link to="/guest_proceed"><button>Try as a guest</button></Link>
                                </div>
                                
                            </div>
                            <div className="hero_sec">
                                <img className="movies_collection_img" src={movies_png}></img>

                            </div>
                            
                        </section>
                        <section className="second_section">
                            <div className="sec_section_hero_1">
                                    <h2>Find that movie or that serie you always wanted.</h2>
                                    <h4>Have you ever though of a movie or you have seen it befoure but forget it?</h4>
                                    <h4>Hou can provide that movie keywords (words that are with in the movie context), and our system will try to give you the best guess.</h4>
                            </div>
                            <div className="sec_section_hero_2">
                                <img className="movie_finder_img" src={movie_finder}></img>
                            </div>
                            
                        </section>
                        <section className="third_section">
                            <div className="third_section_hero_1">
                                    <h2>Get public data about your favorite movie or serie.</h2>
                                    <h4>You can look up any movie or series that is in IMDB and we will provide more public data on it.</h4>
                                    <h4>Wheather you just encountered a movie from a result list on this app and you want to know more about it, or you just want to look a movie up. precise Movie Stream has you covered.</h4>
                            </div>
                            <div className="third_section_hero_2">
                                <img className="movies_pub_data_img" src={movies_pub_data}></img>
                            </div>
                        </section>
                    <section className="fourth_section">
                            <div className="forth_section_hero_1">
                                <h2>Don't know what to watch, get a random 10 movies each time from our Best IMDB movies/series collection</h2>
                                <h4>If you don't know what to watch, and want something random but good. Then look no more, This app has a random movies functionality. (you get it as a guest as well)</h4>
                                <h4>The result of this functionalty is generated from some of the best lists on IMDB.</h4>
                            </div>
                            <div className="forth_section_hero_2">
                                <img className="random_movie_jpg" src={random_movie_pnj}></img>
                            </div>
                    </section>
                   </div>
                </div>

        <Footer />
        </>
    )
}

export default Landing