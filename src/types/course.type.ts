export interface addCourse_I {
    title: string;
    subTitle?: string | null;
    image?: string | null;
    category: string;
    instructor: string; // ObjectId reference to users
    price?: number;
    level?: string;
    mrp?: number;
    description: string;
    status?: 0 | 1 | -1;
    
  }
  