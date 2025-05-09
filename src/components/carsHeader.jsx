import React from "react";
import "../css/style.css";

const CarsHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <section className="navigatioupper">
        <div className="container">
          <nav className="upper">
            <input
              type="text"
              placeholder="Search... "
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search search-icon"></i>
          </nav>
        </div>
      </section>
    </>
  );
};

export default CarsHeader;
