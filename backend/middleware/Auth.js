import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers.authorization);

    let token = req.cookies.token;

    // ✅ If no cookie token, check header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuthenticated;
