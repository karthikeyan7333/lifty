# 🚗 Lifty – Ride Sharing Platform

A portfolio-quality MERN Stack Ride Sharing Platform where people who are already travelling can publish rides, and other users can book available seats.

---

## 🏗️ System Architecture

![Lifty System Architecture](./architecture/system-architecture.png)

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Bootstrap 5
- Bootstrap Icons
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

### APIs
- Google Maps API
- Google Places API
- Razorpay (Test Mode)

## Deployment configuration

### Render frontend (Static Site)

Add this environment variable to the frontend service and rebuild/redeploy:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | `https://lifty-backend.onrender.com` |

Vite embeds `VITE_*` values into the frontend at build time. Set this on the
frontend service (not only on the backend) before the build. The local fallback
is `http://localhost:5000`.

### Render backend (Web Service)

Set `FRONTEND_URL` to the exact deployed frontend origin, including the scheme
and hostname but no path (for example, `https://your-frontend.onrender.com`).
The backend also allows `http://localhost:5173` and
`http://127.0.0.1:5173` for local development. Keep existing backend secrets
and database settings in Render's environment settings; do not put them in the
frontend or commit them.

After setting these values, redeploy both services. Confirm the frontend URL
matches `FRONTEND_URL` exactly, then test login, registration, rides, bookings,
provider uploads, and admin actions from the deployed site.
