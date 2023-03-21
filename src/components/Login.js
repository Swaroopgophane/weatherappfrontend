import React, { useContext, useState } from 'react';
import loginPic from '../images/signin.jpg';
import {useFormik} from 'formik';
import signinSchema from '../schemas/Loginvalidation';
import { Link, useNavigate } from 'react-router-dom';

import { userContext } from '../App';

const Login = () => {

  const [logUser, setLogUser] = useState({
    email:"",password:""
  });

  const {state, dispatch} = useContext(userContext);

  const navigate = useNavigate();


  // Formik 

  const { values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues:logUser,
    validationSchema:signinSchema,
    onSubmit: async (values,action) => {

      const {email,password} = values;

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`,{
        method:"POST",
        credentials:"include",
        headers:{
          Accept: "application/json",
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          email,password
        })
      });

      const data = await res.json();

      if(res.status === 400){
        window.alert("Invalid Details");
      }else{
        dispatch({type:"USER", payload:true});
        localStorage.setItem('RWVALIDID',JSON.stringify('true'));
        window.alert("Login successfully");
        navigate('/');
      }

      action.resetForm();
    }
  });

  return (
    <>
       <div className='common-page-container'>
        <div className='common-page-inner'>
          <div className='flex-container'>
            <div className='form-cols'>
              <h2 className='form-head'>Sign in</h2>
              <form method='POST' onSubmit={handleSubmit} className='login-form vertical-flex'>
                

                <div className='form-group'>
                  <label htmlFor="email">
                  <i className="zmdi zmdi-email material-icon"></i>
                  </label>
                  <input type="email" name='email' id='email' autoComplete='off'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter your email' />
                  {errors.email && touched.email ? (<p className='form-error'>{errors.email}</p> ): null} 
                </div>

                

                <div className='form-group'>
                  <label htmlFor="password">
                  <i className="zmdi zmdi-lock material-icon"></i>
                  </label>
                  <input type="password" name='password' id='password' autoComplete='off'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter your password' />
                  {errors.password && touched.password ? (<p className='form-error'>{errors.password}</p> ): null} 
                </div>

                <div className='submit-btn form-btn'>
                  <button className='submit-form-btn' type="submit" name='signin' id='signin'>Login</button>
                </div>

              </form>
            </div>
            <div className='form-cols form-image'>
                <img src={loginPic} alt="loginImage" />
                <div className='form-image-msg'>
                  <Link to="/register">Create an account</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;