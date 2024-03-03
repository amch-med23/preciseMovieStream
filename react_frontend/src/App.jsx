import { Routes, Route } from 'react-router-dom';
//import './App.css'
import './styling/index_styling.css';
import React from 'react';
import Landing from './componenets/landing';
import Home from './componenets/home';
import Login from './componenets/login';
import Register from './componenets/register';
import About from './componenets/about';
import GuestProceed from './componenets/guest_proceed';
import GuestHome from './componenets/guest_home';
import EmailConfirmation from './componenets/email_confirmation';
import RegisterSuccess from './componenets/register_success';
import RandomResultHolder from './componenets/random_result_page';
import QuationairePageHolder from './componenets/quationaire_page';
import MediaInfos from './componenets/media_infos';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Landing /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/home' element={ <Home />} />
        <Route path='/about' element={ <About /> } />
        <Route path='/guest_proceed' element={ <GuestProceed />} />
        <Route path='/guest_home' element={ <GuestHome />} />
        <Route path='/email_confirmation' element={ <EmailConfirmation />} />
        <Route path='/register_success' element={ <RegisterSuccess /> } />
        <Route path='/random_results' element={<RandomResultHolder />} />
        <Route path='/quationair_results' element={ <QuationairePageHolder />} />
        <Route path='media_infos' element={ <MediaInfos />} />
      </Routes>
    </>
  )
}

export default App
