const AboutUs = () => {
  return (
    <>
      <div id="about" className="flex flex-col mt-32 md:flex-row bg-sky-200">
        <div className="image w-[80%] mx-auto mt-8 md:w-[48%]">
          <img src="/img/GoRideAbout.jpg" alt="" />
        </div>
        <div className="flex flex-col md:w-[48%]">
          <div className="mx-auto text-4xl font-bold mt-4 text-sky-600">
            About Us
          </div>
          <div className="mx-auto mt-4 tracking-wide font-bold text-2xl">
            Welcome To GoRide Rentals
          </div>
          <div className="content mt-4 text-center font-serif p-4 md:text-lg">
            <p>
              Welcome to GoRide Rentals, your ultimate destination for
              hassle-free car rental services. At GoRide, we&apos;re dedicated
              to providing you with a seamless and enjoyable experience every
              time you hit the road.
            </p>
            <p className="mt-4">
              Our fleet of vehicles is meticulously maintained, ensuring safety
              and reliability on every journey. Whether you need a compact car
              for city exploration or a spacious SUV for a family getaway,
              GoRide has the perfect ride for you.
            </p>
            <p className="mt-4 hidden md:block">
              What sets us apart is our commitment to customer satisfaction.
              With transparent pricing, easy booking processes, and flexible
              rental options, we make renting a car a breeze. Our friendly and
              knowledgeable staff are always ready to assist you, ensuring that
              your rental experience is smooth from start to finish. Explore our
              range of vehicles and choose the one that suits your needs best.
              Whether it&apos;s a weekend road trip or a long-term rental,
              GoRide Rentals has got you covered.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
