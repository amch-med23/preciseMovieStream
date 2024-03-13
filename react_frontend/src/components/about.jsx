import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "./navbar";
import Footer from "./footer";

import '../styling/index_styling.css';
import octacat from '../assets/octacat.png';
import linked_in from '../assets/linked_in.png';
import twitter from '../assets/twitter.png'

function About()
{
    return(
        <>
        <NavBar />
        <div className="container">
            <section className="about_main_section">
            <div className="initial_about">
                <p>Welcom to <b>Precise Movie Stream.</b></p>   
                <p> This service helps you chose the best movie or serie for you to watch based on your answers to a specific questionnaire.<h style={{'color' : 'red', 'font-size': "small"}}> (not a streaming service for now.)</h></p>  
                <p> There are many more functionalities planned for this system, but this is an MVP(Minimal Viable Project) for now.</p>
                <p> The user can create an account or proceed as a guest (with minumum system functionalities).</p>
            </div>
            <div className="second_about">
                <h>This app is a Movie Recomendation System, it works by requesting the user to fill a questionaire form (simple form), it requests keywords to look for, plus other relevant data.</h><br /><br />
                <h>The idea was inspired by the confusion that happens in the process of selecting what to watch next on a large media streaming service, then of course Holberton + ALX required us to build portfolio project. I proceeded with the idea from there.</h> <br />  <br/>             
                <h>We provide 3 services:<br /><br /> <h style={{'color': 'red', 'font-weight': 'bold'}}>'Get public infos about a movie': </h>this permits you to lookup some public data on a movie by intering it's title.</h><br /> <br />
                <h><h style={{'color': 'red', 'font-weight': 'bold'}}>'Random Movies': </h>This provides you with a list of 10 movies each time you press 'Randomize'. the data in this functionality is not the whole IMDB content, instead we gatheared a list of tsome highly rated movies. and we pick 10 random movies from there each time. The lenghth of this pool can change at any time, giving the user more movies to watch.</h> <br /><br />
                <h>and <h style={{'color': 'red', 'font-weight': 'bold'}}>'Submit your interests':</h> This is the app main functionality where you provide the keywords and the relevant data, then the system recommends to you a list of movies/series to watch. The main algorithm for now is a search based algorithm, not a machine learning algorithm.</h> <br /> <br />
                <h>We are using OMDB database to get the data. This external API is a community version of the IMDB Database.</h><br /><br />
                <h>You can find this app repository in : <Link to="https://github.com/amch-med23/preciseMovieStream" target="blank" style={{'color': 'blue'}}>APP REPO ON GITHUB</Link></h> <br /><br />
                
               
            </div>
            
                
            </section>
            <section style={{height: '140px'}}>
            <div className="third_about">
                    <h className="h_last_about">Developed by : <h style={{'font-weight': 'bold', 'color': 'yellowgreen'}}>Mohamed Amouch</h> , a software engneering student @ Holbertoon school and ALX africa.</h>
                    <h className="h_last_about"> My github: <Link target="blank" to="https://github.com/amch-med23"><img src={octacat} className="octacat_class"></img></Link>, you can find me in linkedin at: <Link to="https://linkedin.com/in/mohamed-amouch" target="blank"><img src={linked_in} className="linked_in_class"></img></Link>, and in twitter (now X) at: <Link to="https://twitter.com/amouch_med" target="blank"><img className="twitter" src={twitter}></img></Link></h>
                </div>
            </section>
        </div>
        <Footer />
        
        </>
    )
}

export default About