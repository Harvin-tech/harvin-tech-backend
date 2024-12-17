import { Schema, Types } from 'mongoose';

export const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, default: null },
    image: { type: String, default: null },
    category: { type: String, required: true },
    instructor: { type: Types.ObjectId, ref: 'users' },
    price: { type: Number, default: 0 },
    level: { type: String },
    mrp: { type: Number, default: 0 },
    description: { type: String },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
