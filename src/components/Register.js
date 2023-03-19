import React, { useState } from 'react';
import registerPic from '../images/signup.jpg';
import {useFormik} from 'formik';
import signupSchema from '../schemas/Registervalidation';
import {Link,useNavigate} from 'react-router-dom';

const Register = () => {

  const [user, setUser] = useState({
    name:"",email:"",phone:"",password:"",cpassword:""
  });

  
  const navigate = useNavigate();


  // Formik 

  const { values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues:user,
    validationSchema:signupSchema,
    onSubmit: async (values,action) => {

      const {name,email,phone,password,cpassword} = values;

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          name,email,phone,password,cpassword
        })
      });


      const data = await res.json();

      if(res.status === 422){
        window.alert("Email is already exist");
      }else{
        window.alert("Registration Successfull");
        navigate('/login');
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
              <h2 className='form-head'>Sign up</h2>

              <form method='POST' onSubmit={handleSubmit} className='register-form vertical-flex'>
                <div className='form-group'>
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icon"></i>
                  </label>
                  <input type="text" name='name' id='name' autoComplete='off'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter your name' />
                  {errors.name && touched.name ? (<p className='form-error'>{errors.name}</p> ): null} 
                </div>

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
                  <label htmlFor="phone">
                  <i className="zmdi zmdi-phone-in-talk material-icon"></i>
                  </label>
                  <input type="text" name='phone' id='phone' autoComplete='off'
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter your phone' />
                   {errors.phone && touched.phone ? (<p className='form-error'>{errors.phone}</p> ): null} 
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

                <div className='form-group'>
                  <label htmlFor="cpassword">
                  <i className="zmdi zmdi-lock material-icon"></i>
                  </label>
                  <input type="password" name='cpassword' id='cpassword' autoComplete='off'
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter your confirm password' />
                   {errors.cpassword && touched.cpassword ? (<p className='form-error'>{errors.cpassword}</p> ): null} 
                </div>

                <div className='submit-btn form-btn'>
                  <button className='submit-form-btn' type="submit" name='signup' id='signup'>Register</button>
                </div>
              </form>

            </div>
            <div className='form-cols form-image'>
                <img src={registerPic} alt="registerImage" />
                <div className='form-image-msg'>
                  <Link to="/login">I am already register</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register