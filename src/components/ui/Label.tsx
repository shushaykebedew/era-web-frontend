import * as React from "react";
import { cn } from "@/utils/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("font-inter uppercase text-foreground-muted", className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = "Label";
