import mongoose, { Schema, models } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar: string;
  verified: boolean;
}

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://rudis-crudprac.s3.amazonaws.com/1694825349176.jpeg",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || mongoose.model("User", userSchema);
export default User;
