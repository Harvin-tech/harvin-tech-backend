import { Schema, Types } from 'mongoose';

export const moduleSchema = new Schema(
  {
    courseId: { type: Types.ObjectId, required: true, ref: 'courses' },
    title: { type: String, required: true },
    description: { type: String, default: null },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
