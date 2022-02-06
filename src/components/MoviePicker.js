import React, { useState } from "react";
import { searchMovies } from "../utils/firebaseCRUD.js";
import MovieCard from "./MovieCard";

export default function MoviePicker() {
  const [movie, setMovie] = useState();
  const [inputMood, setMood] = useState('*');
  const [inputLength, setLength] = useState('*');
  const [inputLanguage, setLanguage] = useState('*');
  const [checked, setChecked] = useState({ light: false, heavy: false, action: false, documentary: false, hindi: false, english: false, other: false, short: false, average: false, long: false})
  const [movieFound, setMovieFound] = useState(false);
  const [movieSearching, setMovieSearching] = useState(false);
  const [noMovieFound, setNoMovieFound] = useState(false);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  function handleChange(e){
    
    if (e.target.name === "mood") {
      console.log('changing mood to ' + e.target.value)
      setMood(e.target.value);
      
    }
    else if (e.target.name === "length") {
      console.log('changing len to ' + e.target.value)
      setLength(e.target.value);
    }
    
    else {
      console.log('changing lang to ' + e.target.value)
      setLanguage(e.target.value);
    }
    setChecked(e.target.value = true)
  }

  const searchMovieByTags = async () => {
    var tags = {"lang":inputLanguage,"len":inputLength,"mood":inputMood}
    console.log(tags)
    const result = await searchMovies(tags);
    console.log(result);
    if (result === undefined) {
      console.log("No Movie found with those tags!");
      setMovieFound(false);
      setMovieSearching(true);
      await timer(3000);
      setNoMovieFound(true);
      setMovieFound(false);
      setMovieSearching(false);
    }
    else{
      setMovie(result);
      setMovieFound(false);
      setMovieSearching(true);
      setNoMovieFound(false);
      await timer(3000);
      setMovieFound(true);
      setMovieSearching(false);
      setNoMovieFound(false);
    }
  };

  return (
    <div className="hero">
      <div className="moviesearch">
        <h1 className="title">Let's pick a movie for today...</h1>
        <form className="movieform">
          <div>
            <h6 style={{ textTransform: "uppercase" }}>mood</h6>
            <input type="radio" value="light" name="mood" checked={checked.light} onChange={handleChange} />
            <label htmlFor="light">light</label>
            <br />
            <input type="radio" value="heavy" name="mood" checked={checked.heavy} onChange={handleChange} />
            <label htmlFor="heavy">heavy</label>
            <br />
            <input type="radio" value="action" name="mood" checked={checked.action} onChange={handleChange} />
            <label htmlFor="action">action</label>
            <br />
            <input type="radio" value="documentary" name="mood" checked={checked.documentary} onChange={handleChange} />
            <label htmlFor="documentary">documentary</label>
          </div>
          <div>
            <h6 style={{ textTransform: "uppercase" }}>length</h6>
            <input type="radio" value="short" name="length" checked={checked.short} onChange={handleChange} />
            <label htmlFor="short">short</label>
            <br />
            <input type="radio" value="average" name="length" checked={checked.average} onChange={handleChange} />
            <label htmlFor="average">average</label>
            <br />
            <input type="radio" value="long" name="length" checked={checked.long} onChange={handleChange} />
            <label htmlFor="long">long</label>
          </div>
          <div>
            <h6 style={{ textTransform: "uppercase" }}>language</h6>
            <input type="radio" value="hindi" name="language" checked={checked.hindi} onChange={handleChange} />
            <label htmlFor="hindi">hindi</label>
            <br />
            <input type="radio" value="english" name="language" checked={checked.english} onChange={handleChange} />
            <label htmlFor="english">english</label>
            <br />
            <input type="radio" value="other" name="language" checked={checked.other} onChange={handleChange} />
            <label htmlFor="other">other</label>
          </div>
          <div className="button-group">
            <button
              type="button"
              className="searchButton"
              onClick={searchMovieByTags}
            >
              Tell Me!
            </button>
            <button
              type="button"
              className="clearButton"
              onClick={() => setChecked(() => ({ light: false, heavy: false, action: false, documentary: false, hindi: false, english: false, other: false, short: false, average: false, long: false}))}
            >
              Clear Filters
            </button>
          </div>
        </form>

        <div className="result">
          {movieFound ? (
            <MovieCard
              key={movie.id}
              movieImg={movie.img}
              movieName={movie.name}
              movieTags={movie.tags}
            />
          ) : noMovieFound ? (
            <h1>
              No movie found matching those tags. Try again with differnet tags!
            </h1>
          ) : movieSearching ? (
            <svg
              className="anim"
              width="250"
              height="250"
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="reel_small"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M53.5 130C78.0767 130 98 110.077 98 85.5C98 60.9233 78.0767 41 53.5 41C28.9233 41 9 60.9233 9 85.5C9 110.077 28.9233 130 53.5 130ZM30 83C35.5228 83 40 78.5229 40 73C40 67.4771 35.5228 63 30 63C24.4772 63 20 67.4771 20 73C20 78.5229 24.4772 83 30 83ZM40 99C40 104.523 35.5228 109 30 109C24.4772 109 20 104.523 20 99C20 93.4771 24.4772 89 30 89C35.5228 89 40 93.4771 40 99ZM76 83C81.5229 83 86 78.5229 86 73C86 67.4771 81.5229 63 76 63C70.4771 63 66 67.4771 66 73C66 78.5229 70.4771 83 76 83ZM63 112C63 117.523 58.5228 122 53 122C47.4772 122 43 117.523 43 112C43 106.477 47.4772 102 53 102C58.5228 102 63 106.477 63 112ZM53 70C58.5228 70 63 65.5229 63 60C63 54.4772 58.5228 50 53 50C47.4772 50 43 54.4772 43 60C43 65.5229 47.4772 70 53 70ZM86 99C86 104.523 81.5229 109 76 109C70.4771 109 66 104.523 66 99C66 93.4771 70.4771 89 76 89C81.5229 89 86 93.4771 86 99ZM53 92C56.3137 92 59 89.3137 59 86C59 82.6863 56.3137 80 53 80C49.6863 80 47 82.6863 47 86C47 89.3137 49.6863 92 53 92Z"
                fill="#C4C4C4"
              />
              <path
                id="reel_big"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M157.5 129C187.6 129 212 104.6 212 74.5C212 44.4005 187.6 20 157.5 20C127.4 20 103 44.4005 103 74.5C103 104.6 127.4 129 157.5 129ZM128.5 71C135.404 71 141 65.4036 141 58.5C141 51.5964 135.404 46 128.5 46C121.596 46 116 51.5964 116 58.5C116 65.4036 121.596 71 128.5 71ZM141 91.5C141 98.4036 135.404 104 128.5 104C121.596 104 116 98.4036 116 91.5C116 84.5964 121.596 79 128.5 79C135.404 79 141 84.5964 141 91.5ZM185.5 71C192.404 71 198 65.4036 198 58.5C198 51.5964 192.404 46 185.5 46C178.596 46 173 51.5964 173 58.5C173 65.4036 178.596 71 185.5 71ZM169 107.5C169 114.404 163.627 120 157 120C150.373 120 145 114.404 145 107.5C145 100.596 150.373 95 157 95C163.627 95 169 100.596 169 107.5ZM157 55C163.627 55 169 49.4036 169 42.5C169 35.5964 163.627 30 157 30C150.373 30 145 35.5964 145 42.5C145 49.4036 150.373 55 157 55ZM198 91.5C198 98.4036 192.404 104 185.5 104C178.596 104 173 98.4036 173 91.5C173 84.5964 178.596 79 185.5 79C192.404 79 198 84.5964 198 91.5ZM157.5 82C161.642 82 165 78.6421 165 74.5C165 70.3579 161.642 67 157.5 67C153.358 67 150 70.3579 150 74.5C150 78.6421 153.358 82 157.5 82Z"
                fill="#C4C4C4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 127C20 126.309 20.0585 125.631 20.1707 124.971C29.3922 133.669 41.8235 139 55.5 139C73.8306 139 89.9244 129.423 99.0509 115H108.062C119.523 129.037 136.965 138 156.5 138C170.938 138 184.232 133.104 194.814 124.883C194.936 125.57 195 126.278 195 127V213C195 219.627 189.627 225 183 225H32C25.3726 225 20 219.627 20 213V127ZM137.571 172.276C139.011 171.53 139.011 169.47 137.571 168.724L92.9198 145.598C91.5885 144.909 90 145.875 90 147.374V193.626C90 195.125 91.5885 196.091 92.9198 195.402L137.571 172.276Z"
                fill="#C4C4C4"
              />
              <path
                d="M199 143.254V191.262L236 209.503V125H234.826L199 143.254Z"
                fill="#C4C4C4"
              />
            </svg>
          ) : (
            <svg
              width="250"
              height="250"
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="reel_small"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M53.5 130C78.0767 130 98 110.077 98 85.5C98 60.9233 78.0767 41 53.5 41C28.9233 41 9 60.9233 9 85.5C9 110.077 28.9233 130 53.5 130ZM30 83C35.5228 83 40 78.5229 40 73C40 67.4771 35.5228 63 30 63C24.4772 63 20 67.4771 20 73C20 78.5229 24.4772 83 30 83ZM40 99C40 104.523 35.5228 109 30 109C24.4772 109 20 104.523 20 99C20 93.4771 24.4772 89 30 89C35.5228 89 40 93.4771 40 99ZM76 83C81.5229 83 86 78.5229 86 73C86 67.4771 81.5229 63 76 63C70.4771 63 66 67.4771 66 73C66 78.5229 70.4771 83 76 83ZM63 112C63 117.523 58.5228 122 53 122C47.4772 122 43 117.523 43 112C43 106.477 47.4772 102 53 102C58.5228 102 63 106.477 63 112ZM53 70C58.5228 70 63 65.5229 63 60C63 54.4772 58.5228 50 53 50C47.4772 50 43 54.4772 43 60C43 65.5229 47.4772 70 53 70ZM86 99C86 104.523 81.5229 109 76 109C70.4771 109 66 104.523 66 99C66 93.4771 70.4771 89 76 89C81.5229 89 86 93.4771 86 99ZM53 92C56.3137 92 59 89.3137 59 86C59 82.6863 56.3137 80 53 80C49.6863 80 47 82.6863 47 86C47 89.3137 49.6863 92 53 92Z"
                fill="#C4C4C4"
              />
              <path
                id="reel_big"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M157.5 129C187.6 129 212 104.6 212 74.5C212 44.4005 187.6 20 157.5 20C127.4 20 103 44.4005 103 74.5C103 104.6 127.4 129 157.5 129ZM128.5 71C135.404 71 141 65.4036 141 58.5C141 51.5964 135.404 46 128.5 46C121.596 46 116 51.5964 116 58.5C116 65.4036 121.596 71 128.5 71ZM141 91.5C141 98.4036 135.404 104 128.5 104C121.596 104 116 98.4036 116 91.5C116 84.5964 121.596 79 128.5 79C135.404 79 141 84.5964 141 91.5ZM185.5 71C192.404 71 198 65.4036 198 58.5C198 51.5964 192.404 46 185.5 46C178.596 46 173 51.5964 173 58.5C173 65.4036 178.596 71 185.5 71ZM169 107.5C169 114.404 163.627 120 157 120C150.373 120 145 114.404 145 107.5C145 100.596 150.373 95 157 95C163.627 95 169 100.596 169 107.5ZM157 55C163.627 55 169 49.4036 169 42.5C169 35.5964 163.627 30 157 30C150.373 30 145 35.5964 145 42.5C145 49.4036 150.373 55 157 55ZM198 91.5C198 98.4036 192.404 104 185.5 104C178.596 104 173 98.4036 173 91.5C173 84.5964 178.596 79 185.5 79C192.404 79 198 84.5964 198 91.5ZM157.5 82C161.642 82 165 78.6421 165 74.5C165 70.3579 161.642 67 157.5 67C153.358 67 150 70.3579 150 74.5C150 78.6421 153.358 82 157.5 82Z"
                fill="#C4C4C4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 127C20 126.309 20.0585 125.631 20.1707 124.971C29.3922 133.669 41.8235 139 55.5 139C73.8306 139 89.9244 129.423 99.0509 115H108.062C119.523 129.037 136.965 138 156.5 138C170.938 138 184.232 133.104 194.814 124.883C194.936 125.57 195 126.278 195 127V213C195 219.627 189.627 225 183 225H32C25.3726 225 20 219.627 20 213V127ZM137.571 172.276C139.011 171.53 139.011 169.47 137.571 168.724L92.9198 145.598C91.5885 144.909 90 145.875 90 147.374V193.626C90 195.125 91.5885 196.091 92.9198 195.402L137.571 172.276Z"
                fill="#C4C4C4"
              />
              <path
                d="M199 143.254V191.262L236 209.503V125H234.826L199 143.254Z"
                fill="#C4C4C4"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
