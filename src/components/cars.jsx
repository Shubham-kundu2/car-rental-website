import "../App.css";
import Cards from "./cards";

const Cars = ({
  cars,
  isLoadingCars,
  favoriteCarIds,
  onToggleFavorite,
  onSelectCar,
}) => {
  return (
    <>
      <div className="offer  h-auto text-xl font-bold tracking-widest text-sky-500 mt-8 text-center">
        WHAT WE OFFER
      </div>
      <div className="featuredCars h-auto text-3xl m-4 md:text-4xl font-semibold text-center font-serif">
        Featured Vehicles
      </div>
      <Cards
        cars={cars}
        isLoadingCars={isLoadingCars}
        favoriteCarIds={favoriteCarIds}
        onToggleFavorite={onToggleFavorite}
        onSelectCar={onSelectCar}
      />
    </>
  );
};

export default Cars;
