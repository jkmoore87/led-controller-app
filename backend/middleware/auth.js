// Import the jsonwebtoken library, used to sign and verify JWT tokens
import jwt from "jsonwebtoken";

// Middleware function to verify a JWT token and attach user information to the request object
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

 // Check if the Authorization header exists and starts with "Bearer ", if not, respond with 401 Unauthorized
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {

// Verify the token using the secret key stored in environment variables, if valid, decode the token to get the user's information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Attach user info to req.user so that downstream middleware/routes can access it
    req.user = {
      id: decoded.id,
      name: decoded.name,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };

// Call next() to pass control to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Alias for legacy or other routes that expect `authRequired`
export const authRequired = verifyToken;
