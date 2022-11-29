import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , logOut}) {
  return <>
 
<div className='d-flex flex-md-row flex-column justify-content-between'>
  <div className="left d-flex align-items-center p-2">
    <h1 className='m-0 pe-3'>noxe</h1>
    {userData? <ul className='list-unstyled d-flex align-items-center m-0'>
        < li className='px-2'> <Link to='/'>home</Link> </ li>
        < li className='px-2'> <Link to='moveis'>moveis</Link> </ li>
        < li className='px-2'> <Link to='tv'>tv show</Link> </ li>
        < li className='px-2'> <Link to='people'>people</Link> </li>
    </ul>:'' }
   
  </div>
  <div className="right d-flex align-items-center p-2">
    <div className="icons">
        <i className='fa-brands fa-facebook mx-1'></i>
        <i className="fa-brands fa-youtube mx-1"></i>
        <i className="fa-brands fa-instagram mx-1"></i>
        <i className="fa-brands fa-spotify mx-1"></i>

    </div>
    <ul className='list-unstyled d-flex align-items-center m-0'>
        
         {userData?<>
          < li className='px-2'> <span onClick={logOut}>logout</span> </ li>
          <li className='px-2'> <Link to='profile'>profile</Link> </ li>
         </>:
         <>
          <li className='px-2'> <Link to='login'>login</Link> </ li>
          <li className='px-2'> <Link to='registar'>registar</Link> </ li>
         </>}
       


        

    </ul>
  </div>



</div>
  
  
  </>
    
  
}
