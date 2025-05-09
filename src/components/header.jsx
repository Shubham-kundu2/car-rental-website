import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <section>
        <nav className="flex items-center justify-between flex-wrap bg-white-900 p-4">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img
              src="/img/logo.png"
              alt="GoRide Rentals Logo"
              className="h-10 w-10 w-auto rounded-[36px] mr-2"
            />
            <span className="font-semibold text-xl tracking-tight ml-2">
              GoRide Rentals
            </span>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-300 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full ${
              isOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm text-lg lg:flex-grow ">
              <a
                href="#"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-[55px]"
              >
                Home
              </a>
              <Link
                to="/cars"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-[55px]"
              >
                Cars
              </Link>
              <a
                href="#about"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-[55px]"
              >
                About
              </a>
              <a
                href="#services"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-[55px]"
              >
                Services
              </a>
              <Link
                to="/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-[55px]"
              >
                SignIn
              </Link>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Header;
