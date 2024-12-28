export interface requestReadUser_I {
  id: string;
  email: string;
  role: string;
}

export interface getUserQuery_I {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
}

export interface updateUser_I {
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  dob?: string;
  photo?: string;
  address?: string;
  gender?: string;
  role?: string;
  status?: number;
}

export interface changePassword_I {
  email: string;
  oldPassword: string;
  newPassword: string;
}
