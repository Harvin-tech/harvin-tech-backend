import { Schema, Types } from 'mongoose';

export const chapterSchema = new Schema(
  {
    courseId: { type: Types.ObjectId, required: true, ref: 'courses' },
    title: { type: String, unique: true, required: true },
    description: { type: String },
    status: {
      type: Number,
      enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
      default: 0,
    },
  },
  { timestamps: true }
);
