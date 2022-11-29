import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MediaItem from '../MediaItem/MediaItem';


export default function Home() {
  const [trendingMovies, settrendingMovies] = useState([]);
  const [trendingTv, settrendingTv] = useState([]);
  const [trendingPerson, settrendingPerson] = useState([]);


  async function getTrending(mediaType ,func){
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
//  console.log(data.results)
func(data.results);
}

  useEffect(()=>{
    getTrending('movie',settrendingMovies);
    getTrending('tv', settrendingTv);
    getTrending('person', settrendingPerson);



  },[] );
  return <>
    <div className="row ">
      <div className="col-md-4 d-flex align-items-center">
        <div>
           <div className="brdr mb-2 w-25"></div>
        <h2 className='h4' >Trending<br/>Movies<br/>To Watch Right Now
        </h2>
        <p className='text-muted py-3'>Most Watched Movies by Days</p>
        <div className="brdr mt-2 w-100"></div>
        </div>
       

      </div>
      {trendingMovies.slice(0,10).map((movie,index)=> <MediaItem movie={movie} key={index}/>)}
    </div>

    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
           <div className="brdr mb-2 w-25"></div>
        <h2 className='h4' >Trending<br/>Movies<br/>To Watch Right Now
        </h2>
        <p className='text-muted py-3'>Most Watched Movies by Days</p>
        <div className="brdr mt-2 w-100"></div>
        </div>
       

      </div>
      {trendingTv.slice(0,10).map((movie,index)=> <MediaItem movie={movie} key={index}/>)}
    </div>

    <div className="row ">
      <div className="col-md-4 d-flex align-items-center">
        <div>
           <div className="brdr mb-2 w-25"></div>
        <h2 className='h4' >Trending<br/>Movies<br/>To Watch Right Now
        </h2>
        <p className='text-muted py-3'>Most Watched Movies by Days</p>
        <div className="brdr mt-2 w-100"></div>
        </div>
       

      </div>
      {trendingPerson.slice(0,10).map((movie,index)=> <MediaItem movie={movie} key={index}/>)}
    </div>
  
  </>
}