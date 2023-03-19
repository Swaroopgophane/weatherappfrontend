import React, { createContext, useReducer } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Weather from './components/Weather';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';

import { reducer, initialState } from './reducer/Usereducer';


export const userContext = createContext();

const App = () => {

  const [state, dispatch] =  useReducer(reducer, initialState);

  return (
    <>

    <userContext.Provider value={{state,dispatch}} >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route index element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>

      </userContext.Provider>

    </>
  )
}

export default App;