import { useEffect, useMemo, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Cast from '../Details/Cast';
import Reviews from '../Details/Reviews';
import Similar from '../Details/Similar';
import Trailer from './Trailer';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavoriteItems, updateWatchlistItems } from '../../store/productionSlice';

const initialState = {
  details: null,
  trailerKey: null,
  isModalOpen: false,
  loading: true,
  error: null,
  genres: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        details: action.payload.details,
        trailerKey: action.payload.trailerKey,
        genres: action.payload.genres,
        loading: false,
        error: null,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'openModal':
      return { ...state, isModalOpen: true };
    case 'closeModal':
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
};

const Details = ({ type }) => {
  const { id } = useParams();
  const actionDispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  const { watchlist, favorites } = useSelector((state) => state.production)
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { details, trailerKey, isModalOpen, loading, error, genres } = state;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsUrl = type === 'movie' 
          ? `https://api.themoviedb.org/3/movie/${id}?api_key=cd6995e50746ae039317681e2b2d6f5a`
          : `https://api.themoviedb.org/3/tv/${id}?api_key=cd6995e50746ae039317681e2b2d6f5a`;

        const response = await fetch(detailsUrl);
        const data = await response.json();

        const genres = data.genres || [];

        const videoResponse = await fetch(
          type === 'movie'
            ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=cd6995e50746ae039317681e2b2d6f5a`
            : `https://api.themoviedb.org/3/tv/${id}/videos?api_key=cd6995e50746ae039317681e2b2d6f5a`
        );
        const videoData = await videoResponse.json();

        const trailer = videoData.results.find((video) => video.type === 'Trailer');
        const trailerKey = trailer ? trailer.key : null;

        dispatch({
          type: 'success',
          payload: {
            details: data,
            trailerKey: trailerKey,
            genres: genres,
          },
        });
      } catch (err) {
        dispatch({ type: 'error', payload: 'Failed to fetch details.' });
      }
    };

    fetchDetails();
  }, [id, type]);

  const runtime = details?.runtime || details?.episode_run_time[0] || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const isMovie = !!details?.runtime

  const openModal = () => dispatch({ type: 'openModal' });
  const closeModal = () => dispatch({ type: 'closeModal' });

  const navigateToDetails = (id) => navigate(`/${type}/${id}`);

  const isWatchlist = useMemo(() => {
    const key = isMovie ? 'movies' : 'tvShows'
    return !!watchlist?.[key]?.find(item => item.id === state?.details?.id)
  }, [watchlist, isMovie, state?.details])
  const isFavorite = useMemo(() => {
    const key = isMovie ? 'movies' : 'tvShows'
    return !!favorites?.[key]?.find(item => item.id === state?.details?.id)
  }, [favorites, isMovie, state?.details])


  const handleFavorites = () => {
    if (!user || !state?.details || !favorites) return;
    const key = isMovie ? 'movies' : 'tvShows'
    const payload = {...favorites};
    if (isFavorite) {
      payload[key] = favorites[key]?.filter((item) => item.id !== details.id)
    } else {
      const newObj = {
        id: state.details.id,
        name: state.details.name || state.details.title,
        poster_path: state.details.poster_path
      }
      payload[key] = [...favorites?.[key], newObj]
    }
    actionDispatch(updateFavoriteItems({
      userId: user.userId,
      movies: payload.movies,
      tvShows: payload.tvShows
    }))
  }
  const handleWatchlist = () => {
    if (!user || !state?.details || !watchlist) return;
    const key = isMovie ? 'movies' : 'tvShows'
    const payload = {...watchlist};
    if (isWatchlist) {
      payload[key] = watchlist[key]?.filter((item) => item.id !== details.id)
    } else {
      const newObj = {
        id: state.details.id,
        name: state.details.name || state.details.title,
        poster_path: state.details.poster_path
      }
      payload[key] = [...watchlist?.[key], newObj]
    }
    actionDispatch(updateWatchlistItems({
      userId: user.userId,
      movies: payload.movies,
      tvShows: payload.tvShows
    }))
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="detail-section">
        <div className="phone:col-span-1 phone:flex phone:justify-center phone:items-center mt-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title || details.name}
            className="rounded-lg mb-5"
          />
        </div>
        <div className="mx-7 mt-10 sm:col-span-1 md:col-span-2">
          <h1 className="text-3xl font-bold">{details.title || details.name}</h1>
          <p className="text-base mt-10 font-semibold">{details.overview}</p>
          <h2 className="my-5">Release Date: {details.release_date || details.first_air_date}</h2>
          <h2>Rating: {details.vote_average.toFixed(1)}</h2>

          {hours > 0 ? (
            <h3 className="mt-4 font-semibold">
              Runtime: {hours} hr and {minutes} minutes
            </h3>
          ) : (
            <h3 className="mt-4 font-semibold">Runtime: {minutes} minutes</h3>
          )}
        
          <div className='flex items-center my-4'>
            <h3 className="font-semibold mr-4">Genres:</h3>
            <ul>
              {genres.map((genre) => (
                <li key={genre.id} className="inline-block mr-4">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          <div className='flex gap-2'>
            <button onClick={openModal} className="btn-trailer">
              Watch Trailer
            </button>
            <button onClick={handleFavorites} disabled={!user} className="btn-trailer">
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
            <button onClick={handleWatchlist} disabled={!user} className="btn-trailer">
              {isWatchlist ? 'Remove from watch list' : 'Add to watch list'}
            </button>
          </div>

          {isModalOpen && trailerKey && (
            type === 'movie' ? (
              <Trailer trailerKey={trailerKey} closeModal={closeModal} />
            ) : (
              <Trailer trailerKey={trailerKey} closeModal={closeModal} />
            )
          )}
        </div>
      </section>
      <Reviews id={id} type={type} />
      <Cast id={id} type={type} />
      <div>
        <Similar id={id} type={type} handleNavigation={navigateToDetails} />
      </div>
    </>
  );
};

export default Details;
