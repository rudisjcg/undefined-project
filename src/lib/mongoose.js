import mongoose from "mongoose";

export function mongooseConnect() {
    if (mongoose?.connection?.readyState === 1) {
        return mongoose?.connection?.asPromise();
    } else {
        try {
            const uri = process.env.MONGODB_URI;
            if (!uri) {
                throw new Error("MONGODB_URI is not defined");
            }
            console.log("Connecting to MongoDB...", uri)
            return mongoose?.connect(uri || "");
        } catch (error) {
            console.log(error);
        }
    }
}