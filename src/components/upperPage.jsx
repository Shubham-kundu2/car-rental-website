// import React from 'react'
import Header from "./header";
import "../css/upperPage.css";
import TypeWriter from "./typewriter";
import { Link } from "react-router-dom";
const UpperPage = () => {
  return (
    <>
      <div
        className="landing w-screen md:w-screen h-[60vh] bg-right md:bg-center md:h-[90vh]"
        style={{
          backgroundImage: "url('/img/backgroundImage.jpg')",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="typing text-white xl:mt-[35px] md:text-lg md:text-white xl:text-xl lg:mt-[65px]">
          <TypeWriter />
          <div className="w-[350px] mt-4 ml-[40px] mb-4 xl:w-[500px]">
            Experience convenience and innovation with Drive Smart at Next
            Gen&apos;s car rental Junction.
          </div>
          <Link to="/booking" className="ml-12 mt-4">
            <button className="border-2 text-white w-64 p-1 bg-sky-800 transition duration-300 ease-in-out transform scale-100 hover:scale-110">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpperPage;
