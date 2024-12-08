import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromParams = queryParams.get("query");
  const typeFromParams = queryParams.get("type");


  const [query, setQuery] = useState(queryFromParams || '');
  const [searchType, setSearchType] = useState(typeFromParams || 'movie');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const queryParams = new URLSearchParams();
      queryParams.set("type", searchType);
      queryParams.set("query", query);

      navigate(`/search?${queryParams.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="p-1 border rounded mr-3"
      >
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies or TV shows..."
        className="phone:w-1/3 phone:mt-4 sm:w-1/2 p-1 border rounded mr-3 text-gray-500 outline-none"
      />
      <button
        className="text-xl hover:text-slate-500 transition ease-linear"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
