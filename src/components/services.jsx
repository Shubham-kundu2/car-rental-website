const Services = () => {
  return (
    <>
      <div
        id="services"
        className="h-auto text-xl font-bold tracking-widest text-sky-500 mt-8 text-center"
      >
        SERVICES
      </div>
      <div className="h-auto text-3xl m-4 md:text-4xl font-semibold text-center font-serif">
        Our Latest Services
      </div>

      <div className="flex flex-col md:flex-row md:justify-evenly">
        <div className="flex flex-col">
          <div className="w-24 mt-16 h-24 p-4 mx-auto rounded-full bg-sky-400">
            <img src="/img/wedding-car.png" alt="" />
          </div>
          <div className="font-semibold text-lg text-center mt-2">
            Wedding Ceremony
          </div>
          <div className="w-[200px] text-center text-base mt-2 mx-auto">
            Make your wedding memorable with GoRide Rental&apos;s car rental
            services.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-24 mt-16 h-24 p-4 mx-auto rounded-full bg-sky-400">
            <img src="/img/transfer.png" alt="" />
          </div>
          <div className="font-semibold text-lg text-center mt-2">
            City Transfer
          </div>
          <div className="w-[200px] text-center text-base mt-2 mx-auto">
            For hassle-free city transfers, trust GoRide Rental&apos;s reliable
            car rental services.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-24 mt-16 h-24 p-4 mx-auto rounded-full bg-sky-400">
            <img src="/img/airport-taxi.png" alt="" />
          </div>
          <div className="font-semibold text-lg text-center mt-2">
            Airport Transfer
          </div>
          <div className="w-[200px] text-center text-base mt-2 mx-auto">
            Start your trip stress-free with GoRide Rental&apos;s airport
            transfer services.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-24 mt-16 h-24 p-4 mx-auto rounded-full bg-sky-400">
            <img src="/img/city.png" alt="" />
          </div>
          <div className="font-semibold text-lg text-center mt-2">
            Whole City Tour
          </div>
          <div className="w-[200px] text-center text-base mt-2 mx-auto">
            Explore the city in style with GoRide Rental&apos;s comprehensive
            city tour services.
          </div>
        </div>
      </div>
    </>
  );
};
export default Services;
