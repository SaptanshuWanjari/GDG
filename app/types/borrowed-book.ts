export interface BorrowedBook {
  _id?: string;
  bookId: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookTitle: string;
  bookAuthor: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "borrowed" | "returned" | "overdue";
  createdAt?: Date;
  updatedAt?: Date;
}