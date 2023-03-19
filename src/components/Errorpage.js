import React from 'react';
import errorpic from '../images/errorpage.png';
import {Link} from 'react-router-dom';

const Errorpage = () => {
  return (
   <>
   <div className='error-page'>
      <div className='error-content'>
        <img src={errorpic} alt="errorpageimage" />
        <div className='error-btn'>
          <h2>Page Not Found</h2>
          <Link to='/' className='error-link'>Go back</Link>
        </div>
      </div>
   </div>
   </>
  )
}

export default Errorpage;