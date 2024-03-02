import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import '../styling/index_styling.css';

import NavBar from "./navbar";
import Footer from "./footer";

function Login()
{
    const navigate = useNavigate();
    const location = useLocation();
    const apiEndPoint = "http://wsl.localhost:5000/api/v1/";

    function handlelogIn(event){
        event.preventDefault();
        let user_email = document.getElementById('user_email').value;
        let user_password = document.getElementById('user_password').value;

        //console.log('user email: ' + user_email + ', user_password: ' + user_password);
        let login_obj = {};
        let available_attr = ['user_email', 'user_password'];
        let form_values = [user_email, user_password];
        
        let i = 0;
        while (i < 2){
            login_obj[available_attr[i]] = form_values[i];
            i = i + 1;
        }
        console.log('login object elems are: user_email: '+ login_obj['user_email'], 'user_password: ' + login_obj['user_password']);
        axios.post(apiEndPoint.concat('login'), login_obj).then(res => {
            console.log(res.data['login_creds_check']);
            if (res.data['login_creds_check'] === "passed"){
                //extract the user_name from the data package and passe it to /Home.
                // removing the error text if there is any
                let login_error_paragraph = document.getElementById('login_error');
                login_error_paragraph.innerText = "";

                let login_token = res.data['login_token'];
                let user_name = res.data['user_name'];
                let user_email = res.data['user_email']

                console.log('passed');
                console.log('your login token is : ' + login_token);
                // first we set the login_token, then we verify it, then we van navigate to '/home'
                //set login_token in the localStorage objet. (this will define the home navbar (login/logout buttons) [this token should be destroyed when logedout]).
                localStorage.setItem('pms_login_token', login_token);
                localStorage.setItem('pms_user_name', user_name);

                let active_login_token = localStorage.getItem('pms_login_token');
                if (active_login_token == login_token){
                    navigate('/home', {'state':{'user_name': user_name, 'user_email': user_email}});
                } else{
                    alert('there was errors while setting the login_token variable');
                }
                //verify the login_token value then navigate to the '/home' route.
                 
            }
            else if (res.data['login_creds_check'] === 'failed'){
                let login_error_paragraph = document.getElementById('login_error');
                login_error_paragraph.innerText = "the email or the password you supplied is wrong.";
            }
        });
        // just a note, but we can use locastorage to save the login_status, when the user in loged in.
        // let name_value = localStorage.getItem('name'), or .setItem('key', 'value'), or .removeItem('key')
    }
    return(
        <>
        <NavBar />
        <div className="container">
                <section>
                    <br />
                    <h>This is the Login page, use your credentials to login</h> 
                    <br /> <br />
                    <p id="login_error" className="form_error_class"></p>
                    <form onSubmit={handlelogIn}>           
                        <div className="input_box">
                            <h>Enter your email:</h><br />
                            <input type="email" required id='user_email'></input>
                        </div>
                        <div className="input_box">
                            <h>Enter your password:</h><br />
                            <input type="password" required minLength={8} id="user_password"></input>
                            <br></br>
                        </div>
                        <button type="submit">log in</button>
                    </form>
                </section>
        </div>
        <Footer />
        </>
    )
}

export default Login