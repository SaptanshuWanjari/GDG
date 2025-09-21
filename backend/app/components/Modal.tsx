"use client";

import { CheckIcon, ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  tags: z.string().min(2, {
    message: "Tags must be at least 2 characters.",
  }),
});

// Pretend we have initial image files

type ModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function Component({ open, onOpenChange }: ModalProps) {
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Book
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <ProfileBg />
          <Avatar />
          <div className="px-6 pt-4 pb-6">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Title</FormLabel>
                        <Input
                          placeholder="Book Title"
                          {...field}
                          className="border-0 shadow-none focus:ring-2 focus:ring-primary"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* author */}
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Author</FormLabel>
                        <Input
                          placeholder="Book Author"
                          {...field}
                          className="border-0 shadow-none focus:ring-2 focus:ring-primary"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Category
                        </FormLabel>
                        <Input
                          placeholder="Book Category"
                          {...field}
                          className="border-0 shadow-none focus:ring-2 focus:ring-primary"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* published year */}
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
                          {...field}
                          type="number"
                          className="border-0 shadow-none focus:ring-2 focus:ring-primary"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* isbn */}
                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">ISBN</FormLabel>
                        <Input
                          placeholder="Book ISBN"
                          {...field}
                          className="border-0 shadow-none focus:ring-2 focus:ring-primary"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* tags */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Tags</FormLabel>
                        <Input
                          placeholder="Book Tags"
                          {...field}
                          className="border-0 shadow-none focus:ring-2 focus:ring-primary"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* description full width */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2 w-full">
                      <FormLabel className="font-semibold">
                        Description
                      </FormLabel>
                      <Textarea
                        placeholder="Book Description"
                        {...field}
                        className="w-full border-0 shadow-none focus:ring-2 focus:ring-primary"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" className="cursor-pointer">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const initialBgImage = [
  { url: "/images/default-bg.jpg" }, // Replace with your default image path or leave empty
];

function ProfileBg() {
  // Static image handling (hooks removed)
  const currentImage = initialBgImage[0]?.url || null;

  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage && (
          <Image
            className="size-full object-cover"
            src={currentImage}
            alt={""}
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            onClick={() => {}}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => {}}
              aria-label="Remove image"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        className="sr-only"
        aria-label="Upload image file"
        disabled
      />
    </div>
  );
}

const initialAvatarImage = [
  { url: "/images/default-avatar.jpg" }, // Replace with your default avatar image path or leave empty
];

function Avatar() {
  const currentImage = initialAvatarImage[0]?.url || null;

  return (
    <div className="-mt-10 px-6">
      <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        {currentImage && (
          <Image
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt=""
          />
        )}
        <button
          type="button"
          className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          onClick={() => {}}
          aria-label="Change profile picture"
        >
          <ImagePlusIcon size={16} aria-hidden="true" />
        </button>
        <input
          type="file"
          className="sr-only"
          aria-label="Upload profile picture"
          disabled
        />
      </div>
    </div>
  );
}
