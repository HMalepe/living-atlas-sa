import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground",
        ground: "border-accent-ground/30 bg-accent-ground/10 text-accent-ground",
        sky: "border-accent-sky/30 bg-accent-sky/10 text-accent-sky",
        muted: "border-transparent bg-surface text-muted",
        sample:
          "border-amber-600/30 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
