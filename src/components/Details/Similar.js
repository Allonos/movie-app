import { useState, useEffect } from "react";

const SimilarProductions = ({ id, type, handleNavigation }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=cd6995e50746ae039317681e2b2d6f5a`
        );
        const data = await response.json();
        setSimilar(data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch similar productions.");
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [id, type]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="title my-16 mx-10">
        Similar {type === "movie" ? "Movies" : "Shows"}
      </h2>
      <section className="similar-section">
        <div className="similar-content">
          {similar.map((production) => (
            <div key={production.id} className="my-2">
              <div className="group relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${production.poster_path}`}
                  alt={production.title || production.name}
                  className="rounded-lg"
                />
                <button
                  className="btn"
                  onClick={() => handleNavigation(production.id)}
                >
                  Watch {type === "movie" ? "the movie" : "the show"}
                </button>
              </div>
              <div className="flex justify-between mx-2 text-center my-2">
                <h3 className="text-xl">{production.title || production.name}</h3>
                <p className="text-xl">{production.vote_average.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SimilarProductions;
