import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faGaugeSimpleHigh,
  faGasPump,
  faCar,
  faHeart,
  faLocationDot,
  faStar,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import CarsFooter from "./carsFooter.jsx";
import { formatInr } from "../utils/currency";
import { attachFallbackImage, getFallbackCarImage } from "../utils/carImage";

const CarsList = ({
  cars,
  isLoadingCars,
  carsError,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  searchQuery,
  favoriteCarIds,
  onToggleFavorite,
  onSelectCar,
  favoritesOnly,
  availableOnly,
  sortOption,
}) => {
  const [carData, setCarData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCarData(cars);
  }, [cars]);

  useEffect(() => {
    const pageFromUrl = Number(
      new URLSearchParams(window.location.search).get("page")
    );

    if (Number.isInteger(pageFromUrl) && pageFromUrl > 0) {
      setCurrentPage(pageFromUrl);
    }
  }, [setCurrentPage]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", `${currentPage}`);
    window.history.replaceState({}, "", currentUrl);
  }, [currentPage]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  let filteredData = carData.filter((car) => {
    const searchableText = [
      car.name,
      car.category,
      car.location,
      car.fuel,
      car.type,
    ]
      .join(" ")
      .toLowerCase();

    if (normalizedQuery && !searchableText.includes(normalizedQuery)) {
      return false;
    }

    if (favoritesOnly && !favoriteCarIds.includes(car.id)) {
      return false;
    }

    if (availableOnly && !car.availableNow) {
      return false;
    }

    return true;
  });

  if (sortOption === "price-low") {
    filteredData = [...filteredData].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    filteredData = [...filteredData].sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating") {
    filteredData = [...filteredData].sort((a, b) => b.rating - a.rating);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleBookNow = (carId) => {
    onSelectCar(carId);
    navigate(`/booking?car=${carId}`);
  };

  return (
    <>
      {carsError && (
        <div className="mx-auto mb-4 max-w-6xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          {carsError}
        </div>
      )}
      <div className="mx-auto mb-6 max-w-6xl px-4">
        <div className="rounded-[28px] bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-3xl font-bold">Choose your car</div>
              <p className="mt-2 text-slate-500">
                {filteredData.length} vehicles match your search. Favorites and
                availability update instantly.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-600 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                {favoriteCarIds.length} favorites
              </div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700">
                {carData.filter((car) => car.availableNow).length} available now
              </div>
              <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sky-700">
                Instant booking
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoadingCars && (
        <div className="mx-auto max-w-6xl px-4 pb-10 text-center text-slate-500">
          Loading available cars...
        </div>
      )}
      {!isLoadingCars && (
      <section className="cards flex flex-wrap justify-center gap-6">
        {itemsToDisplay.map((car) => (
          <div key={car.id} className="card-container">
            <div className="card mx-auto mb-8 grid w-full gap-4 rounded-[28px] border-2 border-gray-800 bg-white p-3 shadow-sm md:w-[400px]">
              <div className="flex items-center justify-between px-2 pt-2 text-sm font-semibold text-slate-600">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">
                  {car.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    car.availableNow
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {car.availableNow ? `${car.availableUnits} ready` : "Waitlist"}
                </span>
              </div>
              <div className="carPic w-full">
                <img
                  src={car.image || getFallbackCarImage(car.name)}
                  onError={(event) => attachFallbackImage(event, car.name)}
                  className="h-[275px] w-full rounded-[20px] object-cover object-center transition duration-300 ease-in-out hover:scale-[1.02]"
                  alt={car.name}
                />
              </div>
              <div className="details gap-6 px-3">
                <div className="text-center text-3xl font-serif font-semibold">
                  {car.name}
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {car.location}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faStar} className="text-amber-500" />{" "}
                    {car.rating} ({car.reviews})
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-6 text-xl font-semibold">
                  <div className="grid gap-5">
                    <span>
                      <FontAwesomeIcon icon={faUserGroup} />{" "}
                      <span className="ml-2 text-sky-600">{car.noOfPeople} People</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faGaugeSimpleHigh} />{" "}
                      <span className="ml-2 text-sky-600">{car.mileage} km/L</span>
                    </span>
                  </div>
                  <div className="grid gap-5">
                    <span>
                      <FontAwesomeIcon className="h-[20px]" icon={faGasPump} />
                      <span className="ml-3 text-sky-600">{car.fuel}</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCar} />
                      <span className="ml-3 text-sky-600">{car.type}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    Security deposit
                  </span>
                  <span>{formatInr(car.securityDeposit)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    Free cancellation
                  </span>
                  <span className="text-emerald-700">
                    <FontAwesomeIcon icon={faCalendarCheck} /> 24 hrs
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 text-center">
                <div className="price ml-2 text-2xl font-semibold">
                  {formatInr(car.price)}/day
                </div>
                <div className="rent flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(car.id)}
                    className={`rounded-2xl border-2 p-3 transition duration-300 ease-in-out hover:scale-110 ${
                      favoriteCarIds.includes(car.id)
                        ? "bg-rose-500 text-white"
                        : "bg-sky-600"
                    }`}
                    aria-label={`Toggle favorite for ${car.name}`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookNow(car.id)}
                    className="rounded-2xl border-2 bg-sky-600 px-4 py-3 font-semibold transition duration-300 ease-in-out hover:scale-105 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!car.availableNow}
                  >
                    {car.availableNow ? "Book now" : "Join waitlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {itemsToDisplay.length === 0 && (
          <div className="mx-4 mb-8 w-full max-w-3xl rounded-[28px] bg-white px-8 py-10 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">
              No cars match this view
            </h3>
            <p className="mt-3 text-slate-500">
              Try clearing a filter or search for another category or pickup
              location.
            </p>
          </div>
        )}
      </section>
      )}
      <CarsFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CarsList;
