CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  year INT NOT NULL,
  passengers INT NOT NULL,
  mileage DECIMAL(4,1) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  transmission VARCHAR(50) NOT NULL,
  category VARCHAR(80) NOT NULL,
  location VARCHAR(120) NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  reviews INT NOT NULL DEFAULT 0,
  available_now TINYINT(1) NOT NULL DEFAULT 1,
  available_units INT NOT NULL DEFAULT 0,
  security_deposit DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_per_day DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_reference VARCHAR(40) NOT NULL UNIQUE,
  car_id INT NOT NULL,
  driver_name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  pickup_country VARCHAR(80) NOT NULL,
  pickup_state VARCHAR(80) NOT NULL,
  pickup_city VARCHAR(120) NOT NULL,
  pickup_street VARCHAR(160) NOT NULL,
  pickup_landmark VARCHAR(160) NOT NULL,
  pickup_datetime DATETIME NOT NULL,
  dropoff_country VARCHAR(80) NOT NULL,
  dropoff_state VARCHAR(80) NOT NULL,
  dropoff_city VARCHAR(120) NOT NULL,
  dropoff_street VARCHAR(160) NOT NULL,
  dropoff_landmark VARCHAR(160) NOT NULL,
  dropoff_datetime DATETIME NOT NULL,
  promo_code VARCHAR(60),
  daily_rate DECIMAL(10,2) NOT NULL,
  security_deposit DECIMAL(10,2) NOT NULL,
  addons_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_car FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE TABLE IF NOT EXISTS booking_addons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  addon_key VARCHAR(60) NOT NULL,
  addon_label VARCHAR(120) NOT NULL,
  addon_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_booking_addons_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
