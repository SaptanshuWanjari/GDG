export interface Owner {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  role: "owner";
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
  promotedBy?: string; // ID of the owner who promoted them
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  role: "user";
  createdAt: Date;
  updatedAt: Date;
}
