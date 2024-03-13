import { Routes, Route } from 'react-router-dom';
//import './App.css'
import './styling/index_styling.css';
import React from 'react';
import Landing from './components/landing.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import About from './components/about.jsx';
import GuestProceed from './components/guest_proceed.jsx';
import GuestRandomMoviesPage from './components/guest_random_movies.jsx';
import EmailConfirmation from './components/email_confirmation.jsx';
import RegisterSuccess from './components/register_success.jsx';
import RandomResultHolder from './components/random_result_page.jsx';
import QuationairePageHolder from './components/quationaire_page.jsx';
import MediaInfos from './components/media_infos.jsx';
import GenericNotFound from './components/not_found.jsx';
import ResetPassword from './components/password_reset.jsx';
import PasswordResetProceed from './components/password_reset_process.jsx';
import PasswordResetSuccess from './components/password_reset_success.jsx';

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
        <Route path='/guest_random_movies_page' element={ <GuestRandomMoviesPage />} />
        <Route path='/email_confirmation' element={ <EmailConfirmation />} />
        <Route path='/register_success' element={ <RegisterSuccess /> } />
        <Route path='/random_results' element={<RandomResultHolder />} />
        <Route path='/quationair_results' element={ <QuationairePageHolder />} />
        <Route path='/media_infos' element={ <MediaInfos />} />
        <Route path='/password_reset' element={<ResetPassword />} />
        <Route path='/password_reset_process' element={ <PasswordResetProceed /> }/>
        <Route path='/password_reset_success' element={ <PasswordResetSuccess />} />
        <Route path='*' element={<GenericNotFound />} />
      </Routes>
    </>
  )
}

export default App
