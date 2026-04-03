import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faGasPump,
  faGaugeSimpleHigh,
  faCar,
  faHeart,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { formatInr } from "../utils/currency";
import { attachFallbackImage, getFallbackCarImage } from "../utils/carImage";

SwiperCore.use([Navigation]);

const Cards = ({
  cars,
  isLoadingCars,
  favoriteCarIds,
  onToggleFavorite,
  onSelectCar,
}) => {
  const [carData, setCarData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCarData(cars);
  }, [cars]);

  const handleBookNow = (carId) => {
    onSelectCar(carId);
    navigate(`/booking?car=${carId}`);
  };

  return (
    <>
      {isLoadingCars && (
        <div className="mx-auto max-w-6xl px-4 text-center text-slate-500">
          Loading featured fleet...
        </div>
      )}
      {!isLoadingCars && (
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          className="px-1 pb-4"
        >
          {carData.slice(0, 6).map((car) => (
            <SwiperSlide key={car.id} className="h-auto">
              <div className="grid h-full w-full gap-6 rounded-[28px] border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="carPic">
              <img
                src={car.image || getFallbackCarImage(car.name)}
                onError={(event) => attachFallbackImage(event, car.name)}
                className="h-[250px] w-full rounded-[22px] object-cover transition duration-300 ease-in-out hover:scale-[1.02]"
                alt={car.name}
              />
            </div>
            <div className="px-2">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
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
              <div className="mt-4 text-center text-3xl font-serif font-semibold">
                {car.name}
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 text-sm text-slate-500">
                <span>
                  <FontAwesomeIcon icon={faLocationDot} /> {car.location}
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} className="text-amber-500" />{" "}
                  {car.rating}
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
                <span className="font-semibold text-slate-800">Deposit</span>
                <span>{formatInr(car.securityDeposit)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-slate-800">Reviews</span>
                <span>{car.reviews}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-center">
              <div className="price text-2xl font-semibold">
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
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button
                  type="button"
                  onClick={() => handleBookNow(car.id)}
                  className="rounded-2xl border-2 bg-sky-600 px-4 py-3 font-semibold transition duration-300 ease-in-out hover:scale-105 hover:bg-slate-200"
                >
                  Rent now
                </button>
              </div>
            </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Cards;
