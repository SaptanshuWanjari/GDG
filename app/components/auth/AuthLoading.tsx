import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function AlertComponent({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Accessible title for screen readers (visually hidden) */}
          <AlertDialogTitle className="sr-only">Logging in</AlertDialogTitle>
          <div className="flex items-center gap-3">
            <LoadingSpinner className="h-8 w-8 text-blue-500" />
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Logging in...
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
