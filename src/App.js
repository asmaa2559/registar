import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider , Navigate} from 'react-router-dom';
import Layout from './componant/Layout/Layout';
import Home from './componant/Home/Home';
import Moveis from './componant/Moveis/Moveis';
import People from './componant/People/People';
import Tv from './componant/Tv/Tv';
import Login from './componant/Login/Login';
import Registar from './componant/Registar/Registar';
import Profile from './componant/Profile/Profile';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProdectedRoute from './componant/ProdectedRoute/ProdectedRoute';
import { Offline, Online } from 'react-detect-offline';







function App() {
 useEffect(()=>{
  if(localStorage.getItem('userToken')!== null){
    saveUserData();
  }
 },[]);

const [userData, setuserData] = useState(null);

function saveUserData(){
  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);
  // console.log(decodedToken);
  setuserData(decodedToken);

}

function logOut(){
  localStorage.removeItem('userToken');
  setuserData(null);
  return <Navigate to='/login'/>
}

  let routers= createBrowserRouter([
    {path:'/' ,element:<Layout userData={userData} logOut={logOut}/> , children:[
      {index:true,element:<ProdectedRoute saveUserData={saveUserData} userData={userData}><Home/></ProdectedRoute>  },
      {path:'moveis',element:<ProdectedRoute saveUserData={saveUserData}  userData={userData}><Moveis/></ProdectedRoute> },
      {path:'people',element:<ProdectedRoute saveUserData={saveUserData}  userData={userData}><People/></ProdectedRoute> },
      {path:'profile' , element:<ProdectedRoute saveUserData={saveUserData}  userData={userData}><Profile userData={userData}/></ProdectedRoute> },
      {path:'tv',element:<ProdectedRoute saveUserData={saveUserData}  userData={userData}><Tv/></ProdectedRoute> },
      {path:'login',element:<Login saveUserData={saveUserData}/>},
      {path:'registar' ,element:<Registar/> },
  
    ]}
  ])


  return <>

  <Offline><div className='offline'>you are offline</div></Offline>
   <RouterProvider router={routers}/>
  </>
 
}

export default App;
