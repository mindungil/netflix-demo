import React, { useEffect, useState } from 'react';
import './Search.css';
import { searchMovies, fetchGenres } from '../Movie/ApiRequest';
import MovieItem from '../Movie/MovieItem';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [rating, setRating] = useState('');
  const [sortOption, setSortOption] = useState('popularity.desc');

  useEffect(() => {
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  const handleSearch = async () => {
    const results = await searchMovies(query);
    let filteredMovies = results;

    // Genre filter
    if (selectedGenre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // Rating filter
    if (rating) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.vote_average >= parseFloat(rating)
      );
    }

    // Sort options
    if (sortOption === 'popularity.desc') {
      filteredMovies = filteredMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === 'release_date.desc') {
      filteredMovies = filteredMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOption === 'vote_average.desc') {
      filteredMovies = filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    setMovies(filteredMovies);
  };

  return (
    <div className="search">
      <h2>찾아보기</h2>
      <div className="search-controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">모든 장르</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
          </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">모든 평점</option>
          <option value="8">8점 이상</option>
          <option value="6">6점 이상</option>
          <option value="4">4점 이상</option>
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신 개봉순</option>
          <option value="vote_average.desc">평점순</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
