# GoRide Rental

GoRide Rental is a React + Vite frontend with an Express + MySQL backend for browsing cars, registering users, saving favorites, and placing bookings.

## Local Development

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

3. Create env files:
```bash
copy .env.example .env
copy server\.env.example server\.env
```

4. Start the backend:
```bash
cd server
npm start
```

5. Start the frontend in a second terminal:
```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5001` by default.

## Public Deployment

The project is now prepared for a split deployment:

- Frontend: Vercel
- Backend API: Render
- Database: hosted MySQL

### Frontend on Vercel

1. Import this repo into Vercel.
2. Use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variable:
   - `VITE_API_BASE_URL=https://your-render-service.onrender.com`
4. Deploy.

`vercel.json` is included so React Router routes like `/cars`, `/booking`, `/login`, and `/register` work correctly on refresh.

### Backend on Render

1. Create a new Web Service from this repo.
2. Set the root directory to `server`.
3. Use:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `FRONTEND_URL=https://your-vercel-site.vercel.app`

`render.yaml` is included to make that setup easier.

### Database

The backend auto-creates the schema and seeds the cars table on startup. Point the backend to a reachable MySQL instance using the values in `server/.env.example`.

## Features

- Live car catalog from MySQL
- User registration and sign-in
- Booking flow with add-ons and price summary
- SQL-backed booking persistence
- Favorites in browser storage
- Responsive catalog and booking pages

## Notes

- `localhost` links only work on your own machine.
- Once deployed, send your friends the Vercel frontend URL.
- Passwords are still stored in plaintext right now. Hashing should be the next backend security improvement.
