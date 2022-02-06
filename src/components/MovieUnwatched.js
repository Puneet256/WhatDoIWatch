import React, {useState, useEffect} from 'react';
import MovieCard from "./MovieCard";
import { getUnwatchedMovies } from '../utils/firebaseCRUD.js';

export default function MovieUnwatched() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      const getData = async () => {
      const data = await getUnwatchedMovies();
      setMovies(data);
    }
    getData();
  }, [])

  return (
  <div>
    <h2>Movies you haven't seen yet...</h2>
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
