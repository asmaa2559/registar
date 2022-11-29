import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login';


export default function ProdectedRoute({userData , children ,saveUserData}) {
  if(userData !==null){
         return children ;

  }
  else{
        return <Login saveUserData={saveUserData} />
  }
}
