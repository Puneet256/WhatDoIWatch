import React, { useState } from 'react';
import MovieTag from './MovieTag';
import { makeModal } from '../utils/firebaseCRUD'
import MovieModal from "./MovieModal";



export default function MovieCard(props) {

    function openMovieModal() {
        console.log("Opening Modal for " + props.movieName);
    }

  return (
        <div className = "moviecard" onClick = {openMovieModal}>
            <img src = {props.movieImg}/>
            <h3>{props.movieName}</h3>
            <div className = "tags" style = {{marginTop: "auto"}}>
                <MovieTag tag = {props.movieTags["mood"]}/>
                <MovieTag tag = {props.movieTags["len"]}/>
                <MovieTag tag = {props.movieTags["lang"]}/>
            </div>
        </div>
    );
}
