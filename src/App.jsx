import "./App.css";
import UpperPage from "./components/upperPage";
import Cars from "./components/cars";
import AboutUs from "./components/aboutUs";
import Services from "./components/services";
import Testimonial from "./components/testimonial";
import Stats from "./components/stats";
import Footer from "./components/footer";
import CarsHeader from "./components/carsHeader";
// import CarsFooter from "./components/carsFooter";
import { useState } from "react";
import CarsList from "./components/carsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Book from "./components/book";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  return (
    <Router>
      <div className="bg-slate-200">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UpperPage />
                <Cars />
                <AboutUs />
                <Services />
                <Testimonial />
                <Stats />
                <Footer />
              </>
            }
          />
          <Route
            path="/cars"
            element={
              <>
                <CarsHeader
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                />
                <CarsList
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  searchQuery={searchQuery}
                />
              </>
            }
          />
          <Route
            path="/booking"
            element={
              <>
                <Book />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
