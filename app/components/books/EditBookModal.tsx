"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Book } from "@/app/types/book";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  publishedYear: z.string().min(4, {
    message: "Published year must be at least 4 characters.",
  }),
  isbn: z.string().min(10, {
    message: "ISBN must be at least 10 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type EditModalProps = {
  book: Book | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function EditBookModal({
  book,
  open,
  onOpenChange,
  onSuccess,
}: EditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      isbn: "",
      description: "",
    },
  });

  // Reset form when book changes
  useEffect(() => {
    if (book && open) {
      form.reset({
        title: book.title || "",
        author: book.author || "",
        category: book.category || "",
        publishedYear: book.publishedYear?.toString() || "",
        isbn: book.isbn || "",
        description: book.summary || "",
      });
    }
  }, [book, open, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!book?._id) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/books/${book._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          category: data.category,
          summary: data.description,
          publishedYear: data.publishedYear,
          isbn: data.isbn,
        }),
        credentials: "include",
      });

      const body = await res.json();
      if (!res.ok) {
        toast.error(body.error || "Failed to update book");
        return;
      }

      toast.success("Book updated successfully");
      onOpenChange?.(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <Input
                      placeholder="Book Title"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Author</FormLabel>
                    <Input
                      placeholder="Book Author"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Category</FormLabel>
                    <Input
                      placeholder="Book Category"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Published Year */}
              <FormField
                control={form.control}
                name="publishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Published Year
                    </FormLabel>
                    <Input
                      placeholder="Book Published Year"
                      value={field.value}
                      onChange={field.onChange}
                      type="number"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="font-semibold">ISBN</FormLabel>
                    <Input
                      placeholder="Book ISBN"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description - Full width */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Description</FormLabel>
                  <Textarea
                    placeholder="Book Description"
                    value={field.value}
                    onChange={field.onChange}
                    className="min-h-[100px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
