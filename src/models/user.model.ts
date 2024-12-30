import { Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    loginMethod: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // 1 = email, 2 = google, 3 = github, 4 = linkedin, 5 = twitter
      default: 1,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    middleName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    mobile: {
      type: Number,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
    gender: {
      type: Number,
      enum: [1, 2, 3, 4], // 1 = male, 2 = female, 3 = other, 4 = not specified
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'instructor', 'super-admin'],
      default: 'student',
    },
    socialId: {
      type: String,
      default: null,
    },
    socialResponse: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // 0 = inactive, 1 = active, 2 = deleted
      default: 1,
    },
  },
  { timestamps: true }
);
