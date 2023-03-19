import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {

  const [userData,setUserData] = useState({
    name:"",email:"",phone:"",message:""
  });

  const navigate = useNavigate();


  const userContact = async () =>{
    try{
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getuserInfo`,{
        method:"GET",
        headers:{                                 // process to get data from cookies or backend
          "Content-Type":"application/json"
        },
      });

      
      const data = await res.json();
      // console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

      if(!res.status === 200){
        throw new Error('User not valid');      // this error not show on console
      }

    }catch(err){
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(()=>{
    userContact();
  },[]);


  // we are storing the data in states

  const inputHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value});
  }


  // send the data to backend

  const sendForm = async (e) =>{
    e.preventDefault();

    const {name,email,phone,message} = userData;

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contact`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    });


    const data = await res.json();

    if(!data){
      console.log("Message not send");
    }else{
      alert("Message send successfully");
      setUserData({...userData,message:""});
    }


  }


  return (
    <>
       <div className='contact-info'>
          <div className='contact-info-col'>
          <i className="zmdi zmdi-phone contact-info-icon"></i>
            <div className='contact-info-content'>
              <p>Phone</p>
              <span className='contact-info-text'>+ 91 8668967171</span>
            </div>
          </div>
          <div className='contact-info-col'>
          <i className="zmdi zmdi-email contact-info-icon"></i>
            <div className='contact-info-content'>
              <p>Email</p>
              <span className='contact-info-text'>swaroop.gophane2017@gmail.com</span>
            </div>
          </div>
          <div className='contact-info-col'>
          <i className="zmdi zmdi-pin contact-info-icon"></i>
            <div className='contact-info-content'>
              <p>Address</p>
              <span className='contact-info-text'>Kolhapur, India</span>
            </div>
          </div>
        </div>


        <div className='contact-form-container'>
          <div className='contact-container'>
            <h2>Get In Touch</h2>
            <div className='contact-form-inner'>
              <form method='POST' id='contact_form'>
                  <div className='contact_form_fields'>
                    <input type="text" id='contact_form_name' className='contact_form_name input_field' placeholder='Your Name' 
                    name="name"
                    value={userData.name}
                    onChange={inputHandler}
                    required={true} />

                    <input type="email" id='contact_form_email' className='contact_form_email input_field' placeholder='Your Email' 
                    name="email"
                    value={userData.email}
                    onChange={inputHandler}
                    required={true} />

                    <input type="text" id='contact_form_phone' className='contact_form_phone input_field' placeholder='Your Phone' 
                    name="phone"
                    value={userData.phone}
                    onChange={inputHandler}
                    required={true} />
                  </div>

                  <div className='contact-form-textarea'>
                    <textarea className='form-textarea' placeholder='Message'  
                    name="message"
                    value={userData.message}
                    onChange={inputHandler}
                    cols="30" rows="10"></textarea>
                  </div>

                  <div className='contact-form-btn'>
                    <button onClick={sendForm} type='submit' className='contact-btn'>Send Message</button>
                  </div>
              </form>
            </div>
          </div>
        </div>

    </>
  )
}

export default Contact