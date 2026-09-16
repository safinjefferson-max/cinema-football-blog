# Cinema & Football Blog

A ready-to-use React + Express + MySQL blog for publishing Cinema and Football articles.

## Requirements
- Node.js
- MySQL
- Create React App

## 1. Database
Create a MySQL database and run `database.sql`.

Default admin login:
- username: admin
- password: admin123

Change the admin password before putting the site online.

## 2. Backend
Open a terminal in `backend`:
```bash
npm install
node server.js
```

Edit the MySQL password in `backend/server.js` if needed.

## 3. Frontend
Open another terminal in `frontend`:
```bash
npm install
npm start
```

The public site runs at http://localhost:3000
Admin login: http://localhost:3000/admin

## Important
The `/admin` route is not linked from the public navigation. The dashboard is protected by an admin login. For a real public deployment, use HTTPS and move credentials/secrets into environment variables.
