import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Details/Card';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  const query = queryParams.get("query");
  const type = queryParams.get("type");

  useEffect(() => {
    const handleSearch = async (query, searchType) => {
      setLoading(true);
      setError('');
  
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/${searchType}?query=${query}&api_key=cd6995e50746ae039317681e2b2d6f5a`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
      }
      setLoading(false);
    };

    handleSearch(query, type);
  }, [query, type])
  return (
    <div>
      {loading && <p className="loader">Loading...</p>}
      {error && <p>{error}</p>}
      <div className="card">
        {results.length > 0 &&
          results.map((item) => (
            <Card 
              key={item.id} 
              production={item} 
              type={type} 
              className="h-full" 
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
