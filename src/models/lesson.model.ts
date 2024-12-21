import { Schema, Types } from 'mongoose';

export const lessonSchema = new Schema(
  {
    chapterId: { type: Types.ObjectId, required: true, ref: 'chapters' },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    video: { type: String },
    content: { type: String },
    duration: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ['video', 'content', 'quiz', 'assignment', 'discussion', 'test'],
    },
    status: {
      type: Number,
      enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
      default: 1,
    },
  },
  { timestamps: true }
);
