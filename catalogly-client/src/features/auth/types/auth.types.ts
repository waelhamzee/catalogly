export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role | null;
  createdAt?: string;
  updatedAt?: string;
}
