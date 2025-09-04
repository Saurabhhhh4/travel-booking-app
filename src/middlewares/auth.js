const jwt = require("jsonwebtoken");

function auth(requiredRole = null) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || "";
      const token = header.startsWith("Bearer ") ? header.slice(7) : null;
      if (!token) return res.status(401).json({ error: "Unauthorized" });

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload; // { sub: id, email, role }
      if (requiredRole && payload.role !== requiredRole)
        return res.status(403).json({ error: "Forbidden" });
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = { auth };
