import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logopic from '../images/realweather.png';

import { userContext } from '../App';


const Navbar = () => {

  const [mediaIcon, setMediaIcon] = useState(false);

  const { state, dispatch } = useContext(userContext);


  const RenderMenu = () =>{
    if(state){
      return(
        <>
        <Link className='nav-item' to="/">Home</Link>
        <Link className='nav-item' to="/weather">Weather</Link>
        <Link className='nav-item' to="/contact">Contact</Link>
        <Link className='nav-item' to="/logout">Logout</Link>
        </>
      )
    }else{
      return(
        <>
         <Link className='nav-item' to="/">Home</Link>
        <Link className='nav-item' to="/login">Login</Link>
        <Link className='nav-item' to="/register">Register</Link>
        </>
      )
    }
  }

  return (
    <>
        <header className='header'>
          <Link to="/"><img src={logopic} className="logo" alt="logo" /></Link>
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