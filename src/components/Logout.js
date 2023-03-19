import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(userContext);


    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res) => {
            dispatch({type:"USER", payload:false});
            navigate('/login',{ replace: true });
            if(res.status !== 200){
                console.log("Logout error");
            }
        }).catch((err) => {
            console.log(err);
        });
    });

  return (
    <>
    
    </>
  )
}

export default Logout