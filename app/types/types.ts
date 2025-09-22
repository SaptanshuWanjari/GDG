export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  coverUrl?: string;
  publishedYear: number;
  isbn: string;
  borrowCount: number;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  userId: string;
  borrowedAt: Date;
  returnedAt?: Date;
}
