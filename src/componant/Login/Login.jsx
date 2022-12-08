import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Login({saveUserData}) {

 let navigate = useNavigate();
 const [error ,setErorr] = useState('');
 const [errorList ,setErorrList] = useState([]);
const[isLoding , setisLoding] = useState(false);
 const [user , setUser] = useState({
    email:'',
    password:'',

  });

  function getUserLoginData(e){
     let myUser ={...user};
     myUser[e.target.name] = e.target.value ;
     setUser(myUser) ;
    
  }


  async function sentloginDataToApi(){
  let {data} = await axios.post(`https://route-movies-api.vercel.app/signin` , user); 
   console.log(data);
   if (data.message == 'success' )
   {
    setisLoding(false);
    localStorage.setItem('userToken', data.token);
    navigate('/');
    saveUserData();
    


   }
   else{
    setisLoding(false);

   setErorr(data.message);
   }

  }
  function submitloginForm(e){
      
    setisLoding(true);
    e.preventDefault();
    
    let validation= valitateForm();

    if (validation.error)
    {
      setisLoding(false);
      setErorrList(validation.error.details);

    }
    else{
      sentloginDataToApi();

    }

  }
  function valitateForm(){
    let scheme = Joi.object({
      email :Joi.string() .email( {tlds:{allow:['com','net']}}).required() ,
      password :Joi.string().pattern(/^[A-Z][a-z]{5,15}/).required(), 
    });
    return scheme.validate(user,{abortEarly:false});
  }
  return <>
{errorList.map((err,index)=>{
  if(err.context.label === 'password')
  {

  return <div key={index}  className="alert alert-danger my-2">password invalid</div>
 }
  else{
   return <div key={index}  className="alert alert-danger my-2">{err.message}</div>

  } 
})} 


{error.length >0 ?<div className="alert alert-danger my-2">{error}</div>:''
}

  <form onSubmit={submitloginForm}>

<label htmlFor="email">Email:</label>
<input onChange={getUserLoginData} type="email" className='form-control my-2 my-input'  name='email' id='email'/>
<label htmlFor="password">password</label>
<input onChange={getUserLoginData} type="password" className='form-control my-2 my-input'  name='password' id='password'/>
  
  <button className='btn btn-info my-4'>
    {isLoding ==true ?<i className='fas fa-spinner fa-spin'></i> :'login'} </button>
  </form>
  
  
  </>
    
  
}
