import mongoose, { Schema, models } from "mongoose";

export interface Items {
  email: string;
  title: string;
  description: string;
  category: "producto" | "servicio" | "inmueble" | "vehiculo" | "otros";
  images: string[];
  listed: boolean;
  likes?: string[];
  comments?: string[];
  price?: number;
  rating?: number;

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
    },
    images: {
      type: [String],
    },
    listed: {
      type: Boolean,
      default: true,
    },
    likes: {
      type: [String],
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId, ref: "Comment",
    },
    price: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
    },


  },
  {
    timestamps: true,
  }
);

const Item = models?.Items || mongoose.model("Items", itemSchema);
export default Item;
