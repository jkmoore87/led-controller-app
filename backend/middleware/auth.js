import jwt from "jsonwebtoken";

// Middleware: verify JWT token and attach user info to req.user
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      name: decoded.name,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Alias for legacy or other routes that expect `authRequired`
export const authRequired = verifyToken;
