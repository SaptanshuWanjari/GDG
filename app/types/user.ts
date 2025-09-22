export interface User {
  _id?: string; // MongoDB will assign this automatically
  email: string;
  password: string; // Store hashed password
  name?: string;
  role: "user" | "admin" | "owner"; // Add owner role
  createdAt?: Date;
}
