import React, { useEffect, useState } from 'react';
import homepic from '../images/homeimage.png';

const Home = () => {


  const [userName,setUserName] = useState('');
  const [show,setShow] = useState(false);


  const userHomePage = async () =>{
    try{
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getuserInfo`,{
        method:"GET",
        credentials:"include",
        headers:{  
          "Accept": "application/json",                    // process to get data from cookies or backend
          "Content-Type":"application/json"
        },
      });

      
      const data = await res.json();
      // console.log(data);
      setUserName(data.name);
      setShow(true);

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    userHomePage();
  },[]);


  return (
    <>
       <div className='home-page'>
        <div className='home-inner'>
        <div className='home-content'>
          <p className='home-para'>Welcome</p>
          <h1 className='home-head'>{ show ? `${userName}` : 'To real weather app'}</h1>
          <h2 className='home-label'>{ show ? 'Happy, to see you back' : 'Get the latest weather info of your city'}</h2>
        </div>

        <div className='home-image'>
          <img src={homepic} alt="homeimage" />
        </div>
        </div>
       </div>
    </>
  )
}

export default Home;