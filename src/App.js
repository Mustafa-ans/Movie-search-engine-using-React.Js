import {useEffect, useState} from 'react';

import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=34b16bc1'

const movie1 = {
    "Title": "The Prestige",
    "Year": "2006",
    "imdbID": "tt0482571",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg"
}

const App = () =>{
    const [movies, setmovies] = useState("");
    const [searchTerm, setsearchTerm] = useState([])

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setmovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('The Prestige');
    },[]);

    return(
        <div className='app' >
            <h1>Procastination Assistant</h1>
            <div className='search' >
                <input
                placeholder='Movie name'
                value={searchTerm}
                onChange={(e)=> setsearchTerm(e.target.value) }
                />
            <img
            src={SearchIcon}
            alt='search'
            onClick={()=>searchMovies(searchTerm)}
            />
            </div>
            {movies?.length >0 ?
                (
                    <div className='container'>
                    {movies.map((movie)=>(
                        <MovieCard movie={movie} />
                    ))}
                    </div>
                ) : (
                    <div className='empty' >
                        <h2>No movies bruh</h2>
                    </div>
                )}            
        </div>
    )
}

export default App;