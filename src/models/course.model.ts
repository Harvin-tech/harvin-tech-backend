import { Schema, Types } from 'mongoose';

export const courseSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    subTitle: { type: String },
    image: { type: String },
    category: { type: String, required: true },
    instructor: { type: Types.ObjectId, ref: 'users' },
    type: {
      type: String,
      enum: ['free', 'paid'],
      default: 'free',
    },
    price: { type: Number, default: 0 },
    level: { type: String },
    mrp: { type: Number, default: 0 },
    description: { type: String, required: true },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
