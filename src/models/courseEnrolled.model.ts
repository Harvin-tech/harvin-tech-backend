import { Schema, Types } from 'mongoose';

export const courseEnrolledSchema = new Schema(
  {
    courseId: { type: Types.ObjectId, required: true, ref: 'courses' },
    userId: { type: Types.ObjectId, required: true, ref: 'users' },
    overAllProgress: { type: Number, default: 0 },
    enrolledAt: { type: Date, default: Date.now },
    startedAt: { type: Date, default: Date.now },
    lastAccessedAt: { type: Date, default: Date.now },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
