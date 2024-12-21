import { Schema, Types } from 'mongoose';

export const enrollmentSchema = new Schema(
  {
    courseId: { type: Types.ObjectId, required: true, ref: 'courses' },
    userId: { type: Types.ObjectId, required: true, ref: 'users' },
    overAllProgress: { type: Number, default: 0 },
    enrolledAt: { type: Date, default: Date.now },
    startedAt: { type: Date, default: Date.now },
    lastAccessedAt: { type: Date, default: Date.now },
    expiredAt: { type: Date, default: Date.now },
    amountPaid: { type: Number, default: 0 },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 1,
    },
  },

  { timestamps: true }
);
