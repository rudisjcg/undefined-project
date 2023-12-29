import mongoose, { Schema, models } from "mongoose";

export interface Items {
  email: string;
  title: string;
  description: string;
  category: "producto" | "servicio" | "inmueble" | "vehiculo" | "otros";
  images: string[];
}

const itemSchema: Schema<Items> = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    category: {
      type: String,
      enum: ["producto", "servicio", "inmueble", "vehiculo", "otros"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 350,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = models?.Items || mongoose.model("Items", itemSchema);
export default Item;
