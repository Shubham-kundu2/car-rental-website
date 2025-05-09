// import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faGasPump,
  faGaugeSimpleHigh,
  faCar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import carsData from "./carsapi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
SwiperCore.use([Navigation]);

const Cards = () => {
  const [carData, setCarData] = useState([]);
  console.log("CarData : " + JSON.stringify(carData));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.resolve(carsData);
        setCarData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
      navigation
      spaceBetween={10}
      slidesPerView={1}
    >
      {/* <div className="grid md:grid-cols-2 xl:grid-cols-3"> */}
      {carData.map((car) => (
        <SwiperSlide key={car.name}>
          <div className="grid bg-white border-2 rounded-lg border-r-black grid-cols-1  gap-4 mb-8 w-[400px] mx-auto p-1 gap-14">
            <div className="carPic">
              <img
                src={car.image}
                className="rounded-lg w-[400px] h-[250px] md:w-[380px] m-2 transition duration-300 ease-in-out transform scale-100 hover:scale-110"
                alt="Car"
              />
            </div>
            <div className="details col-span-2 gap-6 pl-3">
              <div className="text-3xl font-serif font-semibold text-center">
                {car.name}
              </div>
              <div className="icons mt-2">
                <div className="grid grid-cols-2 ml-[10px] font-semibold text-xl gap-16 ">
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
            </div>
            <div>
              <hr
                className="mx-auto w-[330px]"
                style={{ border: "1px solid grey" }}
              ></hr>
              <div className="flex justify-between text-center">
                <div className="price font-semibold ml-4 text-2xl mt-3 ">
                  ${car.price}/Day
                </div>
                <div className="rent flex">
                  <div className="wishlist m-3 border-2 p-1.5 hover:bg-slate-200 transition duration-300 ease-in-out transform scale-100 hover:scale-110 rounded-lg bg-sky-600">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="buttonRent">
                    <Link to="/payment">
                      <button className="border-2 m-3 p-1.5 hover:bg-slate-200 transition duration-300 ease-in-out transform scale-100 hover:scale-110 font-semibold rounded-lg bg-sky-600">
                        Rent now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* </div> */}
    </Swiper>
  );
};

export default Cards;
