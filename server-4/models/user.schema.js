import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, unique: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", UserSchema);
export default User;
