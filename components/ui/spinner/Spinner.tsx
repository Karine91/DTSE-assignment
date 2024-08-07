import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type ExcludeNull<T> = { [P in keyof T]: Exclude<T[P], null> };
export type CustomVariantProp<Comp extends (...args: any) => any> = ExcludeNull<
  VariantProps<Comp>
>;

const spinner = cva(
  [
    "rounded-full",
    "border-solid",
    "border-t-current",
    "border-r-current",
    "border-l-transparent",
    "border-b-transparent",
    "animate-spin",
  ],
  {
    variants: {
      size: {
        small: ["w-6 h-6"],
        medium: ["w-10 h-10"],
      },
      thickness: {
        regular: ["border-2"],
      },
    },
    defaultVariants: {
      size: "small",
      thickness: "regular",
    },
  }
);

export interface LoadingProps extends CustomVariantProp<typeof spinner> {
  className?: string;
}

export const Spinner = ({ size, thickness, className }: LoadingProps) => {
  return (
    <div className={cn(spinner({ size, thickness, className }))}>
      <span className="hidden">Loading...</span>
    </div>
  );
};
