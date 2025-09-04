const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { models } = require("../db");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "name,email,password required" });

    const exist = await models.User.findOne({ where: { email } });
    if (exist) return res.status(409).json({ error: "Email already used" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await models.User.create({ name, email, password_hash });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email,password required" });

    const user = await models.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await user.checkPassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
    res.json({ token });
  } catch (e) {
    next(e);
  }
}

module.exports = { register, login };
