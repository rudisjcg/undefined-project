import mongoose, { Schema, models } from "mongoose";

export interface User {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    avatar: string;
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
            maxlength: 50,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/djxhcwowp/image/upload/v1619633632/Avatars/avatar_zj2q3n.png",
        },
    },
    {
        timestamps: true
    }
)

const User = models?.User || mongoose.model("User", userSchema);
export default User;