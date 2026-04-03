import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BookingForm from "./bookingForm";
import FullBooking from "./fullBooking";

const getInitialFormState = (carPrice = 0) => ({
  driverName: "",
  phone: "",
  pickupCountry: "",
  pickupState: "",
  pickupCity: "",
  pickupStreet: "",
  pickupLandmark: "",
  pickupDateTime: "",
  dropoffCountry: "",
  dropoffState: "",
  dropoffCity: "",
  dropoffStreet: "",
  dropoffLandmark: "",
  dropoffDateTime: "",
  addOns: {
    gps: false,
    childSeat: false,
    insurance: true,
  },
  promoCode: "",
  basePrice: carPrice,
});

const Book = ({
  cars,
  selectedCar,
  isAuthenticated,
  favoriteCarIds,
  onToggleFavorite,
  onCreateBooking,
  bookings,
  onSelectCar,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCarIdFromUrl = searchParams.get("car");
  const activeCar =
    cars.find((car) => car.id === selectedCarIdFromUrl) ?? selectedCar;
  const [formData, setFormData] = useState(
    getInitialFormState(activeCar?.price ?? 0)
  );
  const [confirmation, setConfirmation] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionLockRef = useRef(false);

  useEffect(() => {
    if (activeCar) {
      onSelectCar(activeCar.id);
      setFormData((currentFormData) => ({
        ...currentFormData,
        basePrice: activeCar.price,
      }));
    }
  }, [activeCar, onSelectCar]);

  const handleBookingSubmit = async (bookingPayload) => {
    if (submissionLockRef.current) {
      return;
    }

    try {
      submissionLockRef.current = true;
      setIsSubmitting(true);
      setBookingError("");

      const confirmedBooking = await onCreateBooking({
        ...bookingPayload,
        carId: activeCar.id,
      });

      setConfirmation(confirmedBooking);
      navigate(`/booking?car=${activeCar.id}`, { replace: true });
    } catch (error) {
      console.error("Booking submission failed", error);
      setBookingError(
        error?.response?.data?.message ||
          "We could not save your booking right now."
      );
    } finally {
      setIsSubmitting(false);
      submissionLockRef.current = false;
    }
  };

  if (!activeCar) {
    return (
      <div className="mx-auto mt-24 max-w-3xl rounded-[32px] bg-white p-8 text-center shadow-lg">
        <h2 className="text-3xl font-semibold text-slate-900">
          Select a car to start your booking
        </h2>
        <p className="mt-3 text-slate-500">
          Visit the cars page to choose a vehicle and then come back here to
          reserve it.
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectTo = `/booking${selectedCarIdFromUrl ? `?car=${selectedCarIdFromUrl}` : ""}`;

    return (
      <div className="mx-auto mt-16 max-w-4xl px-4 pb-12">
        <div className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-8 py-10 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-200">
            Authentication required
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Sign in before confirming your booking
          </h1>
          <p className="mt-4 max-w-2xl text-slate-200">
            To reserve the {activeCar.name}, we first need you to create an
            account or log in so your booking details and confirmation stay tied
            to you.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to={`/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="rounded-2xl bg-white px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Sign In First
            </Link>
            <Link
              to={`/register?redirect=${encodeURIComponent(redirectTo)}`}
              className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/20"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto mt-10 max-w-7xl px-4 pb-12 md:mt-16">
        <div className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-6 py-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-200">
            Vehicle booking
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold md:text-5xl">
                Reserve your next ride with live trip details
              </h1>
              <p className="mt-3 max-w-3xl text-slate-200">
                Choose your car, save favorites, add essentials like protection
                or GPS, and confirm the trip in one place.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold md:grid-cols-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                {favoriteCarIds.length} favorites
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                {bookings.length} recent bookings
              </div>
              <div className="rounded-2xl bg-emerald-400/20 px-4 py-3 text-emerald-100">
                Instant confirmation
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          <BookingForm
            activeCar={activeCar}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmitting}
          />
          <FullBooking
            activeCar={activeCar}
            formData={formData}
            bookings={bookings}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteCarIds.includes(activeCar?.id)}
            confirmation={confirmation}
            bookingError={bookingError}
          />
        </div>
      </div>
    </>
  );
};

export default Book;
