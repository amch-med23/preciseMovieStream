import { Routes, Route } from 'react-router-dom';
import './App.css'
import React from 'react';
import Landing from './componenets/landing';
import Home from './componenets/home';
import Login from './componenets/login';
import Register from './componenets/register';
import About from './componenets/about';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Landing /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/home' element={ <Home />} />
        <Route path='/about' element={ <About /> } />
      </Routes>
    </>
  )
}

export default App
