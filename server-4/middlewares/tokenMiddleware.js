import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

export const tokenMiddleware = async (req, res, next) => {
  try {
    const skipPaths = ["/auth/login", "/auth/register"];
    const currentPath = req.path;
    console.log(currentPath, "currentPath");
    if (skipPaths.map((path) => currentPath.startsWith(path)).includes(true)) {
      return next();
    }
    console.log(req, " req");
    console.log(req.headers.cookie, " req.headers");
    console.log(req.cookie, " req.cookie");
    const token = req.headers.cookie.split("=")[1];
    console.log(token, "token");
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoededData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoededData, "decoededData");
    const isUserExist = await User.findById(decoededData.id);
    if (!isUserExist) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = isUserExist; // Attaching user data to req object
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// res - if you DONT want to pass req to contorller
// next - if you want to pass req to contorller
