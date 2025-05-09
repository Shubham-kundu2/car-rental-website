import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

const FullBooking = () => {
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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = Country.getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState("");
    setSelectedCity("");
    setStates(State.getStatesOfCountry(countryId));
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");
    setCities(City.getCitiesOfState(selectedCountry, stateId));
  };

  const handleCityChange = (e) => setSelectedCity(e.target.value);
  const handleStreetNumberChange = (e) => setStreetNumber(e.target.value);
  const handleLandmarkChange = (e) => setLandmark(e.target.value);
  const handlePickupDateTimeChange = (e) => setPickupDateTime(e.target.value);

  const validate = () => {
    const newErrors = {};
    if (!selectedCountry) newErrors.country = "Country is required.";
    if (!selectedState) newErrors.state = "State is required.";
    if (!selectedCity) newErrors.city = "City is required.";
    if (!streetNumber) newErrors.streetNumber = "Street number is required.";
    if (!landmark) newErrors.landmark = "Landmark is required.";
    if (!pickupDateTime) newErrors.pickupDateTime = "Pickup date and time is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
    console.log("Form submitted successfully!");
  };

  return (
    <div className="max-w-md p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-4">Select DropOff Location</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        </div>

        {selectedCountry && (
          <div className="mb-4">
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        )}

        {selectedState && (
          <div className="mb-4">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Street Number"
            value={streetNumber}
            onChange={handleStreetNumberChange}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.streetNumber && <p className="text-red-500 text-sm">{errors.streetNumber}</p>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={handleLandmarkChange}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.landmark && <p className="text-red-500 text-sm">{errors.landmark}</p>}
        </div>

        <div className="mb-4">
          <input
            type="datetime-local"
            value={pickupDateTime}
            onChange={handlePickupDateTimeChange}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.pickupDateTime && <p className="text-red-500 text-sm">{errors.pickupDateTime}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FullBooking;
