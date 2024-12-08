import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Selection from "./Selection";
import GenreFilter from "./GenreFilter";

const initialState = {
  trendingShows: [],
  popularShows: [],
  airingTodayShows: [],
  trendingMovies: [],
  popularMovies: [],
  newMovies: [],
  ratedMovies: [],
  genresMovies: [],
  genresShows: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return { ...state, [action.payload.key]: action.payload.data, loading: false };
    case "error":
      return { ...state, error: action.payload.error, loading: false };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trendingShows, popularShows, airingTodayShows, trendingMovies, popularMovies, newMovies, ratedMovies, genresMovies, genresShows, loading, error } = state;
  const [selectedGenresMovies, setSelectedGenresMovies] = useState([]);
  const [selectedGenresShows, setSelectedGenresShows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const API_KEY = 'cd6995e50746ae039317681e2b2d6f5a';

  const fetchData = async (endpoint, key) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`);
      const data = await response.json();
      dispatch({ type: "success", payload: { key, data: data.results } });
    } catch (err) {
      dispatch({ type: "error", payload: { error: "Failed to fetch data" } });
    }
  };

  const fetchGenres = async () => {
    try {
      const responseMovies = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const responseShows = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`);
      const dataMovies = await responseMovies.json();
      const dataShows = await responseShows.json();
      dispatch({ type: "success", payload: { key: "genresMovies", data: dataMovies.genres } });
      dispatch({ type: "success", payload: { key: "genresShows", data: dataShows.genres } });
    } catch (err) {
      dispatch({ type: "error", payload: { error: "Failed to fetch genres" } });
    }
  };

  useEffect(() => {
    fetchData("trending/tv/day", "trendingShows");
    fetchData("tv/popular", "popularShows");
    fetchData("tv/airing_today", "airingTodayShows");
    fetchData("trending/movie/day", "trendingMovies");
    fetchData("movie/popular", "popularMovies");
    fetchData("movie/now_playing", "newMovies");
    fetchData("movie/top_rated", "ratedMovies");
    fetchGenres();
  }, []);

  const handleNavigation = (id, type) => {
    if (type === "movie") {
      navigate(`/movie/${id}`);
    } else if (type === "show") {
      navigate(`/tv/${id}`);
    }
  };

  const filterByGenres = (items, selectedGenres, type) => {
    return items.filter(item => {
      const genres = item.genre_ids || [];
      return selectedGenres.some(genre => genres.includes(genre));
    });
  };

  const filteredTrendingMovies = selectedGenresMovies.length
    ? filterByGenres(trendingMovies, selectedGenresMovies, 'movie')
    : trendingMovies;
  const filteredPopularMovies = selectedGenresMovies.length
    ? filterByGenres(popularMovies, selectedGenresMovies, 'movie')
    : popularMovies;
  const filteredNewMovies = selectedGenresMovies.length
    ? filterByGenres(newMovies, selectedGenresMovies, 'movie')
    : newMovies;
  const filteredRatedMovies = selectedGenresMovies.length
    ? filterByGenres(ratedMovies, selectedGenresMovies, 'movie')
    : ratedMovies;
  const filteredTrendingShows = selectedGenresShows.length
    ? filterByGenres(trendingShows, selectedGenresShows, 'show')
    : trendingShows;
  const filteredPopularShows = selectedGenresShows.length
    ? filterByGenres(popularShows, selectedGenresShows, 'show')
    : popularShows;
  const filteredAiringTodayShows = selectedGenresShows.length
    ? filterByGenres(airingTodayShows, selectedGenresShows, 'show')
    : airingTodayShows;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  const filters = () => {
    setShowFilters(!showFilters);
  }

  return (
    <div className="mt-16 mx-16">
      <div onClick={filters} className="cursor-pointer inline-flex items-center justify-start my-5 hover:text-slate-400 duration-300">
        <h1 className="text-2xl">Filter</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 mx-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
      </div>


    <div className="my-6 mx-auto bg-slate-50 justify-between text-center lg:flex gap-10 rounded-lg">
        <GenreFilter 
          genres={genresMovies} 
          selectedGenres={selectedGenresMovies} 
          onFilterChange={setSelectedGenresMovies}
          type="movie"
          showFilters={showFilters}
        />
        <GenreFilter 
          genres={genresShows} 
          selectedGenres={selectedGenresShows} 
          onFilterChange={setSelectedGenresShows}
          type="show"
          showFilters={showFilters}
        />
      </div>

      <Selection title="Trending Movies" production={filteredTrendingMovies} type="movie" onNavigate={handleNavigation} />
      <Selection title="Popular Movies" production={filteredPopularMovies} type="movie" onNavigate={handleNavigation} />
      <Selection title="New Movies" production={filteredNewMovies} type="movie" onNavigate={handleNavigation} />
      <Selection title="Rated Movies" production={filteredRatedMovies} type="movie" onNavigate={handleNavigation} />
      <Selection title="Trending Shows" production={filteredTrendingShows} type="show" onNavigate={handleNavigation} />
      <Selection title="Popular Shows" production={filteredPopularShows} type="show" onNavigate={handleNavigation} />
      <Selection title="Airing Today" production={filteredAiringTodayShows} type="show" onNavigate={handleNavigation} />
    </div>
  );
};

export default Home;
