import apiClient from "./apiClient";

export const fetchCars = async () => {
  const response = await apiClient.get("/api/cars");
  return response.data;
};

export const fetchBookings = async () => {
  const response = await apiClient.get("/api/bookings");
  return response.data;
};

export const createBooking = async (payload) => {
  const response = await apiClient.post("/api/bookings", payload);
  return response.data;
};
