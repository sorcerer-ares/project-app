import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsx(
      "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out",
      className
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader = ({ className, ...props }) => (
  <div className={clsx("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;
