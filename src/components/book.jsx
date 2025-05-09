import BookingForm from "./bookingForm";
import FullBooking from "./fullBooking";

const Book = () => {
  return (
    <>
      <div className="flex ml-[250px] mt-[100px]">
        <BookingForm />
        <FullBooking />
      </div>
    </>
  );
};

export default Book;
