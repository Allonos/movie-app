import { useNavigate } from 'react-router-dom';

const Card = ({ production, type }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${type}/${production.id}`);
  };

  return (
    <section onClick={handleCardClick} className="cards group">
      <img
        src={`https://image.tmdb.org/t/p/w500${production.poster_path}`}
        alt={production.title || production.name}
        className="lg:w-full lg:h-full object-cover rounded-md"
      />
      <button className="btn">
        Watch {type === "movie" ? "the movie" : "the show"}
      </button>
      <div className="text-center">
        <h3 className="font-semibold text-lg">
          {production.title || production.name}
        </h3>
      </div>
    </section>
  );
};

export default Card;
