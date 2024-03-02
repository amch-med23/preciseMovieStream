import React from 'react';
import { Link } from 'react-router-dom';

import '../styling/nav_styling.css';

export default class NavBar extends React.Component {

    componentDidMount(){

    }

    render()
    {
        return (
            <div className="navbar">
                <img src='src/assets/sand_tech.png' className='logo'></img>

                <Link to="/"><button className='navbar_btn'>Landing</button></Link>
                <Link to="/about"><button className='navbar_btn'>About us</button></Link> 
                <Link to="/login"> <button className='navbar_btn'>Login</button></Link>
                <Link to="/register"><button className='navbar_btn'>Register</button></Link>   
            </div>
        )
    }
    

}