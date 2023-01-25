import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import login from '../../images/gaming.ebaf2ffc84f4451d.jpg';
import axios from 'axios';
import joi from 'joi';
import { Helmet } from 'react-helmet';


export default function Login({saveUserData}) {

  const [user, setUser] = useState({

    'email':'',
    'password':''
  });

  let getInputValue=(e)=>{
    let myUser={...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    console.log(myUser)
  }

  let navigate= useNavigate();

  let goToHome=()=>{
    navigate('/')
  }

  const [errorMsg, setErrorMsg] = useState('');
  const [errorsList, setErrorsList] = useState([]);
  
  let submitFormData=async(e)=>{
    e.preventDefault();

    let validationResponse = validateForm();
    // console.log(validationResponse);
    if(validationResponse.error){
      setErrorsList(validationResponse.error.details);
    }
    else{

      let {data}= await axios.post('https://sticky-note-fe.vercel.app/signin',user);
      // console.log(data);
      if(data.message=='success'){
        localStorage.setItem('token',data.token);
        saveUserData();
        goToHome();
      }
      else{
        setErrorMsg(data.message);
        console.log(errorMsg)
      }
    }

  };

  let validateForm=()=>{
    const schema=joi.object({

      email: joi.string().required().email({tlds:{allow:["com","net"]}}),
      password: joi.string().alphanum().required().min(8).max(40),
    });

    return schema.validate(user,{abortEarly:false});
  }

  let forget =()=>{
    alert('اعمل ايميل جديد هه');
  }


  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="container">
      <div className="row g-0 vh-100 align-items-center">
        <div className="col-lg-6">
          <div className={`login-img`}>
          <img src={login} className='w-100' />
          </div>
        </div>

        <div className="col-lg-6">
          <div className={`${styles.loginInfo} text-center p-5`}>
            <img src={logo} className="logo mb-3" />
            <h2 className='mb-3'>Log in to GameOver</h2>

            {errorsList.map((error,index)=> <div key={index} className='alert alert-danger py-1'>{error.message}</div>)}

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}

            <div className="form pb-3 mb-3 border-bottom">
              <form onSubmit={submitFormData}>
                <input type="email" onChange={getInputValue} name='email' className='form-control m-auto mb-3' placeholder='Email' />
                <input type="password" onChange={getInputValue} name='password' className='form-control m-auto mb-3' placeholder='Password' />
                <button type='submit' className='submit form-control m-auto mb-3'>login</button>
              </form>
            </div>
            <div className='w-100'><a onClick={forget} className='text-primary'>forget password?</a></div>
            <div className='w-100'>Not a member? <Link to='/signup'>create account</Link></div>
          </div>
        </div>
      </div>
      </div>
      
    </>
  )
}
