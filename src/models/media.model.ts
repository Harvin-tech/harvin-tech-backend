import { Schema, Types } from 'mongoose';

export const mediaSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: 'courses' },
    title: { type: String, default: null },
    fileName: { type: String, required: true },
    fileExtension: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    s3Path: { type: String, required: true },
    description: { type: String, default: null },
  },
  { timestamps: true }
);
