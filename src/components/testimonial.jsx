import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";

SwiperCore.use([Navigation]);

const testimonials = [
  {
    img: "/img/surender.jpg",
    name: "Surender",
    role: "Research Analyst",
    text: "Exceptional service! GoRide Rentals provided us with a top-notch car rental experience. From booking to drop-off, everything was smooth and convenient.!",
  },
  {
    img: "/img/harish.jpg",
    name: "Harish Choudhary",
    role: "Master",
    text: "Outstanding service! GoRide Rentals exceeded our expectations with their impeccable vehicles and seamless rental process. A must-try for anyone seeking quality and convenience.",
  },
  {
    img: "/img/anuj.jpg",
    name: "Anuj",
    role: "Software Developer",
    text: "Fantastic experience! GoRide Rentals' friendly staff and well-maintained fleet made our trip enjoyable and worry-free. Will definitely choose them again for our next adventure!",
  },
  {
    img: "/img/harmans.jpg",
    name: "Harman",
    role: "Data Engineer",
    text: "Impressive service! GoRide Rentals' transparent pricing and excellent customer support made renting a car a breeze. Highly satisfied with their professionalism and reliability.",
  },
];

const Testimonial = () => {
  return (
    <div className="mt-16">
      <div className="text-xl font-bold tracking-widest text-sky-500 text-center">
        TESTIMONIAL
      </div>
      <div className="text-3xl md:text-4xl font-semibold text-center font-serif mt-4">
        Happy Clients
      </div>

      <Swiper
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1280: { slidesPerView: 3, spaceBetween: 20 },
        }}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        className="mt-10"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center border-2 h-[440px] w-[350px] mx-auto border-gray-300 shadow-2xl p-6 transition duration-300 ease-in-out transform hover:scale-105 bg-white rounded-2xl">
              <div className="w-24 h-24 mb-6">
                <img
                  src={item.img}
                  className="w-full h-full object-cover rounded-full"
                  alt={item.name}
                />
              </div>
              <p className="text-center text-base text-gray-700 mb-6">
                {item.text}
              </p>
              <div className="text-sky-600 font-semibold text-xl">{item.name}</div>
              <div className="text-gray-500">{item.role}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
