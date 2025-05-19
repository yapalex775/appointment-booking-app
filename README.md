
# React + Node.js + MySQL Fullstack App

This is a fullstack web application using **React** on the frontend, **Node.js (Express)** on the backend, and **MySQL** for the database. It features:

- JWT Authentication with token refresh
- Protected API and frontend routes
- Appointments and Schedules management
- Sequelize-based migrations and seeders
- Tailwind CSS styling

---

## 🔧 Technologies Used

- React (Vite)
- Node.js + Express
- MySQL
- Sequelize (ORM)
- JWT Auth (Access + Refresh tokens)
- Axios + Interceptors
- Tailwind CSS

---

## 📦 Project Structure

```
/frontend        → React frontend (Vite)
/backend        → Express backend
/backend/models → Sequelize models
/backend/routes → API routes
/backend/controllers → Route controllers
/backend/migrations → Sequelize migrations
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yapalex775/appointment-booking-app
cd appointment-booking-app
```

---

## 📁 Backend Setup (`/backend`)

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure the Database

Update your `.env` file or `config/config.js`:

```env
DB_USER=app_user
DB_PASS=app_pass
DB_NAME=app_db
DB_HOST=localhost
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

## 🎨 Frontend Setup (`/frontend`)

### 4. Install Client Dependencies

```bash
cd ../frontend
npm install
```

### 5. Start the Docker Containers

Make sure Docker is installed and running on your machine.

Then, in the root of the project (where your docker-compose.yml file is located), run:

```bash
docker-compose up --build
```

This will:

- Build the Docker images (if not already built).

- Start all defined services (e.g., backend, frontend, database).

To run the containers in the background (detached mode), use:

```bash
docker-compose up -d --build
```

To stop the containers:

```bash
docker-compose down
```

### 6. Run Migrations

```bash
npx sequelize-cli db:migrate
```

To undo:

```bash
npx sequelize-cli db:migrate:undo
```

### 7. Run Seeders

To run all seeders:

```bash
npx sequelize-cli db:seed:all
```

To run a specific seeder:

```bash
npx sequelize-cli db:seed --seed path/to/your-seeder-file.js
```

To undo seeders:

```bash
npx sequelize-cli db:seed:undo:all
```

The app will be available at `http://localhost:3000`.

---

## 🔐 Authentication

- Uses JWT with access and refresh tokens.
- Axios interceptors handle automatic token refreshing.
- `AuthContext` is used to share user state in React.

---

## 🧾 API Endpoints (Sample)

| Method | Route                | Description             |
|--------|----------------------|-------------------------|
| POST   | `/api/auth/register` | Register user           |
| POST   | `/api/auth/login`    | Log in + issue tokens   |
| GET    | `/api/appointments`  | List user appointments  |
| POST   | `/api/appointments`  | Create new appointment  |

---

## 🌈 Tailwind CSS Setup

Tailwind is configured via `tailwind.config.js` and `src/index.css`.

To use semantic colors like `text-primary`, add them to the config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#14B8A6',
        neutral: '#F3F4F6',
      }
    }
  }
}
```

---

## 🛡️ Protected Frontend Routes

- Appointments page is located at:  
  `http://localhost:3000/dashboard/appointments`
- Uses React Router + context-based auth guards.

---

## ✍️ Schedule & Appointment Schema

- Each `Schedule` belongs to a `User`
- Each `Appointment` has a one-to-one relationship with a `Schedule`

---

## 📄 Scripts

### Backend

```bash
npm run dev          # Starts server with nodemon
npx sequelize-cli ... # For migrations and seeders
```

### Frontend

```bash
npm start          # Starts Vite dev server
```

---

## 📬 Questions or Issues?

Feel free to open an issue or pull request. Happy coding!
