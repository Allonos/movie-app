const Selection = ({ title, production, type, onNavigate }) => (
  <section className="my-16">
    <h2 className="title">{title}</h2>
    <div className="title-container">
      {production.map((production) => (
        <div key={production.id} className="my-7">
          <div className="group relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${production.poster_path}`}
              alt={production.name}
              className="rounded-lg"
            />
            <button className="btn" onClick={() => onNavigate(production.id, type)}>
              Watch the {type}
            </button>
          </div>
          <div className="info">
            <h3 className="text-xl">{production.name ? production.name : production.title}</h3>
            <p className="text-xl">{production.vote_average.toFixed(1) * 10}%</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Selection;
