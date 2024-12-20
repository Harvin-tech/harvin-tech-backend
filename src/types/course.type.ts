import { Types } from 'mongoose';

export interface addCourse_I {
  title: string;
  subTitle?: string | null;
  image?: string | null;
  category: string;
  instructor: Types.ObjectId; // ObjectId reference to users
  price?: number;
  level?: string;
  mrp?: number;
  description: string;
  status?: 0 | 1 | -1;
}

export interface getCourse_I {
  search?: string;
  status?: 0 | 1 | -1;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  level?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface updateCourse_I {
  title?: string;
  subTitle?: string | null;
  image?: string | null;
  category?: string;
  instructor?: Types.ObjectId; // ObjectId reference to users
  price?: number;
  level?: string;
  mrp?: number;
  description: string;
  status?: 0 | 1 | -1;
}
