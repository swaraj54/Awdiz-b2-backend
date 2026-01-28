import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const isPhoneExist = await User.findOne({ phone: phone });
    if (isPhoneExist) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(password, "password", hashPassword);
    const newUser = User({ name: name, email, password: hashPassword, phone });
    console.log(newUser, "newUser");
    await newUser.save();
    return res.status(201).json({ success: true, message: "User registered" });
  } catch (error) {
    console.log("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email!" });
    }
    console.log(isUserExist, "isUserExist");

    const isPassowrdCorret = await bcrypt.compare(
      password,
      isUserExist.password,
    );

    if (!isPassowrdCorret) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password!" });
    }

    const token = await jwt.sign(
      { id: isUserExist._id, role: isUserExist.role },
      process.env.JWT_SECRET,
    );

    console.log(token, "token");

    res.cookie("token", token);

    // const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decryptedData, "decryptedData");

    const userData = {
      name: isUserExist.name,
      email: isUserExist.email,
      phone: isUserExist.phone,
      id: isUserExist._id,
    };
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      userData: userData,
    });
  } catch (error) {
    console.log("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error registering user" });
  }
};

export const logout = async (req, res) => {
  try {
    console.log(req.user, "req.user in logout");
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout Successful" });
  } catch (error) {
    console.log("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error registering user" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    console.log(req.user, "req.user in logout");
    const isUserExist = await User.findById(req.user._id);
    if (!isUserExist) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userData = {
      name: isUserExist.name,
      email: isUserExist.email,
      phone: isUserExist.phone,
      id: isUserExist._id,
    };
    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.log("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error registering user" });
  }
};
