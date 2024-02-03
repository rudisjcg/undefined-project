import makeId from "@/utils";
import mongoose, { Schema, ObjectId, models } from "mongoose";

export interface Customers {
  id: string;
  user: ObjectId;
  type: string;
  comments: ObjectId[];
}

const CustomerSchema: Schema<Customers> = new Schema(
  {
    id: { type: String, default: "cust_" + makeId(20), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, default: "customer", required: true },
  },
  {
    timestamps: true,
  }
);

const Customer = models?.Customer || mongoose.model("Customer", CustomerSchema);
export default Customer;
