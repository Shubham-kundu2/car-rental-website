import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faGaugeSimpleHigh,
  faGasPump,
  faCar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../css/style.css";
import CarsFooter from "./carsFooter.jsx";
import carsData from "./carsapi.js";

const CarsList = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  searchQuery,
}) => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          setCarData(carsData);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", `${currentPage}`);
    window.history.pushState({}, "", currentUrl);
  }, [currentPage, setCurrentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = carData.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsToDisplay = searchQuery
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : carData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="font-bold text-3xl text-center mb-[12px]">
        Choose your car
      </div>
      <section className="cards flex flex-wrap justify-center gap-6">
        {itemsToDisplay.map((car, index) => (
          <div key={index} className="card-container">
            <div className="card bg-white border-2 rounded-lg border-gray-800 grid grid-cols-1 gap-4 mb-8 w-full md:w-[400px] mx-auto p-1 gap-14">
              <div className="carPic w-[460px] ">
                <img
                  src={car.image}
                  className="rounded-lg w-[390px] h-[275px] object-cover object-center transition duration-300 ease-in-out transform scale-100 hover:scale-110"
                  alt={car.name}
                />
              </div>
              <div className="details col-span-2 gap-6 pl-3">
                <div className="text-3xl font-serif font-semibold text-center">
                  {car.name}
                </div>
                <div className="icons mt-2 grid grid-cols-2 ml-[10px] font-semibold text-xl gap-16 ">
                  <div className="grid grid-rows-2 gap-6">
                    <span>
                      <FontAwesomeIcon icon={faUserGroup} />{" "}
                      <span className="text-sky-600 ml-2">
                        {car.noOfPeople} People
                      </span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faGaugeSimpleHigh} />{" "}
                      <span className="text-sky-600 ml-2">
                        {car.mileage} km/L
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-rows-2 gap-6">
                    <span>
                      <FontAwesomeIcon className="h-[20px]" icon={faGasPump} />
                      <span className="text-sky-600 ml-3">{car.fuel}</span>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCar} />
                      <span className="text-sky-600 ml-3">{car.type}</span>
                    </span>
                  </div>
                </div>
              </div>
              <hr
                className="mx-auto w-[330px]"
                style={{ border: "1px solid grey" }}
              />
              <div className="flex justify-between text-center">
                <div className="price font-semibold ml-4 text-2xl mt-3 ">
                  ${car.price}/Day
                </div>
                <div className="rent flex">
                  <div className="wishlist m-3 border-2 p-1.5 hover:bg-slate-200 transition duration-300 ease-in-out transform scale-100 hover:scale-110 rounded-lg bg-sky-600">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="buttonRent">
                    <button className="border-2 m-3 p-1.5 hover:bg-slate-200 transition duration-300 ease-in-out transform scale-100 hover:scale-110 font-semibold rounded-lg bg-sky-600">
                      Rent now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <CarsFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={searchQuery ? filteredData.length : carData.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CarsList;
