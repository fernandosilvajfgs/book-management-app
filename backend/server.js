require('dotenv').config();
const express = require('express');
const session = require("express-session");
const AuthController = require("./controllers/authController");
const authMiddleware = require("./middlewares/authMiddleware");
const crypto = require('crypto');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'), 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.post('/login', AuthController.login);
app.post('/logout', AuthController.logout);

app.use('/admin/books', authMiddleware, bookRoutes);
app.use('/books', bookRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
