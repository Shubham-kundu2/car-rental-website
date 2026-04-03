import "./App.css";
import UpperPage from "./upperPage";
import Cars from "./components/cars";
import AboutUs from "./components/aboutUs";
import Services from "./components/services";
import Testimonial from "./components/testimonial";
import Stats from "./components/stats";
import Footer from "./components/footer";
import Header from "./components/header";
import CarsHeader from "./components/carsHeader";
import { useEffect, useState } from "react";
import CarsList from "./components/carsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Book from "./components/book";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  createBooking as createBookingRequest,
  fetchBookings,
  fetchCars,
} from "./api/rentalApi";

const FAVORITES_KEY = "go-ride-favorites";
const SELECTED_CAR_KEY = "go-ride-selected-car";
const AUTH_KEY = "go-ride-auth";

const loadStoredValue = (key, fallbackValue) => {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch (error) {
    console.error(`Unable to load ${key}`, error);
    return fallbackValue;
  }
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");
  const [cars, setCars] = useState([]);
  const [isLoadingCars, setIsLoadingCars] = useState(true);
  const [carsError, setCarsError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [favoriteCarIds, setFavoriteCarIds] = useState(() =>
    loadStoredValue(FAVORITES_KEY, [])
  );
  const [authUser, setAuthUser] = useState(() => loadStoredValue(AUTH_KEY, null));
  const [selectedCarId, setSelectedCarId] = useState(() =>
    loadStoredValue(SELECTED_CAR_KEY, null)
  );
  const itemsPerPage = 6;
  const selectedCar =
    cars.find((car) => car.id === selectedCarId) ?? cars[0] ?? null;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoadingCars(true);
        const [carsResponse, bookingsResponse] = await Promise.all([
          fetchCars(),
          fetchBookings(),
        ]);

        setCars(carsResponse);
        setBookings(bookingsResponse);
        setCarsError("");

        if (carsResponse.length > 0) {
          setSelectedCarId((currentSelectedCarId) =>
            currentSelectedCarId ?? carsResponse[0].id
          );
        }
      } catch (error) {
        console.error("Failed to load rental data", error);
        setCarsError("Unable to load live car data right now.");
      } finally {
        setIsLoadingCars(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, favoritesOnly, availableOnly, sortOption, setCurrentPage]);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favoriteCarIds)
    );
  }, [favoriteCarIds]);

  useEffect(() => {
    window.localStorage.setItem(
      SELECTED_CAR_KEY,
      JSON.stringify(selectedCarId)
    );
  }, [selectedCarId]);

  useEffect(() => {
    if (authUser) {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
    } else {
      window.localStorage.removeItem(AUTH_KEY);
    }
  }, [authUser]);

  const toggleFavorite = (carId) => {
    setFavoriteCarIds((currentFavorites) =>
      currentFavorites.includes(carId)
        ? currentFavorites.filter((favoriteId) => favoriteId !== carId)
        : [...currentFavorites, carId]
    );
  };

  const selectCar = (carId) => {
    setSelectedCarId(carId);
  };

  const createBooking = (bookingDetails) => {
    return createBookingRequest(bookingDetails).then((booking) => {
      setBookings((currentBookings) => [booking, ...currentBookings].slice(0, 5));
      setSelectedCarId(bookingDetails.carId);
      return booking;
    });
  };

  const handleAuthSuccess = (user) => {
    setAuthUser(user);
  };

  const handleLogout = () => {
    setAuthUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#eef4f8] text-slate-900">
        <Header authUser={authUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UpperPage />
                <Cars
                  cars={cars}
                  isLoadingCars={isLoadingCars}
                  favoriteCarIds={favoriteCarIds}
                  onToggleFavorite={toggleFavorite}
                  onSelectCar={selectCar}
                />
                <AboutUs />
                <Services />
                <Testimonial />
                <Stats />
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
                  favoritesOnly={favoritesOnly}
                  setFavoritesOnly={setFavoritesOnly}
                  availableOnly={availableOnly}
                  setAvailableOnly={setAvailableOnly}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  totalFavorites={favoriteCarIds.length}
                />
                <CarsList
                  cars={cars}
                  isLoadingCars={isLoadingCars}
                  carsError={carsError}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  searchQuery={searchQuery}
                  favoriteCarIds={favoriteCarIds}
                  onToggleFavorite={toggleFavorite}
                  onSelectCar={selectCar}
                  favoritesOnly={favoritesOnly}
                  availableOnly={availableOnly}
                  sortOption={sortOption}
                />
              </>
            }
          />
          <Route
            path="/booking"
            element={
              <>
                <Book
                  cars={cars}
                  selectedCar={selectedCar}
                  isAuthenticated={Boolean(authUser)}
                  favoriteCarIds={favoriteCarIds}
                  onToggleFavorite={toggleFavorite}
                  onCreateBooking={createBooking}
                  bookings={bookings}
                  onSelectCar={selectCar}
                />
              </>
            }
          />
          <Route
            path="/login"
            element={<Login onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/register"
            element={<Register onAuthSuccess={handleAuthSuccess} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
