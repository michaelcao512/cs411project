import React, { useState } from 'react';
import axios from 'axios';
import './Prototype.css';

type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

const Prototype: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const url = "/api/movies";
            const query = url.replace("movies", searchTerm)
            const response = await axios.get(query);
            setSearchResults(response.data.Search);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <div>
                    {searchResults.map((movie) => (
                        <div key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <p>{movie.Title} ({movie.Year})</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default Prototype;
