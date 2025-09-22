export interface Book {
  _id?: string; // MongoDB will assign this automatically
  title: string;
  author: string;
  category: string;
  coverUrl?: string;
  summary?: string;
  publishedYear?: number;
  isbn?: string;
  borrowCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
