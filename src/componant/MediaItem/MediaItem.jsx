import React from 'react' ;
import avatar from '../../avatar.jpg';

export default function MediaItem({movie}) {
  return <>
     
  <div  className="col-md-2">
        <div className="movie">
          <img className='w-100' src={movie.poster_path?'https://image.tmdb.org/t/p/w500'+movie.poster_path:'https://image.tmdb.org/t/p/w500'+movie.profile_path} />
          {!movie.poster_path && !movie.profile_path?<img className='w-100' src={avatar}/>:'' }
          <h6 className='text-center mt-1'>{movie.title} {movie.name}</h6>
        </div>
        </div>
  
  </>
}
