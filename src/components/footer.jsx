import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faAddressBook,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <>
      <div className="bg-black mt-16 h-[300px] -ml-8 flex flex-col md:flex-row text-white">
        <div className="text ml-16 mt-16 md:w-[300px]">
          <div className="font-bold text-2xl">
            Go<span className="text-sky-600">Ride</span> Rentals
          </div>
          <div className="mt-4">
            Experience the freedom of the road with our premium car rentals -
            your adventure awaits.
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="icons flex">
            <div className="insta"></div>
          </div>
        </div>
        <div className="text ml-16 mt-16">
          <div className="font-bold text-2xl">
            <span>Information</span>
          </div>
          <div className="mt-4 font-semibold">
            <ul>
              <li className="m-2">About</li>
              <li className="m-2">Services</li>
              <li className="m-2">Terms and Conditions</li>
              <li className="m-2">Best Price Guarantee</li>
            </ul>
          </div>
        </div>
        <div className="text ml-16 mt-16">
          <div className="font-bold text-2xl">
            <span>Customer Support</span>
          </div>
          <div className="mt-4 font-semibold">
            <ul>
              <li className="m-2">Payment Option</li>
              <li className="m-2">FAQ</li>
              <li className="m-2">Booking Tips</li>
              <li className="m-2">How it works</li>
              <li className="m-2">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="text ml-16 mt-16">
          <div className="font-bold text-2xl">
            <span>Have a Question?</span>
          </div>
          <div className="mt-4 font-semibold">
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
      <div className="lastLine text-center font-semibold text-xl bg-black text-white">
        CopyRight &#169; 2024 All Right Reserved
      </div>
    </>
  );
};

export default Footer;
