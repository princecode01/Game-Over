import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import logo from '../../images/gaming.ebaf2ffc84f4451d.jpg'
import axios from 'axios';
import joi from 'joi';
import { Helmet } from 'react-helmet';



export default function SignUp() {

  const [user, setUser] = useState({

    'first_name':'',
    'last_name':'',
    'email':'',
    'password':'',
    'age':'',

  });

  let navigate= useNavigate();

  let goToLogin=()=>{
    navigate('/login')
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

      let {data}= await axios.post('https://sticky-note-fe.vercel.app/signup',user);
      console.log(data);
      if(data.message=='success'){
        goToLogin();
      }
      else{
        setErrorMsg(data.message);
        console.log(errorMsg)
      }
    }

  };

  let getInputValue=(e)=>{
    let myUser={...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    // console.log(myUser)
  }

  let validateForm=()=>{
    const schema=joi.object({

      first_name: joi.string().alphanum().required().min(3).max(10),
      last_name: joi.string().alphanum().required().min(3).max(10),
      age: joi.number().required().min(18).max(80),
      email: joi.string().required().email({tlds:{allow:["com","net"]}}),
      password: joi.string().alphanum().required().min(8).max(40),
    });

    return schema.validate(user,{abortEarly:false});
  }

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div className="row g-0 vh-100 align-items-center mt-5">
        <div className="col-lg-6">
          <div className="login-img">
            <img src={logo} className='w-100' />
          </div>
        </div>

        <div className="col-lg-6">
          <div className={`${styles.loginInfo} text-center p-5`}>
            <h4 className='mb-3'>Create My Account!</h4>

            {errorsList.map((error,index)=> <div key={index} className='alert alert-danger py-1'>{error.message}</div>)}

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}
            <div className="form pb-3 mb-3 border-bottom">
              <form onSubmit={submitFormData} className='d-flex flex-wrap justify-content-between'>
                <input type="text" onChange={getInputValue} className={`form-control up mb-3 ${styles.userName}`} name='first_name' placeholder='First Name' />
                <input type="text" onChange={getInputValue} className={`form-control up mb-3 ${styles.userName}`} name='last_name' placeholder='Last Name' />
                <input type="email" onChange={getInputValue} className='form-control up mb-3' name='email' placeholder='Email' />
                <input type="number" onChange={getInputValue} className='form-control up mb-3' name='age' placeholder='Age' />
                <input type="password" onChange={getInputValue} className='form-control up mb-3' name='password' placeholder='Password' />
                <button type='submit' className='submit form-control up mb-3 text-white p-2'>create account</button>
                <small>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</small>
              </form>
            </div>
            
            <div className='w-100'>already a member? <Link onClick={goToLogin}>Login</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}





// export default function SignUp() {

//     useEffect(() => {
      
//         
//       getResponse()
//     }, [])


//   return (
    
//     <>
        
//     </>
//   )
// }



