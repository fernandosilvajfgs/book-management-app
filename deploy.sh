#!/bin/bash

# Change to the directory of the script
cd "$(dirname "$0")"

# Navigate to backend, install dependencies, and initialize the database
cd backend
echo "Installing backend dependencies..."
npm install

echo "Initializing the database..."
node init_db.js # Run the database initialization script

echo "Starting backend server..."
npm start &

# Navigate to frontend and start the development server
cd ../frontend
echo "Installing frontend dependencies..."
npm install
echo "Starting frontend server..."
npm run dev

