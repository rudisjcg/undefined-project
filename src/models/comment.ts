import makeId from "@/utils";
import mongoose, { Schema, ObjectId, models } from "mongoose";

export interface IComment {
    id: string;
    comment: string;
    rating: number;
    images: string[];
    itemId: string;
}

const CommentsSchema: Schema<IComment> = new Schema(
    {
        id: { type: String, default: "commt_" + makeId(20), required: true },
        comment: { type: String, required: true },
        rating: { type: Number, default: 0, required: true },
        images: { type: [String], default: [] },
        itemId: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Comment = models?.Comment || mongoose.model("Comment", CommentsSchema);
export default Comment;
