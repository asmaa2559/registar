import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Registar() {

 let navigate = useNavigate();
 const [error ,setErorr] = useState('');
 const [errorList ,setErorrList] = useState([]);
const[isLoding , setisLoding] = useState(false);
 const [user , setUser] = useState({
  first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:'',

  });

  function getUserRegistaData(e){
     let myUser ={...user};
     myUser[e.target.name] = e.target.value ;
     setUser(myUser) ;
    
  }


  async function sentRegistarDataToApi(){
  
  let {data} = await axios.post(`https://route-movies-api.vercel.app/signup` , user); 
   console.log(data);
   if (data.message == 'success' )
   {
    setisLoding(false);
    navigate('/login')


   }
   else{
    setisLoding(false);

   setErorr(data.message);
   }

  }
  function submitRegistarForm(e){
      
    setisLoding(true);
    e.preventDefault();
    
    let validation= valitateForm();

    if (validation.error)
    {
      setisLoding(false);
      setErorrList(validation.error.details);

    }
    else{
      sentRegistarDataToApi();

    }

  }
  function valitateForm(){
    let scheme = Joi.object({
      first_name:Joi.string().pattern(/^[A-Z]/).min(3).max(6).required() ,
      last_name :Joi.string().pattern(/^[A-Z]/).min(3).max(6).required (),
      age :Joi.number().min(15).max(80).required(),
      email :Joi.string() .email( {tlds:{allow:['com','net']}}).required() ,

      password :Joi.string().pattern(/^[A-Z][a-z]{2,15}/).required(), 

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

  <form onSubmit={submitRegistarForm}>
<label htmlFor="first_name">first_name:</label>
<input onChange={getUserRegistaData} type="text" className='form-control my-2 my-input'  name='first_name' id='first_name'/>
<label htmlFor="last_name">last_name:</label>
<input onChange={getUserRegistaData} type="text" className='form-control my-2 my-input'  name='last_name' id='last_name'/>

<label htmlFor="age">Age:</label>
<input onChange={getUserRegistaData} type="number" className='form-control my-2 my-input'  name='age' id='age'/>

<label htmlFor="email">Email:</label>
<input onChange={getUserRegistaData} type="email" className='form-control my-2 my-input'  name='email' id='email'/>
<label htmlFor="password">password</label>
<input onChange={getUserRegistaData} type="password" className='form-control my-2 my-input'  name='password' id='password'/>
  
  <button className='btn btn-info my-4'>
    {isLoding ==true ?<i className='fas fa-spinner fa-spin'></i> :'Regestir'} </button>
  </form>
  
  
  </>
    
  
}
