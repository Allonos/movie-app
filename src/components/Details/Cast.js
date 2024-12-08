import { useReducer, useEffect } from "react";

const InitialState = {
  cast: [],
  loading: true,
  error: null
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'success':
      return {...state, cast:action.payload, loading:false};
    case 'error':
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

const Cast = ({id, type}) => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const {cast, loading, error} = state;

  useEffect(() => {
    const fetchCast = async() => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=cd6995e50746ae039317681e2b2d6f5a`);
        const data = await response.json();
        dispatch({type:'success', payload: data.cast.slice(0,10)});
      } catch (err) {
        dispatch({type: 'error', payload: 'Failed to fetch cast.'})
      }
    }

    fetchCast();
  }, [id, type]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="font-bold text-center text-3xl">Cast</h2>
      <ul className="cast-members">
        {cast.map((actor) => (
          <li key={actor.id} className="cast-member">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className="w-72 m-auto"
            />
            <h1 className="mt-2 text-sm">
              <strong className="text-base">{actor.name}</strong> as{" "}
              {actor.character}
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Cast;