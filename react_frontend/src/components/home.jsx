import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import HomeNavBar from "./home_navbar";
import HomeFooter from "./home_footer";

import '../styling/index_styling.css';

function Home()
{
    const location = useLocation();
    const navigate = useNavigate(); 

    const user_name = localStorage.getItem('pms_user_name');
    const user_email = location.state.user_email;
    // make sure when logout to destroy the 'pms_user_name' and 'pms_login_token'.

    //console.log('you have loged in as: ' + user_name);
    //console.log('your loged in email is: ' + user_email);

    //let name_paragrarph = document.getElementById('intr_user_name');
    //name_paragrarph.innerHTML = '<div style="color: red;">user_name</div>';

    function quationaire_result_submit() {

        //redirecting to result_page, with the username and email address, with an additional parameter 'quationaire:true' to show you the submit form.
        navigate('/quationair_results', {'state': {'user_name': user_name, 'user_email': user_email}}); //we need to pass the params in here.
    }

    function random_result_submit(){
       //window.alert('redirecting to result_page, with no parameters.');
       //alert("redirecting to result_page, with no parameters.");
       navigate('/random_results');
    }
    function movie_infos_result_submit(){
        //alert("navigating to movie details page, with no parameters");
        navigate('/media_infos');
    }


    // so in here we just need to check if the 'pms_user_name' and 'pms_ogi_token' are not null befour we handle the user data.
    return(
        <>
            <HomeNavBar />
            <div className="container">
                <section className="home_welcom_section">
                    <br />
                    <h className="user_greetings">Welcome back&nbsp; <h id="inter_user_name" className="user_name"> {user_name}</h> ,we are glad you are here.</h>
                    <br/> <br />

                </section>
                <section className="home_main_selection_section">
                    <div className="random_movie_div">
                        <button onClick={ random_result_submit }>See random movies from random categories</button>
                        <p> By clicking this you will see the result of a random movies or series list that you can watch. <h style={{color :"red"}}>remember this has no link to your interrests. The results are random</h></p>
                    </div>
                    <div className="home_quationaire_movie_div">
                        <button onClick={ quationaire_result_submit }>Submit your interests</button>
                        <p>By clicking this you will be submitting a form so we can know you better. <h style={{color: 'red'}}>and this will result in a list of movies and series recommanded for you.</h></p>
                    </div>
                    <div className="info_about_movie_div">
                        <button onClick={ movie_infos_result_submit }>Get public informations about a movie/serie</button>
                        <p>By clicking this you will get public inforamtions about the movie/serie title you want. <h style={{color: 'red'}}>(we are using Omdb database)</h></p>
                    </div>
                </section>

            </div>
            
            
        </>
    )
}

export default Home