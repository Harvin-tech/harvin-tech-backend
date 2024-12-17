import { Schema, Types } from 'mongoose';

export const moduleEnrolledSchema = new Schema(
  {
    moduleId: { type: Types.ObjectId, required: true, ref: 'modules' },
    userId: { type: Types.ObjectId, required: true, ref: 'users' },
    overAllProgress: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    enrolledAt: { type: Date, default: Date.now },
    lastAccessedAt: { type: Date, default: Date.now },
    status: {
      type: Number,
      enum: [0, 1, -1],
      default: 0,
    },
  },
  { timestamps: true }
);
