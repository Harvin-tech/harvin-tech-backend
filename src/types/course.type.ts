import { Types } from 'mongoose';

export interface chapters_I {
  courseId?: Types.ObjectId;
  title: string;
  description: string;
  status?: 0 | 1 | -1;
  lessons?: lessons_I[];
}

export interface lessons_I {
  chapterId?: Types.ObjectId;
  title: string;
  description?: string;
  image?: string;
  video?: string;
  content?: string;
  duration?: number;
  type?: string;
  status?: 0 | 1 | -1;
}
export interface createCourse_I {
  title: string;
  slug: string;
  subTitle?: string | null;
  image?: string | null;
  category: string;
  instructor: Types.ObjectId; // ObjectId reference to users
  type: string;
  price?: number;
  level?: string;
  mrp?: number;
  description: string;
  status?: 0 | 1 | -1;
  chapters?: chapters_I[];
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

export interface enrollCourse_I {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface getEnrolledCoursesQuery_I {
  search?: string;
  page?: number;
  limit?: number;
}

export interface getEnrolledCourse_I {
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
