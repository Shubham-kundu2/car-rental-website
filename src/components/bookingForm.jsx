import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { formatInr } from "../utils/currency";

const addOnOptions = [
  { key: "gps", label: "Navigation GPS", price: 450 },
  { key: "childSeat", label: "Child seat", price: 650 },
  { key: "insurance", label: "Premium protection", price: 1200 },
];

const labelMap = {
  pickupCountry: "Pickup country",
  pickupState: "Pickup state",
  pickupCity: "Pickup city",
  pickupStreet: "Pickup street",
  pickupLandmark: "Pickup landmark",
  pickupDateTime: "Pickup date and time",
  dropoffCountry: "Drop-off country",
  dropoffState: "Drop-off state",
  dropoffCity: "Drop-off city",
  dropoffStreet: "Drop-off street",
  dropoffLandmark: "Drop-off landmark",
  dropoffDateTime: "Drop-off date and time",
  driverName: "Driver name",
  phone: "Phone number",
};

const buildLocationOptions = (countryCode, stateCode) => ({
  states: countryCode ? State.getStatesOfCountry(countryCode) : [],
  cities:
    countryCode && stateCode
      ? City.getCitiesOfState(countryCode, stateCode)
      : [],
});

const BookingForm = ({
  activeCar,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}) => {
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const pickupOptions = buildLocationOptions(
    formData.pickupCountry,
    formData.pickupState
  );
  const dropoffOptions = buildLocationOptions(
    formData.dropoffCountry,
    formData.dropoffState
  );

  const updateField = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  };

  const updateCountry = (prefix, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [`${prefix}Country`]: value,
      [`${prefix}State`]: "",
      [`${prefix}City`]: "",
    }));
  };

  const updateState = (prefix, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [`${prefix}State`]: value,
      [`${prefix}City`]: "",
    }));
  };

  const toggleAddOn = (key) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      addOns: {
        ...currentFormData.addOns,
        [key]: !currentFormData.addOns[key],
      },
    }));
  };

  const validate = () => {
    const nextErrors = {};
    Object.keys(labelMap).forEach((field) => {
      if (!formData[field]) {
        nextErrors[field] = `${labelMap[field]} is required.`;
      }
    });

    if (
      formData.pickupDateTime &&
      formData.dropoffDateTime &&
      new Date(formData.dropoffDateTime) <= new Date(formData.pickupDateTime)
    ) {
      nextErrors.dropoffDateTime =
        "Drop-off date must be after the pickup date.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const renderLocationFields = (title, prefix, options) => (
    <div className="rounded-[28px] bg-slate-50 p-5">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-600">Country</label>
          <select
            value={formData[`${prefix}Country`]}
            onChange={(event) => updateCountry(prefix, event.target.value)}
            className="mt-2 w-full rounded-2xl border px-4 py-3"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          {errors[`${prefix}Country`] && (
            <p className="mt-1 text-sm text-rose-600">
              {errors[`${prefix}Country`]}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">State</label>
          <select
            value={formData[`${prefix}State`]}
            onChange={(event) => updateState(prefix, event.target.value)}
            className="mt-2 w-full rounded-2xl border px-4 py-3"
          >
            <option value="">Select a state</option>
            {options.states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          {errors[`${prefix}State`] && (
            <p className="mt-1 text-sm text-rose-600">
              {errors[`${prefix}State`]}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">City</label>
          <select
            value={formData[`${prefix}City`]}
            onChange={(event) =>
              updateField(`${prefix}City`, event.target.value)
            }
            className="mt-2 w-full rounded-2xl border px-4 py-3"
          >
            <option value="">Select a city</option>
            {options.cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {errors[`${prefix}City`] && (
            <p className="mt-1 text-sm text-rose-600">
              {errors[`${prefix}City`]}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Street</label>
          <input
            type="text"
            value={formData[`${prefix}Street`]}
            onChange={(event) =>
              updateField(`${prefix}Street`, event.target.value)
            }
            className="mt-2 w-full rounded-2xl border px-4 py-3"
            placeholder="Street number or block"
          />
          {errors[`${prefix}Street`] && (
            <p className="mt-1 text-sm text-rose-600">
              {errors[`${prefix}Street`]}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-600">Landmark</label>
          <input
            type="text"
            value={formData[`${prefix}Landmark`]}
            onChange={(event) =>
              updateField(`${prefix}Landmark`, event.target.value)
            }
            className="mt-2 w-full rounded-2xl border px-4 py-3"
            placeholder="Nearby landmark"
          />
          {errors[`${prefix}Landmark`] && (
            <p className="mt-1 text-sm text-rose-600">
              {errors[`${prefix}Landmark`]}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">
            Date and time
          </label>
          <input
            type="datetime-local"
            value={formData[`${prefix}DateTime`]}
            onChange={(event) =>
              updateField(`${prefix}DateTime`, event.target.value)
            }
            className="mt-2 w-full rounded-2xl border px-4 py-3"
          />
          {errors[`${prefix}DateTime`] && (
            <p className="mt-1 text-sm text-rose-600">
              {errors[`${prefix}DateTime`]}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-[58%]">
      <form onSubmit={handleSubmit} className="rounded-[32px] bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-2 border-b pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Booking details
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            {activeCar ? `Book the ${activeCar.name}` : "Select a vehicle first"}
          </h2>
          <p className="text-slate-500">
            Fill in trip details, pickup and drop-off locations, then confirm
            your reservation.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-600">
              Driver name
            </label>
            <input
              type="text"
              value={formData.driverName}
              onChange={(event) => updateField("driverName", event.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="Full name"
            />
            {errors.driverName && (
              <p className="mt-1 text-sm text-rose-600">{errors.driverName}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Phone number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="+91 98765 43210"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {renderLocationFields("Pickup location", "pickup", pickupOptions)}
          {renderLocationFields("Drop-off location", "dropoff", dropoffOptions)}
        </div>

        <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
          <h3 className="text-xl font-semibold text-slate-900">Travel add-ons</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {addOnOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => toggleAddOn(option.key)}
                className={`rounded-2xl border px-4 py-4 text-left ${
                  formData.addOns[option.key]
                    ? "border-sky-500 bg-sky-50"
                    : "bg-white"
                }`}
              >
                <p className="font-semibold text-slate-900">{option.label}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatInr(option.price)}/day
                </p>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-600">
              Promo code
            </label>
            <input
              type="text"
              value={formData.promoCode}
              onChange={(event) => updateField("promoCode", event.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3 md:max-w-sm"
              placeholder="WEEKEND10"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-2xl bg-sky-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving booking..." : "Confirm booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
