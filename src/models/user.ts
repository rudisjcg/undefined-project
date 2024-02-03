import mongoose, { ObjectId, Schema, models } from "mongoose";

export interface User {
  _id?: ObjectId | string | undefined;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "customer" | "vendor" | "admin";
  avatar: string;
  verified: boolean;
}

const userSchema: Schema<User> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
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
    phoneNumber: {
      type: String,
      required: true,
      default: "123456",
    },
    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
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
