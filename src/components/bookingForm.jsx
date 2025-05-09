import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setStates(State.getStatesOfCountry(countryId));
    setSelectedState("");
    setCities([]);
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setCities(City.getCitiesOfState(selectedCountry, stateId));
    setSelectedCity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!selectedCountry) newErrors.country = "Country is required.";
    if (!selectedState) newErrors.state = "State is required.";
    if (!selectedCity) newErrors.city = "City is required.";
    if (!streetNumber) newErrors.streetNumber = "Street number is required.";
    if (!landmark) newErrors.landmark = "Landmark is required.";
    if (!pickupDateTime) newErrors.pickupDateTime = "Pickup date and time is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form is valid
    console.log("Form data submitted successfully!");
    navigate("/cars");
  };

  return (
    <div className="max-w-md p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-4">Select Pickup Location</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="w-full border rounded-md px-3 py-2 mt-1"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

        {selectedCountry && (
          <>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full border rounded-md px-3 py-2 mt-4"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </>
        )}

        {selectedState && (
          <>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-4"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </>
        )}

        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-700">Street Number</label>
          <input
            type="text"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
          {errors.streetNumber && <p className="text-red-500 text-sm">{errors.streetNumber}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Landmark</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
          {errors.landmark && <p className="text-red-500 text-sm">{errors.landmark}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pickup Date and Time</label>
          <input
            type="datetime-local"
            value={pickupDateTime}
            onChange={(e) => setPickupDateTime(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
          {errors.pickupDateTime && <p className="text-red-500 text-sm">{errors.pickupDateTime}</p>}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
