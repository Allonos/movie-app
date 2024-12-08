const Trailer = ({ trailerKey, closeModal, type }) => {
  return (
    <div className="trailer-container">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-slate-600 font-semibold mb-4">
            {type === 'movie' ? 'Movie Trailer' : 'Show Trailer'}
          </h2>
          <button onClick={closeModal} className="trailer-btn">
            Close
          </button>
        </div>
        <iframe
          width="800"
          height="600"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={`${type === 'movie' ? 'Movie' : 'Show'} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
