const GenreFilter = ({ genres, selectedGenres, onFilterChange, type, showFilters }) => {
  const handleChange = (event) => {
    const genreId = parseInt(event.target.value);
    if (event.target.checked) {
      onFilterChange((prevSelectedGenres) => [...prevSelectedGenres, genreId]);
    } else {
      onFilterChange((prevSelectedGenres) => prevSelectedGenres.filter((genre) => genre !== genreId));
    }
  };

  return (
    <>
      {showFilters && (
        <div className="p-4 text-slate-700 text-lg mx-auto max-w-md sm:max-w-full">
          <h3 className="mb-4 font-semibold text-center text-blue-600">
            Filter {type === "movie" ? "Movies" : "TV Shows"} By Genre
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map((genre) => (
              <label
                key={genre.id}
                className="flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-md shadow-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={handleChange}
                  className="scale-125 accent-blue-500 mx-2"
                />
                <span className="text-sm font-medium">{genre.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GenreFilter;
