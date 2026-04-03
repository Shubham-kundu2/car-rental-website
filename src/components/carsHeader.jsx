import "../css/style.css";

const CarsHeader = ({
  searchQuery,
  setSearchQuery,
  favoritesOnly,
  setFavoritesOnly,
  availableOnly,
  setAvailableOnly,
  sortOption,
  setSortOption,
  totalFavorites,
}) => {
  return (
    <>
      <section className="navigatioupper">
        <div className="container">
          <nav className="upper flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search by car, category, location..."
              className="search-input md:max-w-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  favoritesOnly
                    ? "bg-rose-500 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                Favorites ({totalFavorites})
              </button>
              <button
                type="button"
                onClick={() => setAvailableOnly(!availableOnly)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  availableOnly
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                Available now
              </button>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default CarsHeader;
