#!/bin/bash

# Change to the directory of the script
cd "$(dirname "$0")"

# Navigate to backend and start the server
cd backend
echo "Installing backend dependencies..."
npm install
echo "Starting backend server..."
npm start &

# Navigate to frontend and start the development server
cd ../frontend
echo "Installing frontend dependencies..."
npm install
echo "Starting frontend server..."
npm run dev
