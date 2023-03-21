import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logopic from '../images/realweather.png';

import { userContext } from '../App';


const Navbar = () => {

  const [mediaIcon, setMediaIcon] = useState(false);

  const { state, dispatch } = useContext(userContext);


  const checkValidUser = () =>{
    
    const getvId = localStorage.getItem('RWVALIDID');
    const userValidId = JSON.parse(getvId);

    if(userValidId === 'true'){
      dispatch({type:"USER", payload:true});
    }

  }


  useEffect(()=>{
    checkValidUser();
  },[])


  const RenderMenu = () =>{
    if(state){
      return(
        <>
        <Link className='nav-item' to="/" onClick={() => setMediaIcon(false)}>Home</Link>
        <Link className='nav-item' to="/weather" onClick={() => setMediaIcon(false)}>Weather</Link>
        <Link className='nav-item' to="/contact" onClick={() => setMediaIcon(false)}>Contact</Link>
        <Link className='nav-item' to="/logout" onClick={() => setMediaIcon(false)}>Logout</Link>
        </>
      )
    }else{
      return(
        <>
         <Link className='nav-item' to="/" onClick={() => setMediaIcon(false)}>Home</Link>
        <Link className='nav-item' to="/login" onClick={() => setMediaIcon(false)}>Login</Link>
        <Link className='nav-item' to="/register" onClick={() => setMediaIcon(false)}>Register</Link>
        </>
      )
    }
  }

  return (
    <>
        <header className='header'>
          <Link to="/"><img src={logopic} className="logo" alt="logo" onClick={() => setMediaIcon(false)} /></Link>
          <nav className={mediaIcon ? 'nav mobile-nav-func' : 'nav'}>
            <ul className='nav-links'>
              
              <RenderMenu />
              
            </ul>
          </nav>

          <div className='mobile-nav'>
            <i className="zmdi zmdi-menu" onClick={() => setMediaIcon(!mediaIcon)}></i>
          </div>
        </header>

        <Outlet />
    </>
  )
}

export default Navbar;