import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faAddressBook,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="mt-16 flex flex-col gap-10 bg-slate-950 px-6 py-12 text-white md:flex-row md:justify-between md:px-12">
        <div className="md:w-[300px]">
          <div className="text-2xl font-bold">
            Go<span className="text-sky-600">Ride</span> Rentals
          </div>
          <div className="mt-4 text-slate-300">
            Experience the freedom of the road with our premium car rentals -
            your adventure awaits.
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="mt-4 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
            Live pricing, instant booking, airport pickup, and premium support.
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            <span>Information</span>
          </div>
          <div className="mt-4 font-semibold text-slate-300">
            <ul>
              <li className="m-2">
                <Link to="/">Home</Link>
              </li>
              <li className="m-2">
                <Link to="/cars">Cars</Link>
              </li>
              <li className="m-2">
                <Link to="/booking">Book a ride</Link>
              </li>
              <li className="m-2">Best Price Guarantee</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            <span>Customer Support</span>
          </div>
          <div className="mt-4 font-semibold text-slate-300">
            <ul>
              <li className="m-2">Payment Option</li>
              <li className="m-2">FAQ</li>
              <li className="m-2">Booking Tips</li>
              <li className="m-2">How it works</li>
              <li className="m-2">Contact Us</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            <span>Have a Question?</span>
          </div>
          <div className="mt-4 font-semibold text-slate-300">
            <ul>
              <li className="m-2">
                <span className="mr-6">
                  <FontAwesomeIcon icon={faAddressBook} />
                </span>
                23 secA Khanpur, Kharar, Punjab, India
              </li>
              <li className="m-2">
                <span className="mr-6">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                +91 8896758631
              </li>
              <li className="m-2">
                <span className="mr-6">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                goaskriderentals@protonmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="lastLine bg-slate-950 px-6 pb-8 text-center text-xl font-semibold text-white">
        CopyRight &#169; 2024 All Right Reserved
      </div>
    </>
  );
};

export default Footer;
