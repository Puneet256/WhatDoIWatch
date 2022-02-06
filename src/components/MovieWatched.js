import React, {useState, useEffect} from 'react';
import MovieCard from "./MovieCard";
import { getWatchedMovies } from '../utils/firebaseCRUD.js';

export default function MovieWatched() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      const getData = async () => {
      const data = await getWatchedMovies();
      setMovies(data);
    }
    getData();
  }, [])

  return (
    <div style={{marginTop: '3rem'}}>
      <h2>Movies you've seen already...</h2>
    <div className = "movielist">
        { 
          movies.map((movie) => { 
            return (<MovieCard key={movie.id} movieImg = {movie.img} movieName = {movie.name} movieTags = {movie.tags}/>);
          }
        )
          
        }
    </div>
    </div>
  );
}
