interface User {
  _id?: string;
  image?: string;
  name?: string;
  gender?: string;
  birthday?: string;
  phone?: string;
  password: string;
  email: string;
  address?: string;
  role?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default User;
