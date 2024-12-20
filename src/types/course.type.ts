import { Types } from "mongoose";

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
    query: Partial<addCourse_I>;
    page?: number;
    limit?: number;
  }

  