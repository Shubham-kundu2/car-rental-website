import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShieldHeart,
  faSnowflake,
  faBolt,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { formatInr } from "../utils/currency";
import { attachFallbackImage, getFallbackCarImage } from "../utils/carImage";

const addOnPrices = {
  gps: 450,
  childSeat: 650,
  insurance: 1200,
};

const getDayCount = (pickupDateTime, dropoffDateTime) => {
  if (!pickupDateTime || !dropoffDateTime) {
    return 1;
  }

  const pickup = new Date(pickupDateTime);
  const dropoff = new Date(dropoffDateTime);
  const milliseconds = dropoff.getTime() - pickup.getTime();

  if (Number.isNaN(milliseconds) || milliseconds <= 0) {
    return 1;
  }

  return Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
};

const formatDate = (value) => {
  if (!value) {
    return "Select date";
  }

  return new Date(value).toLocaleString();
};

const FullBooking = ({
  activeCar,
  formData,
  bookings,
  onToggleFavorite,
  isFavorite,
  confirmation,
  bookingError,
}) => {
  if (!activeCar) {
    return null;
  }

  const dayCount = getDayCount(
    formData.pickupDateTime,
    formData.dropoffDateTime
  );
  const addOnTotal = Object.entries(formData.addOns).reduce(
    (total, [key, isEnabled]) =>
      isEnabled ? total + addOnPrices[key] * dayCount : total,
    0
  );
  const baseTotal = activeCar.price * dayCount;
  const promoDiscount =
    formData.promoCode.trim().toUpperCase() === "WEEKEND10"
      ? Math.round(baseTotal * 0.1)
      : 0;
  const grandTotal = baseTotal + addOnTotal + activeCar.securityDeposit - promoDiscount;

  return (
    <div className="w-full space-y-6 lg:w-[42%]">
      <div className="rounded-[32px] bg-white p-6 shadow-lg">
        <div className="overflow-hidden rounded-[24px]">
          <img
            src={activeCar.image || getFallbackCarImage(activeCar.name)}
            onError={(event) => attachFallbackImage(event, activeCar.name)}
            alt={activeCar.name}
            className="h-[240px] w-full object-cover"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              Selected car
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              {activeCar.name}
            </h2>
            <p className="mt-2 text-slate-500">
              {activeCar.category} . {activeCar.location} . {activeCar.rating} star
              rating
            </p>
          </div>
          <button
            type="button"
            onClick={() => onToggleFavorite(activeCar.id)}
            className={`rounded-2xl px-4 py-3 ${
              isFavorite ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} /> {isFavorite ? "Saved" : "Save"}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-500">Daily rate</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {formatInr(activeCar.price)}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-500">Trip length</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {dayCount} day{dayCount > 1 ? "s" : ""}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-500">Availability</p>
            <p className="mt-1 text-xl font-semibold text-emerald-700">
              {activeCar.availableNow ? `${activeCar.availableUnits} ready` : "Waitlist"}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-slate-900 p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Vehicle rental</span>
            <span>{formatInr(baseTotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-slate-300">Add-ons</span>
            <span>{formatInr(addOnTotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-slate-300">Security deposit</span>
            <span>{formatInr(activeCar.securityDeposit)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-emerald-300">
            <span>Promo discount</span>
            <span>-{formatInr(promoDiscount)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-lg font-semibold">
            <span>Estimated total</span>
            <span>{formatInr(grandTotal)}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-sky-50 px-4 py-4 text-sky-800">
            <FontAwesomeIcon icon={faShieldHeart} /> Premium roadside support
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-4 text-amber-800">
            <FontAwesomeIcon icon={faSnowflake} /> Sanitized before each trip
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-4 text-emerald-800">
            <FontAwesomeIcon icon={faCalendarCheck} /> Free cancellation in 24 hrs
          </div>
          <div className="rounded-2xl bg-violet-50 px-4 py-4 text-violet-800">
            <FontAwesomeIcon icon={faBolt} /> Fast pickup desk access
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-white p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-slate-900">Trip timeline</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="font-semibold text-slate-900">Pickup</p>
            <p className="mt-1">{formatDate(formData.pickupDateTime)}</p>
            <p className="mt-1">
              {formData.pickupCity || "City"}, {formData.pickupState || "State"}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="font-semibold text-slate-900">Drop-off</p>
            <p className="mt-1">{formatDate(formData.dropoffDateTime)}</p>
            <p className="mt-1">
              {formData.dropoffCity || "City"}, {formData.dropoffState || "State"}
            </p>
          </div>
        </div>
      </div>

      {confirmation && (
        <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm">
          <h3 className="text-2xl font-semibold">Booking confirmed</h3>
          <p className="mt-2">
            {confirmation.driverName}, your {confirmation.carName} has been
            reserved successfully.
          </p>
          <p className="mt-2 text-sm">
            Booking ID: {confirmation.id} . Status: {confirmation.status}
          </p>
        </div>
      )}

      {bookingError && (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-6 text-rose-900 shadow-sm">
          {bookingError}
        </div>
      )}

      <div className="rounded-[32px] bg-white p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-slate-900">Recent bookings</h3>
        <div className="mt-4 space-y-3">
          {bookings.length === 0 && (
            <p className="rounded-2xl bg-slate-50 px-4 py-4 text-slate-500">
              Your confirmed bookings will appear here.
            </p>
          )}
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-slate-200 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{booking.carName}</p>
                  <p className="text-sm text-slate-500">{booking.driverName}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {booking.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Pickup: {formatDate(booking.pickupDateTime)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullBooking;
