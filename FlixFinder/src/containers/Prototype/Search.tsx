import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import { monitorEventLoopDelay } from 'perf_hooks';

type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?s=${query}&apikey=INSERTAPIKEYHERE`
            );
            setSearchResults(response.data.Search);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-screen">
            <form onSubmit={handleSearch} className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button className="btn btn-blue" type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <div className="flex flex-col items-center">
                    {searchResults.map((movie) => (
                        <div key={movie.imdbID} className="m-3 flex flex-col items-center">
                            <img src={movie.Poster} alt={movie.Title} />
                            <p>{movie.Title} ({movie.Year})</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default Search;
