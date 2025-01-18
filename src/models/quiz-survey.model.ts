import { Schema } from 'mongoose';

export const quizSurveySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      default: null,
    },
    selectedProgram: {
      type: String,
      default: null,
    },
    goal: {
      type: String,
      default: null,
    },
    track: {
      type: String,
      default: null,
    },
    exsistingUser: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // 0 = inactive, 1 = active, 2 = deleted
      default: 1,
    },
  },
  { timestamps: true }
);
