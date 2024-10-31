const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASHED = process.env.ADMIN_PASSWORD_HASHED;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASHED || !JWT_SECRET) {
  throw new Error("Missing essential environment variables: Please ensure ADMIN_USERNAME, ADMIN_PASSWORD_HASHED, and JWT_SECRET are set in the .env file.");
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    if (username === ADMIN_USERNAME) {
      const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASHED);
      if (passwordMatch) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful!", token });
      }
    }
    res.status(401).json({ message: "Invalid username or password." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful!" });
};
