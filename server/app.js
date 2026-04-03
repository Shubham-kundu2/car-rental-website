const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs/promises");
const fssync = require("fs");
const net = require("net");
const path = require("path");
const seedCars = require("./data/seedCars");

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5001;
const DB_NAME = process.env.DB_NAME || "car_rental_db";
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const portFilePath = path.join(__dirname, "..", ".backend-port");
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]
  .filter(Boolean)
  .flatMap((origin) => origin.split(","))
  .map((origin) => origin.trim())
  .filter(Boolean);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: DB_PORT,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Shub2002@",
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const addOnCatalog = {
  gps: { label: "Navigation GPS", price: 450 },
  childSeat: { label: "Child seat", price: 650 },
  insurance: { label: "Premium protection", price: 1200 },
};

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

const mapCar = (car) => ({
  id: String(car.id),
  name: car.name,
  year: car.year,
  noOfPeople: car.passengers,
  mileage: Number(car.mileage),
  fuel: car.fuel_type,
  type: car.transmission,
  category: car.category,
  location: car.location,
  rating: Number(car.rating),
  reviews: car.reviews,
  availableNow: Boolean(car.available_now),
  availableUnits: car.available_units,
  securityDeposit: Number(car.security_deposit),
  price: Number(car.price_per_day),
  image: car.image_url,
});

const formatDateTimeForMySql = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const pad = (segment) => String(segment).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

const createBookingReference = () =>
  `GR-${Date.now().toString(36).toUpperCase()}`;

const writeActivePort = async (port) => {
  await fs.writeFile(portFilePath, String(port), "utf8");
};

const removeStalePortFile = () => {
  if (fssync.existsSync(portFilePath)) {
    fssync.unlinkSync(portFilePath);
  }
};

const isPortAvailable = (port) =>
  new Promise((resolve) => {
    const tester = net
      .createServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        tester.close(() => resolve(true));
      })
      .listen(port);
  });

const findAvailablePort = async (startingPort) => {
  let port = startingPort;

  while (!(await isPortAvailable(port))) {
    port += 1;
  }

  return port;
};

const ensureDatabase = async () => {
  const adminPool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: DB_PORT,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Shub2002@",
    waitForConnections: true,
    connectionLimit: 2,
  });

  await adminPool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await adminPool.end();

  const schemaPath = path.join(__dirname, "db", "schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");
  const statements = schemaSql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await pool.query(statement);
  }

  const upsertSql = `
    INSERT INTO cars (
      name, year, passengers, mileage, fuel_type, transmission, category,
      location, rating, reviews, available_now, available_units,
      security_deposit, price_per_day, image_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      year = VALUES(year),
      passengers = VALUES(passengers),
      mileage = VALUES(mileage),
      fuel_type = VALUES(fuel_type),
      transmission = VALUES(transmission),
      category = VALUES(category),
      location = VALUES(location),
      rating = VALUES(rating),
      reviews = VALUES(reviews),
      available_now = VALUES(available_now),
      available_units = VALUES(available_units),
      security_deposit = VALUES(security_deposit),
      price_per_day = VALUES(price_per_day),
      image_url = VALUES(image_url)
  `;

  for (const car of seedCars) {
    await pool.query(upsertSql, [
      car.name,
      car.year,
      car.passengers,
      car.mileage,
      car.fuel_type,
      car.transmission,
      car.category,
      car.location,
      car.rating,
      car.reviews,
      car.available_now,
      car.available_units,
      car.security_deposit,
      car.price_per_day,
      car.image_url,
    ]);
  }
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/cars", async (_req, res) => {
  try {
    const [cars] = await pool.query(
      "SELECT * FROM cars ORDER BY available_now DESC, rating DESC, price_per_day ASC"
    );
    res.json(cars.map(mapCar));
  } catch (error) {
    console.error("Cars fetch error:", error);
    res.status(500).json({ message: "Unable to fetch cars" });
  }
});

app.get("/api/bookings", async (_req, res) => {
  try {
    const [bookings] = await pool.query(
      `
        SELECT
          b.id,
          b.booking_reference,
          b.driver_name,
          b.phone,
          b.pickup_datetime,
          b.dropoff_datetime,
          b.total_amount,
          b.status,
          b.created_at,
          c.name AS car_name,
          c.image_url AS car_image
        FROM bookings b
        INNER JOIN cars c ON c.id = b.car_id
        ORDER BY b.created_at DESC
        LIMIT 10
      `
    );

    res.json(
      bookings.map((booking) => ({
        id: booking.booking_reference,
        status: booking.status,
        driverName: booking.driver_name,
        phone: booking.phone,
        pickupDateTime: booking.pickup_datetime,
        dropoffDateTime: booking.dropoff_datetime,
        totalAmount: Number(booking.total_amount),
        carName: booking.car_name,
        carImage: booking.car_image,
        createdAt: booking.created_at,
      }))
    );
  } catch (error) {
    console.error("Bookings fetch error:", error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

app.post("/api/bookings", async (req, res) => {
  const {
    carId,
    driverName,
    phone,
    pickupCountry,
    pickupState,
    pickupCity,
    pickupStreet,
    pickupLandmark,
    pickupDateTime,
    dropoffCountry,
    dropoffState,
    dropoffCity,
    dropoffStreet,
    dropoffLandmark,
    dropoffDateTime,
    promoCode,
    addOns = {},
  } = req.body;

  if (
    !carId ||
    !driverName ||
    !phone ||
    !pickupCountry ||
    !pickupState ||
    !pickupCity ||
    !pickupStreet ||
    !pickupLandmark ||
    !pickupDateTime ||
    !dropoffCountry ||
    !dropoffState ||
    !dropoffCity ||
    !dropoffStreet ||
    !dropoffLandmark ||
    !dropoffDateTime
  ) {
    return res.status(400).json({ message: "All booking fields are required." });
  }

  const pickupMySql = formatDateTimeForMySql(pickupDateTime);
  const dropoffMySql = formatDateTimeForMySql(dropoffDateTime);

  if (
    !pickupMySql ||
    !dropoffMySql ||
    new Date(dropoffDateTime) <= new Date(pickupDateTime)
  ) {
    return res.status(400).json({ message: "Booking dates are invalid." });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [carRows] = await connection.query("SELECT * FROM cars WHERE id = ?", [
      Number(carId),
    ]);

    if (carRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Selected car was not found." });
    }

    const car = carRows[0];
    const rentalDays = Math.max(
      1,
      Math.ceil(
        (new Date(dropoffDateTime).getTime() - new Date(pickupDateTime).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    const selectedAddOns = Object.entries(addOns)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([key]) => ({
        key,
        ...addOnCatalog[key],
      }))
      .filter((addon) => addon.label);

    const addonsTotal = selectedAddOns.reduce(
      (total, addon) => total + addon.price * rentalDays,
      0
    );
    const dailyRate = Number(car.price_per_day);
    const securityDeposit = Number(car.security_deposit);
    const baseTotal = dailyRate * rentalDays;
    const discountTotal =
      String(promoCode || "").trim().toUpperCase() === "WEEKEND10"
        ? Math.round(baseTotal * 0.1)
        : 0;
    const totalAmount = baseTotal + addonsTotal + securityDeposit - discountTotal;
    const bookingReference = createBookingReference();

    const [duplicateRows] = await connection.query(
      `
        SELECT booking_reference
        FROM bookings
        WHERE car_id = ?
          AND driver_name = ?
          AND phone = ?
          AND pickup_datetime = ?
          AND dropoff_datetime = ?
          AND TIMESTAMPDIFF(SECOND, created_at, NOW()) <= 60
        LIMIT 1
      `,
      [
        Number(carId),
        driverName,
        phone,
        pickupMySql,
        dropoffMySql,
      ]
    );

    if (duplicateRows.length > 0) {
      await connection.rollback();
      return res.status(409).json({
        message: "This booking was already submitted. Please wait for confirmation.",
      });
    }

    const [bookingResult] = await connection.query(
      `
        INSERT INTO bookings (
          booking_reference, car_id, driver_name, phone,
          pickup_country, pickup_state, pickup_city, pickup_street, pickup_landmark, pickup_datetime,
          dropoff_country, dropoff_state, dropoff_city, dropoff_street, dropoff_landmark, dropoff_datetime,
          promo_code, daily_rate, security_deposit, addons_total, discount_total, total_amount, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        bookingReference,
        Number(carId),
        driverName,
        phone,
        pickupCountry,
        pickupState,
        pickupCity,
        pickupStreet,
        pickupLandmark,
        pickupMySql,
        dropoffCountry,
        dropoffState,
        dropoffCity,
        dropoffStreet,
        dropoffLandmark,
        dropoffMySql,
        promoCode || null,
        dailyRate,
        securityDeposit,
        addonsTotal,
        discountTotal,
        totalAmount,
        "Confirmed",
      ]
    );

    if (selectedAddOns.length > 0) {
      const addonValues = selectedAddOns.map((addon) => [
        bookingResult.insertId,
        addon.key,
        addon.label,
        addon.price,
      ]);

      await connection.query(
        "INSERT INTO booking_addons (booking_id, addon_key, addon_label, addon_price) VALUES ?",
        [addonValues]
      );
    }

    await connection.commit();

    res.status(201).json({
      id: bookingReference,
      status: "Confirmed",
      driverName,
      phone,
      pickupDateTime,
      dropoffDateTime,
      totalAmount,
      carName: car.name,
      carImage: car.image_url,
      rentalDays,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Unable to create booking" });
  } finally {
    connection.release();
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const [results] = await pool.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (results.length > 0) {
      return res.status(400).send("Already registered");
    }

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return res.status(200).send("Registered successfully");
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    const [results] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (results.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    return res.status(200).send("Success");
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send("Database error");
  }
});

ensureDatabase()
  .then(async () => {
    await pool.query("SELECT 1");
    const activePort = await findAvailablePort(DEFAULT_PORT);
    await writeActivePort(activePort);

    const server = app.listen(activePort, () => {
      if (activePort !== DEFAULT_PORT) {
        console.log(
          `Port ${DEFAULT_PORT} was busy, so the server started on http://localhost:${activePort}`
        );
      } else {
        console.log(`Server is running on http://localhost:${activePort}`);
      }
    });

    server.on("close", removeStalePortFile);
    process.on("SIGINT", () => {
      removeStalePortFile();
      server.close(() => process.exit(0));
    });
    process.on("SIGTERM", () => {
      removeStalePortFile();
      server.close(() => process.exit(0));
    });
  })
  .catch((error) => {
    console.error("MySQL initialization failed:", error.message);
    process.exit(1);
  });
