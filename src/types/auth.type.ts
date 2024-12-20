export interface registerUser_I {
  email: string;
  password: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  dob?: string;
  photo?: string;
  address?: string;
  gender?: string;
  status?: number;
}

export interface tokenUserSign_I {
  id: string;
  email: string;
  role: string;
}
