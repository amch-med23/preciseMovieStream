import React from 'react';
import '../styling/nav_styling.css';
import { Link, useNavigate } from 'react-router-dom';

import '../styling/nav_styling.css';
import '../styling/index_styling.css';
import logo from '../assets/pms_logo.png';
 
function HomeNavBar() {

    const navigate = useNavigate();

    function handleClick(){        
        localStorage.removeItem('pms_user_name');
        localStorage.removeItem('pms_login_token');
        //console.log('you are logging out..., the locall storage data wil be destroyed ...');
        navigate('/');
    }
    
    let current_user_name = localStorage.getItem('pms_user_name');
    let current_login_token = localStorage.getItem('pms_login_token');

    if( current_user_name != null && current_login_token != null){
          return (
                <div className='home_navbar'>
                    <img src={logo} className='logo'></img>
                    
                    <button onClick={ handleClick} className='navbar_btn'>log out</button>
                </div>
            )
    }
    else{
        return (
            <div className="navbar">
                <h></h>
            </div>
        )
    }

}

export default HomeNavBar