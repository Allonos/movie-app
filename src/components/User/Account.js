import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Details/Card";

const Account = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { watchlist, favorites, isLoading } = useSelector((state) => state.production);
  const [ showWatchList, setShowWatchList ] = useState(false);
  const [ showFavorites, setShowFavorites ] = useState(false);

  const { email, surname } = user || {};

  const listClass = `size-6 ml-2 font-semibold ${showWatchList ? 'rotate-180' : ''} duration-500`
  const favClass = `size-6 ml-2 font-semibold ${showFavorites ? 'rotate-180' : ''} duration-500`

  if (loading || isLoading) return <div>Loading...</div>
  return (
    <div className="bg-slate-100 text-slate-700 justify-center w-2/3 mx-auto mt-16 p-5 rounded-lg shadow-borderShadow">
      <h1 className="text-2xl font-bold text-center mb-5">Welcome {surname}!</h1>
      <p className="my-2">
        <span className="font-semibold">Email: </span> {email}
      </p>
      <p className="my-2">
        <span className="font-semibold">Surname: </span> {surname}
      </p>
      <section className="my-5">
        <div>
          <div 
            onClick={() => setShowWatchList(!showWatchList)}
            className="list-container"
          >
            <p>See Your Watchlist</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={listClass}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          {showWatchList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {watchlist.movies.map((movie) => (
                <Card production={movie} type="movie" />
              ))}
              {watchlist.tvShows.map((tvShow) => (
                <Card production={tvShow} type="tv" />
              ))}
            </div>
          )}
        </div>
        <div>
          <div
            onClick={() => setShowFavorites(!showFavorites)}
            className="list-container"
          >
            <p>See Your Favorite Shows and Movies</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={favClass}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          {showFavorites && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favorites.movies.map((movie) => (
                <Card production={movie} type="movie" />
              ))}
              {favorites.tvShows.map((tvShow) => (
                <Card production={tvShow} type="tv" />
              ))}
            </div>
          )}
        </div>
        
      </section>
    </div>
  );
};

export default Account;
