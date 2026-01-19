import User from "../models/user.schema.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).send("All fields are required");
    }
    const newUser = User({ name: name, email, password, phone });
    console.log(newUser, "newUser");
    await newUser.save();
    return res.status(201).send("User registered");
  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(500).send("Error registering user");
  }
};

export const login = (req, res) => {
  // Login logic here
  res.send("User logged in");
};
