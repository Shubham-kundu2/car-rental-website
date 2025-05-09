import React from "react";
import "../css/style.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const CarsFooter = ({ currentPage, setCurrentPage }) => {
  const totalPages = 12;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <section className="navigationlower">
      <div className="container pagination">
        {currentPage > 1 && (
          <div className="btn" onClick={() => setCurrentPage(currentPage - 1)}>
            <ArrowBackOutlinedIcon />
          </div>
        )}

        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`btn ${number === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </div>
        ))}

        {currentPage < totalPages && (
          <div className="btn" onClick={() => setCurrentPage(currentPage + 1)}>
            <ArrowForwardOutlinedIcon />
          </div>
        )}
      </div>
    </section>
  );
};

export default CarsFooter;
