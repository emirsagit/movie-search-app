import React, { useState } from "react";
import Movie from "./Movie";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  function handleChange(e) {
    const { value } = e.target;
    setQuery(value);
  }

  async function fetchData(e) {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=1a1aee81ccf97f24f74c9a49d509833c&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <form className="form" onSubmit={fetchData}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          name="query"
          className="input"
          placeholder="Search for movie..."
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Movie movie={movie} key={movie.id}/>
          ))}
      </div>
    </>
  );
}
