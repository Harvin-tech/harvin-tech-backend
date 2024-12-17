import { Schema, Types } from 'mongoose';

export const chapterSchema = new Schema(
  {
    moduleId: { type: Types.ObjectId, required: true, ref: 'modules' },
    title: { type: String, required: true },
    description: { type: String, default: null },
    image: { type: String, default: null },
    video: { type: String, default: null },
    content: { type: String, default: null },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
